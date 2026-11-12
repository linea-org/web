export type Announcement = {
  href: string;
  label: string;
  copy: string;
  /** Phone version after the label; must fit one line at 375px with "New: " and the label. */
  short: string;
};

export const ANNOUNCEMENTS: Announcement[] = [
  {
    href: "/replay",
    label: "Step-level replay",
    copy: "replay one node from its original input. The host kept the checkpoint.",
    short: "rerun one node",
  },
  {
    href: "/memory",
    label: "Memory",
    copy: "facts that survive the run, without a store you have to keep.",
    short: "facts that persist",
  },
  {
    href: "/runtime",
    label: "Runtime",
    copy: "Linea executes the graph. Checkpoints, retries, and recovery come with the host.",
    short: "durable runs",
  },
  {
    href: "/research",
    label: "Research",
    copy: "notes on the substrate production agents actually need.",
    short: "field notes",
  },
];
