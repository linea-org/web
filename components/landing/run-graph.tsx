type NodeStatus = "done" | "retried" | "waiting";

type GraphNode = {
  id: string;
  kind: string;
  title: string;
  x: number;
  y: number;
  accent: string;
  status: NodeStatus;
};

const NODE_W = 150;
const NODE_H = 44;

const NODES: GraphNode[] = [
  { id: "trigger", kind: "Trigger", title: "Ticket received", x: 200, y: 40, accent: "var(--stage-sky)", status: "done" },
  { id: "model", kind: "Model", title: "Classify intent", x: 200, y: 116, accent: "var(--stage-sky)", status: "done" },
  { id: "tool", kind: "Tool call", title: "Look up order", x: 112, y: 196, accent: "var(--stage-floor)", status: "retried" },
  { id: "http", kind: "HTTP", title: "Fetch refund policy", x: 288, y: 196, accent: "var(--stage-mist)", status: "done" },
  { id: "approval", kind: "Approval", title: "Refund over $50", x: 200, y: 276, accent: "var(--stage-mist)", status: "waiting" },
];

const EDGES = [
  "M200 62 L200 94",
  "M200 138 C200 162 112 150 112 174",
  "M200 138 C200 162 288 150 288 174",
  "M112 218 C112 242 200 230 200 254",
  "M288 218 C288 242 200 230 200 254",
];

// Each pulse travels one branch end to end; nodes are drawn on top, so it disappears while "inside" a step.
const PULSES = [
  { path: "M200 62 L200 138 C200 162 112 150 112 174 L112 218 C112 242 200 230 200 254", begin: "0s" },
  { path: "M200 62 L200 138 C200 162 288 150 288 174 L288 218 C288 242 200 230 200 254", begin: "-1.6s" },
];

function StatusMark({ status, x, y }: { status: NodeStatus; x: number; y: number }) {
  switch (status) {
    case "done":
      return (
        <g transform={`translate(${x} ${y})`}>
          <circle r="7" fill="rgb(157 189 228 / 0.16)" stroke="var(--stage-sky)" strokeWidth="1" />
          <path d="M-3 0.2 -0.9 2.3 3.2 -2" fill="none" stroke="var(--stage-sky)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );
    case "retried":
      return (
        <g transform={`translate(${x} ${y})`}>
          <rect x="-24" y="-8" width="32" height="16" rx="8" fill="rgb(196 92 50 / 0.18)" stroke="var(--stage-floor)" strokeWidth="1" />
          <text x="-8" y="3.2" textAnchor="middle" fontSize="8.5" fontWeight="500" fill="#f0a27f">
            retry
          </text>
        </g>
      );
    case "waiting":
      return (
        <g transform={`translate(${x} ${y})`}>
          <circle r="7" fill="none" stroke="var(--stage-mist)" strokeWidth="1" strokeDasharray="2.5 2.5" />
          <circle r="2.5" fill="var(--stage-mist)">
            <animate attributeName="opacity" values="1;0.25;1" dur="1.8s" repeatCount="indefinite" />
          </circle>
        </g>
      );
    default: {
      const _never: never = status;
      return _never;
    }
  }
}

function Node({ node }: { node: GraphNode }) {
  const left = node.x - NODE_W / 2;
  const top = node.y - NODE_H / 2;

  return (
    <g>
      <rect x={left} y={top} width={NODE_W} height={NODE_H} rx="9" fill="#111111" stroke="rgb(255 255 255 / 0.12)" />
      <rect x={left + 10} y={top + 12} width="3" height="20" rx="1.5" fill={node.accent} />
      <text x={left + 20} y={top + 17} fontSize="8.5" fill="#a1a1aa">
        {node.kind}
      </text>
      <text x={left + 20} y={top + 31} fontSize="11" fontWeight="500" fill="#f4f4f5">
        {node.title}
      </text>
      <StatusMark status={node.status} x={left + NODE_W - 16} y={node.y} />
    </g>
  );
}

/** A support-agent run mid-flight: checkpointed steps, one retry, and a pending approval. */
export function RunGraph() {
  return (
    <div
      aria-hidden
      className="relative mx-auto w-full max-w-xl overflow-hidden rounded-[14px] bg-[linear-gradient(180deg,var(--stage-sky)_0%,var(--stage-mist)_55%,var(--stage-floor)_100%)] p-4 sm:p-8"
    >
      <div className="lp-noise absolute inset-0" />
      <div className="relative overflow-hidden rounded-[10px] bg-[#0a0a0a] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.45)] ring-1 ring-black/20">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 text-xs">
          <span className="flex items-center gap-2 font-medium text-foreground">
            <span className="relative flex size-2">
              <span className="absolute inset-0 rounded-full bg-[#9dbde4] opacity-60 motion-safe:animate-ping" />
              <span className="relative size-2 rounded-full bg-[#9dbde4]" />
            </span>
            Run #2041
          </span>
          <span className="text-muted">4 of 5 steps checkpointed</span>
        </div>
        <svg viewBox="0 0 400 316" className="block w-full font-sans">
          <defs>
            <radialGradient id="run-graph-pulse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="45%" stopColor="#9dbde4" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#9dbde4" stopOpacity="0" />
            </radialGradient>
          </defs>
          {EDGES.map((d) => (
            <path key={d} d={d} fill="none" stroke="rgb(255 255 255 / 0.18)" strokeWidth="1.25" />
          ))}
          <g className="motion-reduce:hidden">
            {PULSES.map((pulse) => (
              <circle key={pulse.begin} r="6" fill="url(#run-graph-pulse)">
                <animateMotion dur="3.2s" begin={pulse.begin} repeatCount="indefinite" path={pulse.path} />
              </circle>
            ))}
          </g>
          {NODES.map((node) => (
            <Node key={node.id} node={node} />
          ))}
        </svg>
      </div>
    </div>
  );
}
