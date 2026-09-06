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
    copy: "A step can only be replayed against the payload it originally received. That payload exists only if the host executed the run.",
  },
  {
    href: "/blog/the-half-frameworks-do-not-ship",
    title: "The half frameworks do not ship",
    date: "2026-08-04",
    kind: "Thesis",
    copy: "Frameworks write the loop. They do not host the process, keep memory, or hold the checkpoint a single-node replay needs.",
  },
  {
    href: "/blog/memory-is-not-a-side-quest",
    title: "Memory is not a side quest",
    date: "2026-07-28",
    kind: "Note",
    copy: "The graph asks for memory. The host keeps it. Future executions can read what earlier ones learned.",
  },
  {
    href: "/blog/sandbox-the-code-node",
    title: "Sandbox the code node",
    date: "2026-07-21",
    kind: "Note",
    copy: "A code node is expected. It still has to run somewhere that cannot take the host down.",
  },
];
