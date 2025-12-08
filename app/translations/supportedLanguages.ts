export const languages: Record<SupportedLanguagesType, string> = {
  EN: `English`,
  FR: `Français`,
  ES: `Español`,
  DE: `Deutsch`,
  //IT: `Italiano`,
  NL: `Nederlands`,
  RU: `Русский`,
  ZH: `中文`,
  JA: `日本語`,
  KO: `한국어`,
  PT: `Português`,
  HT: `Kreyòl Ayisyen`,
}

export type SupportedLanguagesType = "EN" | "FR" | "ES" | "DE" | "NL" | "RU" | "ZH" | "JA" | "KO" | "PT" | "HT"

export const supportedLanguages: SupportedLanguagesType[] = ['EN','FR','ES','DE','NL','RU','ZH','JA','KO','PT','HT']
