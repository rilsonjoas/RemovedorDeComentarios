interface CommentPattern {
  type: "block" | "line";
  regex: RegExp;
}

type LanguagePatterns = CommentPattern[] | string;

interface CommentPatternsMap {
  [language: string]: LanguagePatterns;
}

export const commentPatterns: CommentPatternsMap = {
  javascript: [
    { type: "block", regex: /\/\*[\s\S]*?\*\//g },
    { type: "line", regex: /\/\/[^\n\r]*(\r\n|\n|\r)?/g },
  ],
  python: [{ type: "line", regex: /#.*/g }],
  java: "javascript",
  c: "javascript",
  cpp: "javascript",
  csharp: "javascript",
  php: [
    { type: "block", regex: /\/\*[\s\S]*?\*\//g },
    { type: "line", regex: /(?:\/\/|#)[^\n\r]*(\r\n|\n|\r)?/g },
  ],
  ruby: [
    { type: "line", regex: /#.*/g },
    { type: "block", regex: /=begin[\s\S]*?=end/g },
  ],
  swift: "javascript",
  kotlin: "javascript",
  go: "javascript",
  rust: "javascript",
  scala: "javascript",
  html: [{ type: "block", regex: /<!--[\s\S]*?-->/g }],
  css: [{ type: "block", regex: /\/\*[\s\S]*?\*\//g }],
  sql: [
    { type: "line", regex: /--.*/g },
    { type: "block", regex: /\/\*[\s\S]*?\*\//g },
  ],
  lua: [
    { type: "line", regex: /--(?!(?:\[\[|\]\])).*/g },
    { type: "block", regex: /--\[\[[\s\S]*?]]/g },
  ],
  powershell: [
    { type: "line", regex: /#.*/g },
    { type: "block", regex: /<#[\s\S]*?#>/g },
  ],
  perl: [{ type: "line", regex: /#.*/g }],
  vbnet: [
    { type: "line", regex: /'.*/g },
    { type: "line", regex: /\bREM\b.*/gi },
  ],
  assembly: [{ type: "line", regex: /;.*/g }],
  bash: [{ type: "line", regex: /(?<!^#!)#.*/g }], 
  haskell: [
    { type: "line", regex: /--.*/g },
    { type: "block", regex: /{-[\s\S]*?-}/g },
  ],
};

function getPatternsForLanguage(lang: string): CommentPattern[] | undefined {
  const patterns = commentPatterns[lang];
  if (!patterns) return undefined;
  if (typeof patterns === "string") {
    return getPatternsForLanguage(patterns);
  }
  return patterns;
}

export function removeComments(code: string, lang: string): string {
  const patterns = getPatternsForLanguage(lang);
  if (!patterns) {
    console.warn(`Nenhum padrão de comentário definido para: ${lang}`);
    return code;
  }
  let cleanedCode = code;
  const sortedPatterns = [...patterns].sort((a) => (a.type === "block" ? -1 : 1));

  sortedPatterns.forEach((patternInfo) => {
    cleanedCode = cleanedCode.replace(patternInfo.regex, "");
  });
  cleanedCode = cleanedCode.replace(/^\s*[\r\n]/gm, "");
  return cleanedCode;
}

export function getAvailableLanguages(): { value: string; label: string }[] {
    const sortedLanguages = Object.keys(commentPatterns).sort();
    const languageOptions = [];
    for (const langKey of sortedLanguages) {
        if (typeof commentPatterns[langKey] === "string") continue; 
        languageOptions.push({
            value: langKey,
            label: langKey.charAt(0).toUpperCase() + langKey
                     .slice(1)
                     .replace(/cpp/g, "C++")
                     .replace(/csharp/g, "C#")
                     .replace(/vbnet/g, "VB.NET")
        });
    }
    return languageOptions;
}