type AuthorProfile = {
  url: string;
  image: string;
};

const AUTHORS: Record<string, AuthorProfile> = {
  "Linea Labs": {
    url: "https://x.com",
    image: "/ref/rocket-avatar.webp",
  },
};

export function authorProfile(name: string): AuthorProfile | undefined {
  return AUTHORS[name];
}
