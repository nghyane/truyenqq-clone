export function isJapanese(text: string): boolean {
  return /^[\u3040-\u309F\u30A0-\u30FF\u31F0-\u31FF\uFF65-\uFF9Fー]+$/.test(
    text,
  );
}

export function hasJapanese(text: string): boolean {
  return /[\u3040-\u309F\u30A0-\u30FF\u31F0-\u31FF\uFF65-\uFF9Fー]+/.test(text);
}

type NameType = "hiragana" | "kata" | "kanji" | "eng";

export function getMainName(names: string[]): string {
  const priorityOrder: NameType[] = ["kata", "hiragana", "kanji", "eng"];

  for (const type of priorityOrder) {
    for (const name of names) {
      if (containsType(name, type)) {
        return name;
      }
    }
  }

  // Return an empty string if no matching name is found
  return "";
}

export function containsType(name: string, type: NameType): boolean {
  switch (type) {
    case "hiragana":
      return /[ぁ-ん]/.test(name); // Test for hiragana characters
    case "kata":
      return /[ァ-ン]/.test(name); // Test for katakana characters
    case "kanji":
      return /[\u3400-\u4DBF\u4E00-\u9FFF\u20000-\u2A6DF\u2A700-\u2B73F\u2B740-\u2B81F\u2B820-\u2CEAF\uF900-\uFAFF]/.test(
        name,
      ); // Test for kanji characters
    case "eng":
      return /[a-zA-Z]/.test(name); // Test for English characters
    default:
      return false;
  }
}
