import lang from "./ja.json";

type LanguageKey = keyof typeof lang;

type TranslationArgs = Record<string, string>;

const localize = (key: LanguageKey, args?: TranslationArgs): string => {
  const translation = lang[key];

  if (!translation) {
    return key; // Return the key if the translation is not found
  }

  if (!args) {
    return translation;
  }

  return Object.keys(args).reduce((acc, curr) => {
    return acc.replace(`:${curr}`, args[curr]);
  }, translation);
};

export default localize;
