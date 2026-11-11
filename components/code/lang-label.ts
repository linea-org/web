/** Display name for a fenced-code language id. */
export function langLabel(lang: string): string {
  switch (lang) {
    case "ts":
    case "typescript":
      return "TypeScript";
    case "tsx":
      return "TSX";
    case "js":
    case "javascript":
      return "JavaScript";
    case "py":
    case "python":
      return "Python";
    case "json":
      return "JSON";
    case "bash":
    case "sh":
    case "shell":
      return "Shell";
    case "":
    case "text":
      return "Text";
    default:
      return lang.toUpperCase();
  }
}
