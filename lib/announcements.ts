export type Announcement = {
  href: string;
  label: string;
  copy: string;
};

export const ANNOUNCEMENTS: Announcement[] = [
  {
    href: "/replay",
    label: "Step-level replay",
    copy: "replay one node from its original input without rerunning the workflow.",
  },
  {
    href: "/memory",
    label: "Memory",
    copy: "carry facts and workspace knowledge across every execution.",
  },
  {
    href: "/runtime",
    label: "Runtime",
    copy: "deploy workflows with checkpoints, retries, and automatic recovery.",
  },
  {
    href: "/research",
    label: "Research",
    copy: "technical notes on reliable agent execution and iteration.",
  },
];
