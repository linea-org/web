import { createHighlighter, type Highlighter } from "shiki";
import { lineaTheme } from "@/lib/linea-shiki-theme";

const LANGS = ["json", "ts", "tsx", "js", "python", "bash", "text"] as const;

let highlighter: Highlighter | undefined;

async function getHighlighter(): Promise<Highlighter> {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: [lineaTheme],
      langs: [...LANGS],
    });
  }

  return highlighter;
}

type HighlightLang = (typeof LANGS)[number];

function resolveLang(lang: string): HighlightLang {
  return LANGS.includes(lang as HighlightLang) ? (lang as HighlightLang) : "text";
}

export async function highlightCode(code: string, lang: string): Promise<string> {
  const instance = await getHighlighter();
  const language = resolveLang(lang);

  if (!instance.getLoadedLanguages().includes(language)) {
    await instance.loadLanguage(language);
  }

  return instance.codeToHtml(code, {
    lang: language,
    theme: "linea",
  });
}
