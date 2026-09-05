export type AudienceGroup = {
  label: string;
  title: string;
  copy: string;
};

export const AUDIENCE: AudienceGroup[] = [
  {
    label: "Product teams",
    title: "Move from prototype to production",
    copy: "Ship customer-facing agents without turning reliability, memory, and observability into a separate infrastructure project.",
  },
  {
    label: "AI engineers",
    title: "Iterate with the original context",
    copy: "Inspect each execution, find the step that needs work, and replay it from the exact input it received the first time.",
  },
  {
    label: "Platform teams",
    title: "Standardize how agents run",
    copy: "Give every team one managed runtime for checkpoints, retries, approvals, sandboxed code, and persistent memory.",
  },
];
