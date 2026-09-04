export type Announcement = {
  href: string;
  label: string;
  copy: string;
};

export const ANNOUNCEMENTS: Announcement[] = [
  {
    href: "/replay",
    label: "Step-level replay",
    copy: "run one node again. Leave the rest of the graph alone.",
  },
  {
    href: "/memory",
    label: "Memory",
    copy: "facts that survive the run, without a store you have to keep.",
  },
  {
    href: "/runtime",
    label: "Runtime",
    copy: "the host stays up after the trigger. Checkpoints come with the run.",
  },
  {
    href: "/research",
    label: "Research",
    copy: "notes on checkpoints, replay, and the work a framework leaves on you.",
  },
];
