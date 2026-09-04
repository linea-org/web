import { TWITTER_URL } from "@/lib/socials";

type AuthorProfile = {
  url: string;
  image: string;
};

const AUTHORS: Record<string, AuthorProfile> = {
  "Linea Labs": {
    url: TWITTER_URL,
    image: "/linea.svg",
  },
};

export function authorProfile(name: string): AuthorProfile | undefined {
  return AUTHORS[name];
}
