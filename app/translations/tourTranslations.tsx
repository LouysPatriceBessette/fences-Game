 
import { Apos, Bold, Italic, Quot, Hr, Anchor } from "./translations.components.styled"

// Édouard Lucas Wikipedia links
const wikilinks = {
  EN: 'https://en.wikipedia.org/wiki/%C3%89douard_Lucas',
  FR: 'https://fr.wikipedia.org/wiki/%C3%89douard_Lucas',
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

export const tourTranslations = {
  EN: {
    'Tour Dialog title': `Welcome to Dots and Boxes!`,
    'Tour Dialog P1': <>
      <p>
        This game was described created by <Anchor href={wikilinks['EN']}><Bold>Édouard Lucas</Bold></Anchor>, a renowned French mathematician, in his book <Quot/><Italic>Jeux scientifiques pour servir à l<Apos/>histoire</Italic><Quot/>. He died two years later, on October 3, 1991, at the age of 49.
      </p>
      <Hr/>
    </>,
    'Tour Dialog P2': <p>
      Make the tour to learn about the user interface of this web version of the game and about the game rules.
    </p>,
    'Tour Dialog button': 'Start the tour',

    'Game grid': 'Game grid',
  },
  FR: {
    'Game grid': 'Grille de jeu',
  },
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


