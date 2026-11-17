import type { ReactNode } from "react";

/**
 * The landing hero sets its last words in an italic sky tint. Do the same for
 * any plain-string page title, so every page opens like the landing page.
 */
export function accentTitle(title: ReactNode): ReactNode {
  if (typeof title !== "string") {
    return title;
  }

  const words = title.split(" ");

  if (words.length < 4) {
    return title;
  }

  const split = words.length - 2;

  return (
    <>
      {words.slice(0, split).join(" ")}{" "}
      <em className="text-[#c9dcf5] italic">{words.slice(split).join(" ")}</em>
    </>
  );
}
