export type Announcement = {
  href: string;
  label: string;
  copy: string;
};

export const ANNOUNCEMENTS: Announcement[] = [
  {
    href: "/replay",
    label: "Step-level replay",
    copy: "replay one node from its original input. The host kept the checkpoint.",
  },
  {
    href: "/memory",
    label: "Memory",
    copy: "facts that survive the run, without a store you have to keep.",
  },
  {
    href: "/runtime",
    label: "Runtime",
    copy: "Linea executes the graph. Checkpoints, retries, and recovery come with the host.",
  },
  {
    href: "/research",
    label: "Research",
    copy: "notes on the substrate production agents actually need.",
  },
];
