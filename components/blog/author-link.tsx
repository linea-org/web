import { ExternalIcon } from "@/components/landing/external-icon";
import { Logo } from "@/components/landing/logo";
import { authorProfile } from "@/lib/authors";

export function AuthorLink({
  name,
  showIcon = false,
  className = "text-sm",
}: {
  name: string;
  showIcon?: boolean;
  className?: string;
}) {
  const profile = authorProfile(name);

  const inner = (
    <>
      <Logo size={24} />
      <span className={className}>{name}</span>
      {showIcon && profile ? <ExternalIcon /> : null}
    </>
  );

  if (!profile) {
    return <span className="inline-flex items-center gap-2">{inner}</span>;
  }

  return (
    <a
      href={profile.url}
      className="inline-flex items-center gap-2 hover:text-white"
      target="_blank"
      rel="noreferrer"
    >
      {inner}
    </a>
  );
}
