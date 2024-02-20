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

  return "";
}

export function containsType(name: string, type: NameType): boolean {
  switch (type) {
    case "hiragana":
      return /[ぁ-ん]/.test(name); // Test for hiragana characters
    case "kata":
      return /[ァ-ン]/.test(name); // Test for katakana characters
    case "kanji":
      return /[\u4E00-\u9FFF]/.test(name); // Test for kanji characters
    case "eng":
      return /[a-zA-Z]/.test(name); // Test for English characters
    default:
      return false;
  }
}
