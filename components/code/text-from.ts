import { isValidElement, type ReactNode } from "react";

export function textFrom(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(textFrom).join("");
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return textFrom(node.props.children);
  }

  return "";
}
