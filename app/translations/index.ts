import { supportedLanguages as supported, SupportedLanguagesType } from "./supportedLanguages";
import { appTranslations } from "./appTranslations";
// import { tourTranslations } from "./gameTranslations";

const createTranslation = () => {
  const translation = {}
  for (const lang of supported) {
    // @ts-expect-error Common TS!
    translation[lang] = {
      ...appTranslations[lang],
      // ...tourTranslations,
    }
  }
  return translation as { [key in SupportedLanguagesType]: { [key: string]: string } }
}

export const supportedLanguages = supported
const t = createTranslation()
export default t