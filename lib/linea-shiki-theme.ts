import type { ThemeRegistration } from "shiki";

export const lineaTheme: ThemeRegistration = {
  name: "linea",
  type: "dark",
  colors: {
    "editor.background": "#0a0a0a",
    "editor.foreground": "#ffffff",
  },
  tokenColors: [
    { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: "#a3a3a3" } },
    { scope: ["string"], settings: { foreground: "#e5e5e5" } },
    { scope: ["constant", "constant.numeric", "constant.language"], settings: { foreground: "#d4d4d4" } },
    { scope: ["keyword", "storage", "storage.type"], settings: { foreground: "#ffffff" } },
    { scope: ["entity.name.function", "support.function"], settings: { foreground: "#f5f5f5" } },
    { scope: ["variable", "meta.object-literal.key"], settings: { foreground: "#fafafa" } },
    { scope: ["punctuation"], settings: { foreground: "#a3a3a3" } },
  ],
};
