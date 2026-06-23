// Single-pass char map. Because replacements are appended to the output
// (never re-scanned), the braces introduced by e.g. \textbackslash{} are
// not re-escaped — avoiding the classic ordering bug.
const MAP: Record<string, string> = {
  "\\": "\\textbackslash{}",
  "&": "\\&",
  "%": "\\%",
  "$": "\\$",
  "#": "\\#",
  "_": "\\_",
  "{": "\\{",
  "}": "\\}",
  "~": "\\textasciitilde{}",
  "^": "\\textasciicircum{}",
};

export function latexEscape(input: string): string {
  let out = "";
  for (const ch of input) out += MAP[ch] ?? ch;
  return out;
}
