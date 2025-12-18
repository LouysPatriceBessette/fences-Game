import { supportedLanguages as supported } from "./supportedLanguages";
import { appTranslations } from "./appTranslations";
import { infoTranslations } from "./infoTranslations";
import { tourInterfaceTranslations } from "./tourInterfaceTranslations";
import { tourPlayTranslation } from "./tourPlayTranslations";

const createTranslation = () => {
  const translation = {
  EN: {},
  FR: {},
  ES: {},
  DE: {},
  IT: {},
  NL: {},
  RU: {},
  ZH: {},
  JA: {},
  KO: {},
  PT: {},
  HT: {},
}
  for (const lang of supported) {
    
    translation[lang] = {
      ...appTranslations[lang],
      ...infoTranslations[lang],
      ...tourInterfaceTranslations[lang],
      ...tourPlayTranslation[lang],
    }
  }
  return translation
}

export const supportedLanguages = supported
const t = createTranslation() as { [key: string]: { [key: string]: string } }
export default t