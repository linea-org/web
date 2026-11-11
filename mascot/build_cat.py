"""Build and render the Linea cat mascot in Blender.

    blender -b --python mascot/build_cat.py -- [--preview] [--out public/linea-mascot.png]

Builds the scene from scratch, saves mascot/linea-cat.blend (rigged for
animation), renders a transparent still, then composites it onto #f9f9f9.

Rig (all empties, keyframe these to animate):
    Cat            root, whole-body moves / breathing (scale z)
    HeadPivot      at the neck: tilt / turn / nod
    EarPivot.L/.R  at each ear base: twitch
    EyePivot.L/.R  at each eye centre
    Lid.L/.R       eyelids, rotate X: LID_OPEN (open) -> 0 (closed)
"""

import math
import os
import sys

import bmesh
import bpy
import numpy as np
from mathutils import Matrix, Vector

argv = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []
PREVIEW = "--preview" in argv
OUT = argv[argv.index("--out") + 1] if "--out" in argv else "public/linea-mascot.png"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, OUT)

BG = (0xF9 / 255,) * 3
BLUE = (0x25 / 255, 0x63 / 255, 0xEB / 255)
LID_OPEN = math.radians(-178)


def srgb_to_lin(c):
    return tuple(x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c)


# ------------------------------------------------------------------ reset
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
coll = scene.collection


def link(obj):
    coll.objects.link(obj)
    return obj


def empty(name, loc, parent=None):
    e = link(bpy.data.objects.new(name, None))
    e.empty_display_type = "PLAIN_AXES"
    e.empty_display_size = 0.15
    e.location = loc
    if parent:
        parent_keep(e, parent)
    return e


def parent_keep(obj, parent):
    bpy.context.view_layer.update()
    obj.parent = parent
    obj.matrix_parent_inverse = parent.matrix_world.inverted()


# ------------------------------------------------------------------ materials
def velvet(name, base=0.005, sheen=0.075, grain=0.22):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    p = nt.nodes["Principled BSDF"]
    p.inputs["Base Color"].default_value = (base, base, base * 1.05, 1)
    p.inputs["Roughness"].default_value = 0.9
    p.inputs["Specular IOR Level"].default_value = 0.06
    p.inputs["Sheen Weight"].default_value = 1.0
    p.inputs["Sheen Roughness"].default_value = 0.5
    p.inputs["Sheen Tint"].default_value = (sheen, sheen, sheen * 1.04, 1)
    # flocked micro-texture
    tc = nt.nodes.new("ShaderNodeTexCoord")
    noise = nt.nodes.new("ShaderNodeTexNoise")
    noise.inputs["Scale"].default_value = 180
    noise.inputs["Detail"].default_value = 6
    bump = nt.nodes.new("ShaderNodeBump")
    bump.inputs["Strength"].default_value = grain
    bump.inputs["Distance"].default_value = 0.002
    nt.links.new(tc.outputs["Object"], noise.inputs["Vector"])
    nt.links.new(noise.outputs["Fac"], bump.inputs["Height"])
    nt.links.new(bump.outputs["Normal"], p.inputs["Normal"])
    return m


def flat(name, color, rough=0.9):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    p = m.node_tree.nodes["Principled BSDF"]
    p.inputs["Base Color"].default_value = (*color, 1)
    p.inputs["Roughness"].default_value = rough
    return m


def eye_material():
    m = bpy.data.materials.new("Eye")
    m.use_nodes = True
    nt = m.node_tree
    p = nt.nodes["Principled BSDF"]
    p.inputs["Roughness"].default_value = 0.18
    p.inputs["Coat Weight"].default_value = 1.0
    p.inputs["Coat Roughness"].default_value = 0.03
    tc = nt.nodes.new("ShaderNodeTexCoord")
    sep = nt.nodes.new("ShaderNodeSeparateXYZ")
    nt.links.new(tc.outputs["Object"], sep.inputs[0])
    # radial distance from the forward (-Y) axis, sphere radius = 1
    sx = nt.nodes.new("ShaderNodeMath"); sx.operation = "MULTIPLY"
    sz = nt.nodes.new("ShaderNodeMath"); sz.operation = "MULTIPLY"
    nt.links.new(sep.outputs["X"], sx.inputs[0]); nt.links.new(sep.outputs["X"], sx.inputs[1])
    nt.links.new(sep.outputs["Z"], sz.inputs[0]); nt.links.new(sep.outputs["Z"], sz.inputs[1])
    add = nt.nodes.new("ShaderNodeMath"); add.operation = "ADD"
    nt.links.new(sx.outputs[0], add.inputs[0]); nt.links.new(sz.outputs[0], add.inputs[1])
    sq = nt.nodes.new("ShaderNodeMath"); sq.operation = "SQRT"
    nt.links.new(add.outputs[0], sq.inputs[0])

    # iris fibres: noise stretched radially, mixed in lightly
    noise = nt.nodes.new("ShaderNodeTexNoise")
    noise.inputs["Scale"].default_value = 18
    noise.inputs["Detail"].default_value = 4
    nt.links.new(tc.outputs["Object"], noise.inputs["Vector"])

    ramp = nt.nodes.new("ShaderNodeValToRGB")
    cr = ramp.color_ramp
    blue = srgb_to_lin(BLUE)
    light = srgb_to_lin((0.30, 0.52, 1.0))
    navy = srgb_to_lin((0.02, 0.06, 0.24))
    white = srgb_to_lin((0.96, 0.95, 0.93))
    stops = [
        (0.0, (0.004, 0.004, 0.006)),
        (0.235, (0.004, 0.004, 0.006)),
        (0.25, navy),
        (0.29, light),
        (0.42, blue),
        (0.54, blue),
        (0.6, navy),
        (0.625, (0.015, 0.02, 0.05)),
        (0.65, white),
        (1.0, white),
    ]
    cr.elements[0].position, cr.elements[0].color = stops[0][0], (*stops[0][1], 1)
    cr.elements[1].position, cr.elements[1].color = stops[-1][0], (*stops[-1][1], 1)
    for pos, col in stops[1:-1]:
        e = cr.elements.new(pos)
        e.color = (*col, 1)
    nt.links.new(sq.outputs[0], ramp.inputs["Fac"])

    mix = nt.nodes.new("ShaderNodeMix"); mix.data_type = "RGBA"; mix.blend_type = "MULTIPLY"
    mix.inputs["Factor"].default_value = 0.18
    nt.links.new(ramp.outputs["Color"], mix.inputs["A"])
    nt.links.new(noise.outputs["Color"], mix.inputs["B"])
    nt.links.new(mix.outputs["Result"], p.inputs["Base Color"])
    return m


M_FUR = velvet("Velvet")
M_EAR_INNER = velvet("VelvetInner", base=0.012, sheen=0.16, grain=0.35)
M_GROOVE = flat("Groove", (0.002, 0.002, 0.002), rough=1.0)
M_NOSE = flat("Nose", (0.006, 0.006, 0.007), rough=0.5)
M_EYE = eye_material()


# ------------------------------------------------------------------ metaball helpers
def metaball_mesh(name, elements, resolution):
    mb = bpy.data.metaballs.new(name)
    mb.resolution = resolution
    mb.render_resolution = resolution
    mb.threshold = 0.6
    for kind, co, size, radius, *rest in elements:
        el = mb.elements.new()
        if rest:
            el.stiffness = rest[0]
        el.type = kind
        el.co = co
        el.radius = radius
        if kind == "ELLIPSOID":
            el.size_x, el.size_y, el.size_z = size
        elif kind == "CAPSULE":
            el.size_x = size[0]
    obj = link(bpy.data.objects.new(name + "_mb", mb))
    bpy.context.view_layer.update()
    deps = bpy.context.evaluated_depsgraph_get()
    me = bpy.data.meshes.new_from_object(obj.evaluated_get(deps))
    bpy.data.objects.remove(obj)
    bpy.data.metaballs.remove(mb)
    me.name = name
    me.shade_smooth()
    out = link(bpy.data.objects.new(name, me))
    out.data.materials.append(M_FUR)
    return out


RES = 0.03 if PREVIEW else 0.011
MB_R = 0.75  # with this radius, element sizes below are roughly the finished extents

# body: seated, front legs as columns, round haunches with paws at the sides
body = metaball_mesh(
    "Body",
    [
        ("ELLIPSOID", (0, 0.12, 0.24), (1.00, 0.85, 0.50), MB_R),   # seat
        ("ELLIPSOID", (0, 0.14, 0.42), (0.74, 0.60, 0.72), MB_R),   # torso
        ("ELLIPSOID", (0, 0.06, 0.56), (0.64, 0.52, 0.34), MB_R),   # shoulders, tucked under the chin
        ("ELLIPSOID", (-0.2, -0.2, 0.30), (0.26, 0.26, 0.58), MB_R, 2.6),  # front legs
        ("ELLIPSOID", (0.2, -0.2, 0.30), (0.26, 0.26, 0.58), MB_R, 2.6),
        ("ELLIPSOID", (-0.2, -0.29, 0.075), (0.27, 0.32, 0.15), MB_R, 2.6),  # front paws
        ("ELLIPSOID", (0.2, -0.29, 0.075), (0.27, 0.32, 0.15), MB_R, 2.6),
        ("ELLIPSOID", (-0.45, 0.08, 0.24), (0.46, 0.70, 0.50), MB_R),  # haunches
        ("ELLIPSOID", (0.45, 0.08, 0.24), (0.46, 0.70, 0.50), MB_R),
        ("ELLIPSOID", (-0.52, -0.12, 0.075), (0.30, 0.36, 0.16), MB_R),  # hind paws
        ("ELLIPSOID", (0.52, -0.12, 0.075), (0.30, 0.36, 0.16), MB_R),
    ],
    RES,
)

min_z = min(v.co.z for v in body.data.vertices)
for v in body.data.vertices:
    v.co.z -= min_z
print("BODY", [tuple(round(c, 2) for c in v) for v in (body.bound_box[0], body.bound_box[6])])
HEAD_C = Vector((0, 0, 1.08))
head = metaball_mesh(
    "Head",
    [
        ("ELLIPSOID", tuple(HEAD_C), (1.54, 1.14, 1.24), MB_R),
        ("ELLIPSOID", (-0.32, -0.10, 0.88), (0.6, 0.58, 0.44), MB_R),  # cheeks
        ("ELLIPSOID", (0.32, -0.10, 0.88), (0.6, 0.58, 0.44), MB_R),
        ("ELLIPSOID", (0, -0.32, 0.86), (0.30, 0.22, 0.20), MB_R),  # muzzle
    ],
    RES,
)


print("HEAD", [tuple(round(c, 2) for c in v) for v in (head.bound_box[0], head.bound_box[6])])
# ------------------------------------------------------------------ surface helpers
def project_front(obj, x, z, inset=0.0):
    """World point on obj's front surface at (x, z), pushed `inset` into it."""
    inv = obj.matrix_world.inverted()
    origin = inv @ Vector((x, -5.0, z))
    direction = (inv.to_3x3() @ Vector((0, 1, 0))).normalized()
    ok, loc, normal, _ = obj.ray_cast(origin, direction)
    if not ok:
        raise RuntimeError(f"no surface on {obj.name} at x={x} z={z}")
    world = obj.matrix_world @ loc
    n = (obj.matrix_world.to_3x3() @ normal).normalized()
    return world - n * inset, n


def groove(name, pts, obj, radius=0.0075, inset=0.003):
    cu = bpy.data.curves.new(name, "CURVE")
    cu.dimensions = "3D"
    cu.bevel_depth = radius
    cu.bevel_resolution = 3
    cu.use_fill_caps = True
    sp = cu.splines.new("POLY")
    sp.points.add(len(pts) - 1)
    for p, (x, z) in zip(sp.points, pts):
        w, _ = project_front(obj, x, z, inset)
        p.co = (*w, 1)
    o = link(bpy.data.objects.new(name, cu))
    o.data.materials.append(M_GROOVE)
    return o


# toe lines on all four paws
toes = []
for side in (-1, 1):
    for paw_x, top in ((0.2, 0.125), (0.52, 0.12)):
        for dx in ((-0.045, 0.045) if paw_x < 0.3 else (-0.04, 0.04)):
            x = side * paw_x + dx
            toes.append(groove(f"Toe", [(x, z) for z in np.linspace(0.025, top, 8)], body, radius=0.006))

creases = [
    groove("Crease", [(-0.345, z) for z in np.linspace(0.06, 0.34, 10)], body, radius=0.009, inset=0.005),
    groove("Crease", [(0.345, z) for z in np.linspace(0.06, 0.34, 10)], body, radius=0.009, inset=0.005),
]
toes += creases

# ------------------------------------------------------------------ face
EYE_R = 0.18
eyes, lids, eye_pivots = [], [], []
for side, tag in ((-1, "L"), (1, "R")):
    surf, n = project_front(head, side * 0.42, 1.10)
    centre = surf + Vector((0, 0.09, 0))
    bpy.ops.mesh.primitive_uv_sphere_add(segments=64, ring_count=32, radius=1.0, location=centre)
    eye = bpy.context.active_object
    eye.name = f"Eye.{tag}"
    eye.scale = (EYE_R,) * 3
    eye.data.shade_smooth()
    eye.data.materials.append(M_EYE)
    eyes.append(eye)

    pivot = empty(f"EyePivot.{tag}", centre)
    eye_pivots.append(pivot)

    # eyelid: front hemisphere shell; rotate X to LID_OPEN to tuck it away
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=64, v_segments=32, radius=1.0)
    bmesh.ops.bisect_plane(bm, geom=bm.verts[:] + bm.edges[:] + bm.faces[:], plane_co=(0, 0, 0), plane_no=(0, 1, 0), clear_outer=True)
    me = bpy.data.meshes.new(f"Lid.{tag}")
    bm.to_mesh(me)
    bm.free()
    me.shade_smooth()
    lid = link(bpy.data.objects.new(f"Lid.{tag}", me))
    lid.location = centre
    lid.scale = (EYE_R * 1.06,) * 3
    sol = lid.modifiers.new("Solidify", "SOLIDIFY")
    sol.thickness = 0.04
    lid.data.materials.append(M_FUR)
    lid.rotation_euler.x = LID_OPEN
    lids.append(lid)

# nose: soft rounded triangle, wider on top
nose_surf, _ = project_front(head, 0, 0.93)
bm = bmesh.new()
bmesh.ops.create_uvsphere(bm, u_segments=48, v_segments=24, radius=1.0)
for v in bm.verts:
    v.co.x *= 1.0 + 0.45 * v.co.z
    v.co.z *= 0.85
me = bpy.data.meshes.new("Nose")
bm.to_mesh(me)
bm.free()
me.shade_smooth()
nose = link(bpy.data.objects.new("Nose", me))
nose.scale = (0.058, 0.04, 0.04)
nose.location = nose_surf + Vector((0, 0.012, 0))
nose.data.materials.append(M_NOSE)

# mouth: short philtrum, then a soft "w"
ts = np.linspace(-1, 1, 41)
mouth_pts = [(0.11 * t, 0.80 - 0.026 * math.sin(math.pi * abs(t))) for t in ts]
mouth = groove("Mouth", mouth_pts, head, radius=0.0075)
philtrum = groove("Philtrum", [(0, z) for z in np.linspace(0.89, 0.80, 8)], head, radius=0.0065)


# ------------------------------------------------------------------ ears
def make_ear(side, tag):
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=64, radius1=0.31, radius2=0.0, depth=0.52)
    for v in bm.verts:
        v.co.y *= 0.42
        v.co.z += 0.26  # base at z=0
        # slightly rounded, fuller lower half
        v.co.x *= 1.0 + 0.12 * math.sin(math.pi * min(v.co.z / 0.52, 1))
    me = bpy.data.meshes.new(f"Ear.{tag}")
    bm.to_mesh(me)
    bm.free()
    ear = link(bpy.data.objects.new(f"Ear.{tag}", me))
    sub = ear.modifiers.new("Sub", "SUBSURF")
    sub.levels = sub.render_levels = 2

    # carve the inner ear
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=64, radius1=0.2, radius2=0.0, depth=0.4)
    for v in bm.verts:
        v.co.y = v.co.y * 0.32 - 0.075
        v.co.z += 0.2 + 0.07
    me = bpy.data.meshes.new("cutter")
    bm.to_mesh(me)
    bm.free()
    cutter = link(bpy.data.objects.new("cutter", me))
    csub = cutter.modifiers.new("Sub", "SUBSURF")
    csub.levels = 2
    boo = ear.modifiers.new("Inner", "BOOLEAN")
    boo.operation = "DIFFERENCE"
    boo.object = cutter
    boo.solver = "EXACT"
    bpy.context.view_layer.update()
    deps = bpy.context.evaluated_depsgraph_get()
    baked = bpy.data.meshes.new_from_object(ear.evaluated_get(deps))
    ear.modifiers.clear()
    old = ear.data
    ear.data = baked
    bpy.data.meshes.remove(old)
    bpy.data.objects.remove(cutter)
    baked.shade_smooth()
    ear.data.materials.clear()  # the boolean leaves empty slots behind
    ear.data.materials.append(M_FUR)
    ear.data.materials.append(M_EAR_INNER)
    # faces whose normal points forward and sit inside the cut get the inner material
    for poly in ear.data.polygons:
        c = poly.center
        if poly.normal.y > 0.2 and c.y > -0.09 and c.z > 0.07:
            poly.material_index = 1
    sm = ear.modifiers.new("Smooth", "CORRECTIVE_SMOOTH")
    sm.factor = 0.6
    sm.iterations = 8
    sm.smooth_type = "LENGTH_WEIGHTED"
    sm.use_only_smooth = True
    sub = ear.modifiers.new("Sub", "SUBSURF")
    sub.levels = sub.render_levels = 2

    base = Vector((side * 0.48, 0.02, 1.38))
    pivot = empty(f"EarPivot.{tag}", base)
    ear.location = base
    ear.rotation_euler = (math.radians(-6), math.radians(side * 30), math.radians(-side * 8))
    return ear, pivot


ear_l, ear_piv_l = make_ear(-1, "L")
ear_r, ear_piv_r = make_ear(1, "R")

# ------------------------------------------------------------------ rig
cat = empty("Cat", (0, 0, 0))
head_pivot = empty("HeadPivot", (0, 0.02, 0.80))
parent_keep(head_pivot, cat)
parent_keep(body, cat)
for o in [head, nose, mouth, philtrum, ear_piv_l, ear_piv_r, *eye_pivots]:
    parent_keep(o, head_pivot)
parent_keep(ear_l, ear_piv_l)
parent_keep(ear_r, ear_piv_r)
for eye, lid, piv in zip(eyes, lids, eye_pivots):
    parent_keep(eye, piv)
    parent_keep(lid, piv)
for t in toes:
    parent_keep(t, cat)

# ------------------------------------------------------------------ stage
bpy.ops.mesh.primitive_plane_add(size=30, location=(0, 0, 0))
floor = bpy.context.active_object
floor.name = "ShadowCatcher"
floor.is_shadow_catcher = True

cam_data = bpy.data.cameras.new("Camera")
cam_data.lens = 95
cam = link(bpy.data.objects.new("Camera", cam_data))
cam.location = (0, -9.6, 1.45)
target = Vector((0, 0, 0.95))
cam.rotation_euler = (target - cam.location).to_track_quat("-Z", "Y").to_euler()
scene.camera = cam


def area(name, loc, power, size, color=(1, 1, 1), shadow=True):
    d = bpy.data.lights.new(name, "AREA")
    d.use_shadow = shadow
    d.energy = power
    d.shape = "DISK"
    d.size = size
    d.color = color
    o = link(bpy.data.objects.new(name, d))
    o.location = loc
    o.rotation_euler = (Vector((0, 0, 1.0)) - Vector(loc)).to_track_quat("-Z", "Y").to_euler()
    return o


area("Key", (-4.0, -5.5, 5.5), 900, 5.0)
area("Fill", (5.0, -5.0, 2.5), 260, 6.0, (0.97, 0.98, 1.0), shadow=False)
area("Top", (0.0, 0.5, 6.5), 220, 4.0)
area("RimL", (-4.0, 4.0, 3.0), 700, 3.0, shadow=False)
area("RimR", (4.0, 4.0, 3.0), 700, 3.0, shadow=False)

world = bpy.data.worlds.new("World")
world.use_nodes = True
world.node_tree.nodes["Background"].inputs["Color"].default_value = (1, 1, 1, 1)
world.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.18
scene.world = world

# ------------------------------------------------------------------ render settings
scene.render.engine = "CYCLES"
prefs = bpy.context.preferences.addons["cycles"].preferences
try:
    prefs.compute_device_type = "METAL"
    prefs.get_devices()
    for d in prefs.devices:
        d.use = True
    scene.cycles.device = "GPU"
except Exception as e:  # CPU fallback
    print("GPU unavailable:", e)
scene.cycles.samples = 48 if PREVIEW else 384
scene.cycles.use_denoising = True
scene.render.film_transparent = True
size = 640 if PREVIEW else 1600
scene.render.resolution_x = scene.render.resolution_y = size
scene.render.resolution_percentage = 100
scene.view_settings.view_transform = "Standard"
scene.view_settings.look = "None"
scene.render.image_settings.file_format = "PNG"
scene.render.image_settings.color_mode = "RGBA"
scene.render.fps = 30

blend_path = os.path.join(ROOT, "mascot", "linea-cat.blend")
if not PREVIEW:
    bpy.ops.wm.save_as_mainfile(filepath=blend_path)

raw = os.path.splitext(OUT)[0] + ("-preview" if PREVIEW else "") + "-transparent.png"
scene.render.filepath = raw
bpy.ops.render.render(write_still=True)

# ------------------------------------------------------------------ composite onto #f9f9f9
img = bpy.data.images.load(raw)
px = np.empty(img.size[0] * img.size[1] * 4, np.float32)
img.pixels.foreach_get(px)
px = px.reshape(-1, 4)
a = px[:, 3:4]


def to_lin(c):
    return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)


def to_srgb(c):
    c = np.clip(c, 0, 1)
    return np.where(c <= 0.0031308, c * 12.92, 1.055 * c ** (1 / 2.4) - 0.055)


bg = to_lin(np.array(BG, np.float32))
rgb = to_srgb(to_lin(px[:, :3]) * a + bg * (1 - a))
flat_px = np.concatenate([rgb, np.ones_like(a)], 1).astype(np.float32).ravel()
out_img = bpy.data.images.new("out", img.size[0], img.size[1], alpha=False)
out_img.pixels.foreach_set(flat_px)
final = os.path.splitext(OUT)[0] + ("-preview" if PREVIEW else "") + ".png"
out_img.filepath_raw = final
out_img.file_format = "PNG"
out_img.save()
print("WROTE", raw, final)
