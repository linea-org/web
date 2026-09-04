export type ResearchNote = {
  href: string;
  title: string;
  date: string;
  kind: "Note" | "Thesis";
  copy: string;
};

export const RESEARCH: ResearchNote[] = [
  {
    href: "/blog/why-replay-needs-the-checkpoint",
    title: "Why replay needs the checkpoint",
    date: "2026-08-18",
    kind: "Note",
    copy: "A step can only be replayed against the payload it originally received. That payload exists only if a host stored it during a real run.",
  },
  {
    href: "/blog/the-half-frameworks-do-not-ship",
    title: "The half frameworks do not ship",
    date: "2026-08-04",
    kind: "Thesis",
    copy: "Graph libraries solve the loop. They do not host the process, keep memory, or give you the input for a single-node replay.",
  },
  {
    href: "/blog/memory-is-not-a-side-quest",
    title: "Memory is not a side quest",
    date: "2026-07-28",
    kind: "Note",
    copy: "Facts have to survive the run. If the store is yours to operate, you are still doing the ops half.",
  },
  {
    href: "/blog/sandbox-the-code-node",
    title: "Sandbox the code node",
    date: "2026-07-21",
    kind: "Note",
    copy: "A code node is expected. It still has to run somewhere that cannot take the host down.",
  },
];
