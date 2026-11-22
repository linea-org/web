"use client";

import { useEffect, useId, useState } from "react";

type RenderState =
  | { status: "loading" }
  | { status: "ready"; svg: string }
  | { status: "error" };

/** Node classes authors can apply with `A:::ai` (mirrors the builder's node categories). */
const THEME_CSS = `
  .node, .node *, .cluster, .cluster * { filter: none !important; }
  .node .label-container { rx: 8px; ry: 8px; stroke-width: 1px; }
  .node.ai .label-container { stroke: #fafafa; }
  .node.integration .label-container { stroke: #38bdf8; fill: rgba(56,189,248,0.08); }
  .node.logic .label-container { stroke: #fb923c; fill: rgba(251,146,60,0.08); }
  .node.data .label-container { stroke: #4ade80; fill: rgba(74,222,128,0.08); }
  .node.sky .label-container { stroke: #9dbde4; fill: rgba(157,189,228,0.1); }
  .node.fail .label-container { stroke: #f87171; fill: #1d1414; }
  .node.muted .label-container { stroke-dasharray: 5 4; fill: transparent; }
  .node.muted .nodeLabel { color: #a1a1aa; }
  .cluster rect { rx: 12px; ry: 12px; stroke: rgba(255,255,255,0.14) !important; stroke-width: 1px !important; stroke-dasharray: 4 4; fill: rgba(255,255,255,0.015) !important; }
  .cluster-label .nodeLabel { color: #a1a1aa; font-size: 12px; font-weight: 600; }
  .edgeLabel, .edgeLabel p { color: #a1a1aa; font-size: 12px; }
`;

/** Keep Mermaid's own pixel size. Stretching a tall chart to the column width scales its height with it. */
function presentSvg(svg: string) {
  const width = Number(svg.match(/max-width:\s*([\d.]+)px/)?.[1]);
  const box = svg.match(/viewBox="[-\d.]+ [-\d.]+ ([-\d.]+) ([-\d.]+)"/);
  if (!Number.isFinite(width) || width <= 0 || !box) return svg;
  const height = Math.round((Number(box[2]) / Number(box[1])) * width);
  return svg
    .replace(/\swidth="[^"]*"/, "")
    .replace(/\sheight="[^"]*"/, "")
    .replace(/\sstyle="[^"]*"/, "")
    .replace(
      "<svg",
      `<svg width="${width}" height="${height}" style="max-width:100%;height:auto"`,
    );
}

let initialized = false;

async function loadMermaid() {
  // Lazy-loaded: the library is large and only posts with a diagram need it.
  const { default: mermaid } = await import("mermaid");
  if (!initialized) {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "strict",
      theme: "base",
      fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      themeVariables: {
        darkMode: true,
        background: "transparent",
        // The default shadow is light grey, which reads as a blurry halo on dark.
        dropShadow: "none",
        fontSize: "14px",
        primaryColor: "#18181b",
        primaryTextColor: "#fafafa",
        primaryBorderColor: "#3f3f46",
        secondaryColor: "#1f1f23",
        tertiaryColor: "#09090b",
        mainBkg: "#18181b",
        nodeBorder: "#3f3f46",
        lineColor: "#71717a",
        textColor: "#d4d4d8",
        clusterBkg: "rgba(255,255,255,0.02)",
        clusterBorder: "#3f3f46",
        edgeLabelBackground: "#09090b",
        actorBkg: "#18181b",
        actorBorder: "#3f3f46",
        actorTextColor: "#fafafa",
        signalColor: "#a1a1aa",
        signalTextColor: "#d4d4d8",
        noteBkgColor: "#1f1f23",
        noteBorderColor: "#3f3f46",
        noteTextColor: "#d4d4d8",
      },
      themeCSS: THEME_CSS,
      flowchart: { curve: "basis", padding: 12, nodeSpacing: 28, rankSpacing: 36 },
      sequence: { mirrorActors: false },
    });
    initialized = true;
  }
  return mermaid;
}

export function MermaidDiagram({
  code,
  caption,
}: {
  code: string;
  caption?: string;
}) {
  // Mermaid uses the id as a DOM id and CSS selector, so strip React's colons.
  const id = `mermaid-${useId().replace(/[^a-zA-Z0-9-]/g, "")}`;
  const [state, setState] = useState<RenderState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    loadMermaid()
      .then((mermaid) => mermaid.render(id, code))
      .then(({ svg }) => {
        if (!cancelled) setState({ status: "ready", svg: presentSvg(svg) });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      });

    return () => {
      cancelled = true;
    };
  }, [id, code]);

  return (
    <figure className="relative left-1/2 my-8 w-max max-w-[calc(100vw-2.5rem)] -translate-x-1/2 sm:max-w-[min(calc(100vw-4rem),calc(72rem-4rem))] min-[80rem]:max-w-[min(calc(100vw-4rem),calc(80rem-4rem))]">
      <div
        role="img"
        aria-label={caption ?? "Diagram"}
        className="rounded-[10px] bg-[#09090b] px-4 py-8 ring-1 ring-white/10 sm:px-8"
      >
        {state.status === "ready" ? (
          <div
            className="flex justify-center [&_svg]:h-auto [&_svg]:max-w-full"
            dangerouslySetInnerHTML={{ __html: state.svg }}
          />
        ) : state.status === "error" ? (
          <pre className="font-mono text-xs leading-6 whitespace-pre-wrap text-muted">
            {code}
          </pre>
        ) : (
          <div aria-hidden className="mx-auto h-48 max-w-md animate-pulse rounded-lg bg-white/[0.03]" />
        )}
      </div>
      {caption ? (
        // w-0 + min-w-full: the caption wraps to the diagram's width instead of stretching the frame.
        <figcaption className="mt-3 w-0 min-w-full text-center text-sm text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
