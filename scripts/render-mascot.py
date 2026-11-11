"""Procedural render of the Linea mascot.

One thick matte cord coils into a low loop on the floor. Its free end rises
and turns to face the camera. The head is the cut circular end of the cord,
with a single horizontal slit of blue light across it.

    python3 scripts/render-mascot.py [out.png]

Requires numpy and Pillow. The tube is rendered by z-buffering a dense chain
of spheres (orthographic camera). Soft shadows and AO come from a signed
distance field of the curve.
"""

import sys

import numpy as np
from PIL import Image

OUT = sys.argv[1] if len(sys.argv) > 1 else "public/linea-mascot.png"
FINAL = 1600
SS = 2
W = H = FINAL * SS
S = 340.0 * SS  # px per world unit
CX, CY = W * 0.5, H * 0.60

R_CORD = 0.17
ELEV = np.radians(17)

BG_SRGB = 249 / 255
CORD_SRGB = 0x26 / 255
BLUE_SRGB = np.array([0x25, 0x63, 0xEB]) / 255


def to_lin(c):
    c = np.asarray(c, dtype=np.float64)
    return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)


def to_srgb(c):
    c = np.clip(c, 0, 1)
    return np.where(c <= 0.0031308, c * 12.92, 1.055 * c ** (1 / 2.4) - 0.055)


def norm(v):
    v = np.asarray(v, dtype=np.float64)
    return v / np.linalg.norm(v, axis=-1, keepdims=True)


# camera basis (world y up, camera looks slightly down)
RIGHT = np.array([1.0, 0.0, 0.0])
UP = np.array([0.0, np.cos(ELEV), -np.sin(ELEV)])
TOWARD = np.array([0.0, np.sin(ELEV), np.cos(ELEV)])  # from scene toward camera


def world_to_cam(p):
    return np.stack([p @ RIGHT, p @ UP, p @ TOWARD], -1)


def cam_to_world(c):
    return c[..., 0:1] * RIGHT + c[..., 1:2] * UP + c[..., 2:3] * TOWARD


# ------------------------------------------------------------------ curve
def catmull_rom(pts, samples_per_seg=40):
    pts = np.asarray(pts, dtype=np.float64)
    out = []
    for i in range(1, len(pts) - 2):
        p0, p1, p2, p3 = pts[i - 1], pts[i], pts[i + 1], pts[i + 2]
        t = np.linspace(0, 1, samples_per_seg, endpoint=False)[:, None]
        out.append(
            0.5
            * (
                2 * p1
                + (-p0 + p2) * t
                + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t**2
                + (-p0 + 3 * p1 - 3 * p2 + p3) * t**3
            )
        )
    out.append(pts[-2][None])
    return np.concatenate(out)


def resample(curve, step):
    seg = np.linalg.norm(np.diff(curve, axis=0), axis=1)
    s = np.concatenate([[0], np.cumsum(seg)])
    t = np.arange(0, s[-1], step)
    t = np.append(t, s[-1])
    return np.stack([np.interp(t, s, curve[:, k]) for k in range(3)], -1)


# flat spiral on the floor, outer end at the back-left, inner end at the back
turns = 1.12
th_end = -np.pi / 2
th = np.linspace(th_end - 2 * np.pi * turns, th_end, 30)
rad = np.linspace(1.0, 0.585, 30)
spiral = np.stack([rad * np.cos(th), np.full_like(th, R_CORD), rad * np.sin(th)], -1)

# head direction: toward the camera, turned a touch to the left
T_HEAD = norm([-0.3, np.sin(ELEV) + 0.04, np.cos(ELEV)])
E_HEAD = np.array([0.04, 1.42, 0.16])

neck = np.array(
    [
        [0.30, 0.27, -0.52],
        [0.42, 0.66, -0.36],
        [0.30, 1.06, -0.16],
        [0.13, 1.33, -0.02],
    ]
)
ctrl = np.concatenate(
    [
        spiral[:1] * 2 - spiral[1:2],  # phantom before the tail
        spiral,
        neck,
        E_HEAD[None],
        (E_HEAD + T_HEAD * 0.22)[None],  # phantom sets the head tangent
    ]
)
def smooth(curve, step, sigma):
    # odd reflection at both ends keeps the endpoints and their tangents
    k = int(3 * sigma / step)
    pad = np.concatenate([2 * curve[0] - curve[k:0:-1], curve, 2 * curve[-1] - curve[-2 : -k - 2 : -1]])
    x = np.arange(-k, k + 1) * step
    w = np.exp(-0.5 * (x / sigma) ** 2)
    w /= w.sum()
    return np.stack([np.convolve(pad[:, i], w, mode="valid") for i in range(3)], -1)


base = smooth(resample(catmull_rom(ctrl), 0.004), 0.004, 0.09)
curve = resample(base, R_CORD / 28)
coarse = resample(base, 0.04)


# ------------------------------------------------------------------ distance field
def sdf_cord(p):
    """Distance from points (M,3) to the cord surface."""
    p = p.astype(np.float32)
    c = coarse.astype(np.float32)
    out = np.empty(len(p), np.float32)
    cc = (c**2).sum(1)
    for i in range(0, len(p), 65536):
        q = p[i : i + 65536]
        d2 = (q**2).sum(1)[:, None] + cc[None] - 2 * q @ c.T
        out[i : i + 65536] = np.sqrt(np.clip(d2.min(1), 0, None)) - R_CORD
    # the cut plane at the head: nothing exists beyond it
    beyond = (p - E_HEAD) @ T_HEAD
    near_head = np.linalg.norm(p - E_HEAD, axis=1) < 2.5 * R_CORD
    return np.maximum(out, np.where(near_head & (beyond > 0), beyond, -1e9)).astype(np.float64)


def sdf_scene(p):
    return np.minimum(sdf_cord(p), p[:, 1])


def soft_shadow(p, l, k=5.0, steps=36, cord_only=False):
    f = sdf_cord if cord_only else sdf_scene
    res = np.ones(len(p))
    t = np.full(len(p), 0.03)
    for _ in range(steps):
        h = f(p + l * t[:, None])
        res = np.minimum(res, np.clip(k * h / t, 0, 1))
        t += np.clip(h, 0.02, 0.25)
    return res


def ambient_occ(p, n, cord_only=False, step=0.07, count=5, strength=1.6):
    f = sdf_cord if cord_only else sdf_scene
    occ = np.zeros(len(p))
    for k in range(1, count + 1):
        d = step * k
        occ += (d - np.minimum(f(p + n * d), d)) / 2**k
    return np.clip(1 - strength * occ / step, 0, 1)


# ------------------------------------------------------------------ raster the tube
zbuf = np.full((H, W), -np.inf, np.float32)
nbuf = np.zeros((H, W, 3), np.float32)
cap = np.zeros((H, W), bool)

cam_curve = world_to_cam(curve)
E_cam = world_to_cam(E_HEAD)
T_cam = world_to_cam(T_HEAD)
rpx = R_CORD * S
arc = np.concatenate([[0], np.cumsum(np.linalg.norm(np.diff(curve, axis=0), axis=1))])
near_end = arc > arc[-1] - 2.5 * R_CORD

for c, clip_end in zip(cam_curve, near_end):
    px, py = CX + c[0] * S, CY - c[1] * S
    x0, x1 = int(px - rpx - 2), int(px + rpx + 3)
    y0, y1 = int(py - rpx - 2), int(py + rpx + 3)
    yy, xx = np.mgrid[y0:y1, x0:x1]
    dx = (xx + 0.5 - px) / S
    dy = (py - (yy + 0.5)) / S
    d2 = dx**2 + dy**2
    inside = d2 < R_CORD**2
    dz = np.sqrt(np.clip(R_CORD**2 - d2, 0, None))
    z = c[2] + dz
    # clip anything past the cut face
    pc = np.stack([c[0] + dx, c[1] + dy, z], -1)
    if clip_end:
        inside &= (pc - E_cam) @ T_cam <= 0
    sub = zbuf[y0:y1, x0:x1]
    win = inside & (z > sub)
    sub[win] = z[win]
    ns = nbuf[y0:y1, x0:x1]
    ns[win] = np.stack([dx, dy, dz], -1)[win] / R_CORD

# the cut face: a disc in the plane through E with normal T
epx, epy = CX + E_cam[0] * S, CY - E_cam[1] * S
x0, x1 = int(epx - rpx - 4), int(epx + rpx + 5)
y0, y1 = int(epy - rpx - 4), int(epy + rpx + 5)
yy, xx = np.mgrid[y0:y1, x0:x1]
sx = (xx + 0.5 - CX) / S
sy = (CY - (yy + 0.5)) / S
zc = E_cam[2] - ((sx - E_cam[0]) * T_cam[0] + (sy - E_cam[1]) * T_cam[1]) / T_cam[2]
pc = np.stack([sx, sy, zc], -1) - E_cam
on_cap = np.linalg.norm(pc, axis=-1) < R_CORD
sub = zbuf[y0:y1, x0:x1]
win = on_cap & (zc > sub)
sub[win] = zc[win]
nbuf[y0:y1, x0:x1][win] = T_cam
cap[y0:y1, x0:x1] = win

mask = np.isfinite(zbuf)

# ------------------------------------------------------------------ shade the cord
ys_, xs_ = np.nonzero(mask)
cam_p = np.stack([(xs_ + 0.5 - CX) / S, (CY - (ys_ + 0.5)) / S, zbuf[ys_, xs_]], -1)
P = cam_to_world(cam_p)
N = norm(cam_to_world(nbuf[ys_, xs_].astype(np.float64)))
V = TOWARD

KEY = norm([-0.32, 0.9, 0.3])
FILL = norm([0.9, 0.25, 0.55])
RIM = norm([0.35, 0.55, -0.85])

lit = (N @ KEY) > -0.05
sh_full = np.ones(len(P))
sh_full[lit] = soft_shadow(P[lit] + N[lit] * 0.012, KEY, k=4.0)
ao_full = ambient_occ(P + N * 0.004, N)

albedo = to_lin(CORD_SRGB)
ndk = np.clip(N @ KEY, 0, 1)
ndf = np.clip(N @ FILL, 0, 1)
ndr = np.clip(N @ RIM, 0, 1)
sky = 0.5 + 0.5 * N[:, 1]
ground = 0.5 - 0.5 * N[:, 1]
ndv = np.clip(N @ V, 0, 1)

Hk = norm(KEY + V)
ndh = np.clip(N @ Hk, 0, 1)
fres = 0.035 + 0.965 * (1 - ndv) ** 5

diffuse = albedo * (
    3.1 * ndk * sh_full
    + 0.75 * sky * ao_full
    + 0.55 * ndf * ao_full
    + 0.55 * ground * ao_full  # bounce off the bright floor
)
# chalky silicone: broad, low sheen rather than a sharp highlight
spec = 0.045 * ndh**14 * 3.0 * sh_full + 0.6 * fres * 0.06 * sky * ao_full + 0.05 * ndr**3 * ao_full
cord_lin = diffuse[:, None] * np.ones(3) + spec[:, None] * np.array([0.95, 0.97, 1.0])

# ------------------------------------------------------------------ the slit
# screen-right projected into the face plane, so the slit reads level in frame
u_ax = norm(RIGHT - (RIGHT @ T_HEAD) * T_HEAD)
v_ax = np.cross(T_HEAD, u_ax)
on_cap_px = cap[ys_, xs_]
loc = P - E_HEAD
cu, cv = loc @ u_ax, loc @ v_ax
rr = np.hypot(cu, cv) / R_CORD

SLIT_HALF_LEN = 0.66 * R_CORD
SLIT_HALF_H = 0.1 * R_CORD
q = np.maximum(np.abs(cu) - SLIT_HALF_LEN, 0)
slit_d = np.hypot(q, cv) - SLIT_HALF_H  # capsule distance, units
px_size = 1 / S
slit_a = np.clip(0.5 - slit_d / (1.2 * px_size), 0, 1) * on_cap_px

blue_lin = to_lin(BLUE_SRGB)
core_lin = to_lin(np.array([0.62, 0.78, 1.0]))
# hot core along the centre line, saturated blue at the edges
core_t = np.clip(1 - np.abs(cv) / SLIT_HALF_H, 0, 1) ** 2 * np.clip(1 - q / (SLIT_HALF_H * 2), 0, 1)
slit_col = blue_lin * 2.2 * (1 - core_t[:, None]) + core_lin * 2.6 * core_t[:, None]

# the cut face: a crisp lit edge, blue spill near the slit
edge = np.clip((rr - 0.94) / 0.06, 0, 1)
facing_key = np.clip((-0.75 * cu + 0.66 * cv) / (np.hypot(cu, cv) + 1e-9), 0, 1)
cap_tone = 0.55 + edge * facing_key * 1.6
spill = np.exp(-np.clip(slit_d, 0, None) / (0.06 * R_CORD)) * on_cap_px
cord_lin = cord_lin * np.where(on_cap_px, cap_tone, 1.0)[:, None]
cord_lin = cord_lin + blue_lin * spill[:, None] * 0.12
cord_lin = cord_lin * (1 - slit_a[:, None]) + slit_col * slit_a[:, None]

# ------------------------------------------------------------------ floor + shadow
bg_lin = to_lin(BG_SRGB)
img_lin = np.full((H, W, 3), bg_lin)

# floor is evaluated on a coarse grid around the object, then smoothed up
STRIDE = 8
fx0, fx1 = int(CX - 2.2 * S), int(CX + 2.2 * S)
fy0, fy1 = int(CY - 0.9 * S), int(CY + 1.25 * S)
gy, gx = np.mgrid[fy0:fy1:STRIDE, fx0:fx1:STRIDE]
gsx = (gx + 0.5 - CX) / S
gsy = (CY - (gy + 0.5)) / S
# ray from the screen point along -TOWARD hits y = 0
t = (gsx * RIGHT[1] + gsy * UP[1]) / TOWARD[1]
FP = (gsx[..., None] * RIGHT + gsy[..., None] * UP - t[..., None] * TOWARD).reshape(-1, 3)
FP[:, 1] = 0.0
up = np.tile([0.0, 1.0, 0.0], (len(FP), 1))
f_ao = ambient_occ(FP + up * 0.004, up, cord_only=True, step=0.11, count=5, strength=1.0)
f_sh = soft_shadow(FP + up * 0.01, KEY, k=2.0, cord_only=True)
floor_term = ((0.5 + 0.5 * f_ao) * (0.82 + 0.18 * f_sh)).reshape(gy.shape)


def _box(a, r, axis):
    r = max(int(r), 1)
    pad = [(0, 0)] * a.ndim
    pad[axis] = (r + 1, r)
    c = np.cumsum(np.pad(a, pad, mode="edge"), axis=axis)
    n = a.shape[axis]
    hi = np.take(c, np.arange(2 * r + 1, 2 * r + 1 + n), axis=axis)
    lo = np.take(c, np.arange(0, n), axis=axis)
    return (hi - lo) / (2 * r + 1)


def blur(a, sigma):
    """Gaussian approximated by three box passes per axis."""
    a = np.asarray(a, dtype=np.float64)
    r = sigma * 0.93
    for _ in range(3):
        a = _box(_box(a, r, 0), r, 1)
    return a


fimg = Image.fromarray(floor_term.astype(np.float32), mode="F").resize((fx1 - fx0, fy1 - fy0), Image.BILINEAR)
floor_full = blur(np.asarray(fimg), STRIDE)
img_lin[fy0:fy1, fx0:fx1] *= floor_full[..., None] ** np.array([1.0, 0.985, 0.95])

img_lin[ys_, xs_] = cord_lin

# ------------------------------------------------------------------ glow
emit = np.zeros((H, W), np.float32)
emit[ys_, xs_] = slit_a
glow = blur(emit, 5 * SS) * 1.1 + blur(emit, 20 * SS) * 0.9 + blur(emit, 60 * SS) * 0.6
glow_gain = np.where(mask, 0.45, 1.0)[..., None]  # the matte cord soaks up less glow than the air around it
img_lin = img_lin + glow[..., None] * blue_lin * 1.6 * (1 - emit[..., None]) * glow_gain

# ------------------------------------------------------------------ out
out = (to_srgb(img_lin) * 255 + 0.5).astype(np.uint8)
pil = Image.fromarray(out).resize((FINAL, FINAL), Image.LANCZOS)
pil.save(OUT, optimize=True)
print(f"wrote {OUT} ({FINAL}x{FINAL})")
