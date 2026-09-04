export type AudiencePerson = {
  name: string;
  title: string;
  role: string;
  image: string;
  copy: string;
};

export const AUDIENCE: AudiencePerson[] = [
  {
    name: "Mira",
    title: "Founder",
    role: "Would have written this herself",
    image: "/ref/avatar-founder.jpg",
    copy: "You already know how to write the agent loop. What you do not want is another weekend on workers, retries, and a store you will have to keep.",
  },
  {
    name: "Noah",
    title: "Platform engineer",
    role: "Tired of the full re-run",
    image: "/ref/avatar-engineer.jpg",
    copy: "Changing one prompt and paying for the whole graph again is a real cost. You want to name the broken step and run that node against the input it already saw.",
  },
  {
    name: "Leila",
    title: "On a framework",
    role: "Still has to operate the run",
    image: "/ref/avatar-team.jpg",
    copy: "The framework solved the loop. You still host the process, store the facts, and sandbox the code node. Linea is that second half.",
  },
];
