export type AudienceIcon = "stack" | "replay" | "host";

export type AudienceGroup = {
  label: string;
  icon: AudienceIcon;
  title: string;
  copy: string;
};

export const AUDIENCE: AudienceGroup[] = [
  {
    label: "Technical founders",
    icon: "stack",
    title: "Would have assembled this stack",
    copy: "Durable execution, an agent framework, observability, evals, and a memory store are five products you would otherwise wire yourself. Linea is those on one data model.",
  },
  {
    label: "AI engineers",
    icon: "replay",
    title: "Fix the step that failed",
    copy: "A flag fires on an execution. Replay that node against the input it originally saw. Freeze it as a regression case, publish, and check you did not break the rest.",
  },
  {
    label: "Builders who operate the run",
    icon: "host",
    title: "The framework is not the host",
    copy: "LangGraph writes the loop. You still host it. Linea executes the graph and keeps the control plane: checkpoints, signals, approvals, and the records around the run.",
  },
];
