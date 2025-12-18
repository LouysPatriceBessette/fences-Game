import { Bold, Italic, Apos, Quot, TourBlankLine, Hr, Anchor, RedText } from './translations.components.styled'

// Édouard Lucas Wikipedia links
const wikilinks = {
  EN: 'https://en.wikipedia.org/wiki/%C3%89douard_Lucas',
  FR: 'https://fr.wikipedia.org/wiki/%C3%89douard_Lucas',
  ES: 'https://es.wikipedia.org/wiki/%C3%89douard_Lucas',
  DE: 'https://de.wikipedia.org/wiki/%C3%89douard_Lucas',
  IT: 'https://it.wikipedia.org/wiki/%C3%89douard_Lucas',
  NL: 'https://nl.wikipedia.org/wiki/%C3%89douard_Lucas',
  RU: 'https://ru.wikipedia.org/wiki/%D0%9B%D1%8E%D0%BA%D0%B0,_%D0%A4%D1%80%D0%B0%D0%BD%D1%81%D1%83%D0%B0_%D0%AD%D0%B4%D1%83%D0%B0%D1%80%D0%B4_%D0%90%D0%BD%D0%B0%D1%82%D0%BE%D0%BB%D1%8C',
  ZH: 'https://zh.wikipedia.org/wiki/%E7%88%B1%E5%BE%B7%E5%8D%8E%C2%B7%E5%8D%A2%E5%8D%A1%E6%96%AF',
  JA: 'https://ja.wikipedia.org/wiki/%E3%82%A8%E3%83%89%E3%82%A5%E3%82%A2%E3%83%BC%E3%83%AB%E3%83%BB%E3%83%AA%E3%83%A5%E3%82%AB',
  KO: 'https://ko.wikipedia.org/wiki/%EC%97%90%EB%91%90%EC%95%84%EB%A5%B4_%EB%A4%BC%EC%B9%B4',
  PT: 'https://pt.wikipedia.org/wiki/%C3%89douard_Lucas',
  HT: 'https://ht.wikipedia.org/wiki/Edouard_Lucas',
}

export const tourInterfaceTranslations = {
  EN: {
    'Loading the tour...': 'Loading the tour...',

    'Tour Dialog title': `Welcome to Dots and Boxes!`,
    'Tour Dialog P1': <>
      <p>
        This game was described by <Anchor href={wikilinks['EN']}><Bold>Édouard Lucas</Bold></Anchor>, a renowned French mathematician, in his book <Quot/><Italic>Jeux scientifiques pour servir à l<Apos/>histoire</Italic><Quot/> (Scientific Games to Serve History). He passed away two years later, on October 3, 1991, at the age of 49.
      </p>
      <Hr/>
    </>,
    'Tour Dialog P2': <p>
      Take the guided tour to discover the user interface of this web version, as well as the rules of the game.
    </p>,
    'Start interface tour': <div>Game interface</div>,

    'Intro 1 title': <div>Pay attention to the <b><RedText>red</RedText></b> arrow.</div>,
    'Intro 1 description': <>
      <div>In this case, it refers to the number of potential players currently on the site.</div>
      <div><TourBlankLine/></div>
      <div>This number includes you.</div>
    </>,

    'Intro 2 title': <div>Future Development...</div>,
    'Intro 2 description': <>
      <div>You will be able to request to play with them.</div>
      <div><TourBlankLine/></div>
      <div>But for now, you need to invite one of your friends directly.</div>
    </>,

    'Intro 3 title': <div>Let<Apos/>s get started!</div>,
    'Intro 3 description': <>
      <div>There must be two players.</div>
      <div>Player 1 creates the game.</div>
    </>,

    'Player 1 name title': <div>Player 1 Name</div>,
    'Player 1 name description': <>
      <div>Their name is on the left.</div>
      <div>If you create the game, your name will be there.</div>
    </>,

    'Player 1 score title': <div>Player 1 Score</div>,
    'Player 1 score description': <div>For each box that Player 1 closes, one point is awarded to them.</div>,

    'Player 2 name title': <div>Player 2 Name</div>,
    'Player 2 name description': <div>If you join a game, your name will be on the left.</div>,

    'Player 2 score title': <div>Player 2 Score</div>,
    'Player 2 score description': <div>For each box that Player 2 closes, one point is awarded to them.</div>,

    'Play grid title': <div>Game Grid</div>,
    'Play grid description': <>
      <div>The grid is made up of boxes.</div>
      <div><TourBlankLine/></div>
      <div>In this case, it is a <Bold>2</Bold> x <Bold>2</Bold> grid.</div>
      <div>It can have different dimensions.</div>
      <div>For example: <Bold>6</Bold> x <Bold>8</Bold></div>
    </>,

    'Controls drawer button title': <div>Controls</div>,
    'Controls drawer button description': <div>This button opens a control panel.</div>,

    'Create game title': <div>Create</div>,
    'Create game description': <div>This button opens the game creation form.</div>,

    'Create name input title': <div>Your Name</div>,
    'Create name input description': <div>Let<Apos/>s say your name is Bertha...</div>,

    'Create game grid title': <div>Adjust Dimensions</div>,
    'Create game grid description': <>
      <div>Use the sliders. The grid will adjust and give you a visual idea of the result.</div>
      <div><TourBlankLine/></div>
      <div>Note that on a mobile device, a width of more than <Bold>6</Bold> forces the user to <Quot/>Zoom with pinch<Quot/> to see the entire grid.</div>
    </>,

    'Join game title': <div>Join</div>,
    'Join game description': <div>This button opens the form to join a game.</div>,

    'Join game input title': <div>Your Friend<Apos/>s Name</div>,
    'Join game input description': <div>Let<Apos/>s say your name is Horacio...</div>,

    'Join game pin title': <div>Game Number</div>,
    'Join game pin description': <div>Your friend must enter the number you gave them.</div>,

    'Leave/Delete game title': <div>Leave / Delete</div>,
    'Leave/Delete game description': <>
      <div>This button allows you to leave a game.</div>
      <div><TourBlankLine/></div>
      <div>If there is only one player, the game will be deleted.</div>
    </>,

    'More title': <div>More</div>,
    'More description': <div>This button reveals more options.</div>,

    'Less title': <div>Less</div>,
    'Less description': <div>This button goes back to the initial options.</div>,

    'Tour title': <div>Guided Tour</div>,
    'Tour description': <div>You know what this button does!</div>,

    'Language title': <div>Languages</div>,
    'Language description': <div>To choose another translation.</div>,

    'Chat title': <div>Chat Button</div>,
    'Chat description': <>
      <div>This button opens the chat panel.</div>
      <div>It is only available when there is another player in the game.</div>
      <div><TourBlankLine/></div>
      <div>And even if they are offline.</div>
    </>,

    'Chat drawer title': <div>Chat Panel</div>,
    'Chat drawer description': <>
      <div>Chat in real-time!</div>
      <div><TourBlankLine/></div>
      <div>
        Like on a social network, except the other person will not receive notifications.
        If they are offline, they will see their messages on their next login.
      </div>
    </>,

    'Chat messages title': <div>Messages</div>,
    'Chat messages description': <>
      <div>The messages appear here.</div>
      <div>The name of the person appears in front of the message.</div>
    </>,

    'Chat input title': <div>Message Input</div>,
    'Chat input description': <>
      <div>Type here.</div>
      <div><TourBlankLine/></div>
      <div>If the other person is online and has closed their chat panel, it will open automatically.</div>
    </>,

    'Game over title': <div>Game Over</div>,
    'Game over description': <>
      <div>You can start a new game with the same player.</div>
      <div><TourBlankLine/></div>
      <div>The grid will be the same size.</div>
    </>,
  },
  FR: {
    'Loading the tour...': 'Chargement de la visite...',

    'Tour Dialog title': `Bienvenue dans Dots and Boxes !`,
    'Tour Dialog P1': <>
      <p>
        Ce jeu a été décrit par <Anchor href={wikilinks['FR']}><Bold>Édouard Lucas</Bold></Anchor>, un mathématicien français renommé, dans son livre <Quot/><Italic>Jeux scientifiques pour servir à l<Apos/>histoire</Italic><Quot/>. Il est décédé deux ans plus tard, le 3 octobre 1991, à l<Apos/>âge de 49 ans.
      </p>
      <Hr/>
    </>,
    'Tour Dialog P2': <p>
      Faites la visite guidée pour découvrir l<Apos/>interface utilisateur de cette version web ainsi que les règles du jeu.
    </p>,
    'Start interface tour': <div>L<Apos/>interface de jeu</div>,

    'Intro 1 title': <div>Portez attention à la flèche <b><RedText>rouge</RedText></b>.</div>,
    'Intro 1 description': <>
      <div>Dans ce cas-ci, il s<Apos/>agit du nombre de joueur·euses potentiels qui sont actuellement sur le site.</div>
      <div><TourBlankLine/></div>
      <div>Ce nombre vous inclus.</div>
    </>,

    'Intro 2 title': <div>Développement futur...</div>,
    'Intro 2 description': <>
          <div>Vous pourrez leur faire une demande pour jouer avec iels. </div>
          <div><TourBlankLine/></div>
          <div>Mais pour le moment, il faut inviter un·e de vos ami.es directement.</div>
        </>,

    'Intro 3 title': <div>Débutons!</div>,
    'Intro 3 description': <>
          <div>Il doit y avoir deux joueur·euses.</div>
          <div>Joueur·euse 1 crée la partie.</div>
        </>,

    'Player 1 name title': <div>Nom de Joueur·euse 1</div>,
    'Player 1 name description': <>
          <div>Son nom est à gauche.</div>
          <div>Si vous créez la partie, votre nom sera là.</div>
        </>,

    'Player 1 score title': <div>Pointage de Joueur·euse 1</div>,
    'Player 1 score description':  <div>Pour chaque boîte que Joueur·euse 1 ferme, un point lui est attribué.</div>,

    'Player 2 name title': <div>Nom de Joueur·euse 2</div>,
    'Player 2 name description': <div>Si vous rejoignez une partie, votre nom sera à gauche.</div>,

    'Player 2 score title': <div>Pointage de Joueur·euse 2</div>,
    'Player 2 score description': <div>Pour chaque boîte que Joueur·euse 2 ferme, un point lui est attribué.</div>,

    'Play grid title': <div>Grille de jeu</div>,
    'Play grid description': <>
          <div>La grille est composée de boites.</div>
          <div><TourBlankLine/></div>
          <div>Ici, il s<Apos/>agit d<Apos/>une grille de <Bold>2</Bold> x <Bold>2</Bold>.</div>
          <div>Elle peut être de dimensions différente.</div>
          <div>Par exemple: <Bold>6</Bold> x <Bold>8</Bold></div>
        </>,

    'Controls drawer button title': <div>Contrôles</div>,
    'Controls drawer button description': <div>Ce bouton ouvre un panneau de contrôle.</div>,

    'Create game title': <div>Créer</div>,
    'Create game description': <div>Ce bouton ouvre le formulaire de création de partie.</div>,

    'Create name input title': <div>Votre nom</div>,
    'Create name input description': <div>Disons que votre nom est Bertha...</div>,

    'Create game grid title': <div>Ajustez les dimensions</div>,
    'Create game grid description':  <>
      <div>Utilisez les curseurs. La grille s<Apos/>ajustera vous donnera une idée visuelle du résultat.</div>
      <div><TourBlankLine/></div>
      <div>À noter que sur un appareil mobile, une largeur de plus de <Bold>6</Bold> force l<Apos/>utilisateur·euse à faire un <Quot/>Zoom par pincement<Quot/> pour voir l<Apos/>ensemble de la grille.</div>
    </>,

    'Join game title': <div>Joindre</div>,
    'Join game description': <div>Ce bouton ouvre le formulaire pour joindre une partie.</div>,

    'Join game input title': <div>Nom de votre ami.e</div>,
    'Join game input description': <div>Disons que votre nom est Horacio...</div>,

    'Join game pin title': <div>Game number</div>,
    'Join game pin description': <div>Votre ami.e doit entrer le numéro que vous lui avez donné.</div>,

    'Leave/Delete game title': <div>Quitter / Supprimer</div>,
    'Leave/Delete game description': <>
      <div>Ce bouton permet de quitter une partie.</div>
      <div><TourBlankLine/></div>
      <div>S<Apos/>il n<Apos/>y a qu<Apos/>un·e seul·e joueur·euse, la partie est supprimée.</div>
    </>,
    'More title': <div>Plus</div>,
    'More description':  <div>Ce bouton révèle plus de boutons.</div>,

    'Less title': <div>Moins</div>,
    'Less description': <div>Ce bouton revient vers les premiers boutons.</div>,

    'Tour title': <div>Visite guidée</div>,
    'Tour description': <div>Vous savez ce que ce bouton fait!</div>,

    'Language title': <div>Langues</div>,
    'Language description': <div>Pour choisir une autre traduction.</div>,

    'Chat title': <div>Bouton de discussion</div>,
    'Chat description': <>
      <div>Ce bouton ouvre le panneau de discussion.</div>
      <div>Il n<Apos/>est disponible que lorsqu<Apos/>il y a un·e autre joueur·euse dans la partie.</div>
      <div><TourBlankLine/></div>
      <div>Et ce, même s<Apos/>iel est hors-ligne.</div>
    </>,

    'Chat drawer title': <div>Panneau de dicussion</div>,
    'Chat drawer description': <>
      <div>Discutez en temps réel!</div>
      <div><TourBlankLine/></div>
      <div>
        Comme sur un réseau social, sauf que l<Apos/>autre personne ne recevra pas de notification.
        s<Apos/>iel est hors ligne, iel verra ses messages à sa prochaine connexion.
      </div>
    </>,

    'Chat messages title': <div>Messages</div>,
    'Chat messages description': <>
      <div>Les messages apparaîssent ici.</div>
      <div>Le nom de la personne apparaît devant le message.</div>
    </>,

    'Chat input title': <div>Saisie de message</div>,
    'Chat input description': <>
      <div>Écrivez ici.</div>
      <div><TourBlankLine/></div>
      <div>Si l<Apos/>autre personne est en ligne et q<Apos/>uiel a fermé son panneau de discussion, il s<Apos/>ouvrira automatiquement.</div>
    </>,

    'Game over title': <div>Partie terminée</div>,
    'Game over description': <>
      <div>Vous pouvez démarrer une nouvelle partie avec le·la même joueur·euse.</div>
      <div><TourBlankLine/></div>
      <div>La grille sera de la même dimension.</div>
    </>,
  },
  ES: {
    'Loading the tour...': 'Cargando el tour...',

    'Tour Dialog title': '¡Bienvenido a Dots and Boxes!',
    'Tour Dialog P1': <>
      <p>
        Este juego fue descrito por <Anchor href={wikilinks['ES']}><Bold>Édouard Lucas</Bold></Anchor>, un renombrado matemático francés, en su libro <Quot/><Italic>Jeux scientifiques pour servir à l<Apos/>histoire</Italic><Quot/> (Juegos Científicos para Servir a la Historia). Falleció dos años después, el 3 de octubre de 1991, a la edad de 49 años.
      </p>
      <Hr/>
    </>,
    'Tour Dialog P2': <p>
      Realiza el tour guiado para descubrir la interfaz de usuario de esta versión web y las reglas del juego.
    </p>,
    'Start interface tour': 'Iniciar el tour',

    'Intro 1 title': <div>Presta atención a la flecha <b><RedText>roja</RedText></b>.</div>,
    'Intro 1 description': <>
      <div>En este caso, se refiere al número de jugador·es potenciales que están actualmente en el sitio.</div>
      <div><TourBlankLine/></div>
      <div>Este número te incluye.</div>
    </>,

    'Intro 2 title': <div>Desarrollo futuro...</div>,
    'Intro 2 description': <>
      <div>Puedes solicitar jugar con ell·as.</div>
      <div><TourBlankLine/></div>
      <div>Pero por ahora, necesitas invitar a uno de tus amig·as directamente.</div>
    </>,

    'Intro 3 title': <div>¡Empecemos!</div>,
    'Intro 3 description': <>
      <div>Debe haber dos jugador·es.</div>
      <div>Jugador·a 1 crea el juego.</div>
    </>,

    'Player 1 name title': <div>Nombre de Jugador·a 1</div>,
    'Player 1 name description': <>
      <div>Su nombre está a la izquierda.</div>
      <div>Si creas el juego, tu nombre estará allí.</div>
    </>,

    'Player 1 score title': <div>Puntuación de Jugador·a 1</div>,
    'Player 1 score description': <div>Por cada caja que cierra el Jugador·a 1, se le otorga un punto.</div>,

    'Player 2 name title': <div>Nombre de Jugador·a 2</div>,
    'Player 2 name description': <div>Si te unes a un juego, tu nombre estará a la izquierda.</div>,

    'Player 2 score title': <div>Puntuación de Jugador·a 2</div>,
    'Player 2 score description': <div>Por cada caja que cierra el Jugador·a 2, se le otorga un punto.</div>,

    'Play grid title': <div>Grilla de juego</div>,
    'Play grid description': <>
      <div>La grilla está compuesta de cajas.</div>
      <div><TourBlankLine/></div>
      <div>En este caso, es una grilla de <Bold>2</Bold> x <Bold>2</Bold>.</div>
      <div>Puede tener dimensiones diferentes.</div>
      <div>Por ejemplo: <Bold>6</Bold> x <Bold>8</Bold></div>
    </>,

    'Controls drawer button title': <div>Controles</div>,
    'Controls drawer button description': <div>Este botón abre un panel de control.</div>,

    'Create game title': <div>Crear</div>,
    'Create game description': <div>Este botón abre el formulario de creación de juego.</div>,

    'Create name input title': <div>Tu Nombre</div>,
    'Create name input description': <div>Supongamos que tu nombre es Bertha...</div>,

    'Create game grid title': <div>Ajusta las Dimensiones</div>,
    'Create game grid description': <>
      <div>Usa los controles deslizantes. La grilla se ajustará y te dará una idea visual del resultado.</div>
      <div><TourBlankLine/></div>
      <div>Ten en cuenta que en un dispositivo móvil, un ancho de más de <Bold>6</Bold> obliga al usuario·a a hacer <Quot/>Zoom con pellizco<Quot/> para ver toda la grilla.</div>
    </>,

    'Join game title': <div>Unirse</div>,
    'Join game description': <div>Este botón abre el formulario para unirse a un juego.</div>,

    'Join game input title': <div>Nombre de tu amigo·a</div>,
    'Join game input description': <div>Supongamos que tu nombre es Horacio...</div>,

    'Join game pin title': <div>Número de juego</div>,
    'Join game pin description': <div>Tu amigo·a debe ingresar el número que le proporcionaste.</div>,

    'Leave/Delete game title': <div>Salir / Eliminar</div>,
    'Leave/Delete game description': <>
      <div>Este botón permite salir de un juego.</div>
      <div><TourBlankLine/></div>
      <div>Si solo hay un·a jugador·a, el juego se eliminará.</div>
    </>,
    'More title': <div>Más</div>,
    'More description': <div>Este botón revela más opciones.</div>,

    'Less title': <div>Menos</div>,
    'Less description': <div>Este botón vuelve a las opciones iniciales.</div>,

    'Tour title': <div>Tour guiado</div>,
    'Tour description': <div>¡Sabes lo que hace este botón!</div>,

    'Language title': <div>Idiomas</div>,
    'Language description': <div>Para elegir otra traducción.</div>,

    'Chat title': <div>Botón de chat</div>,
    'Chat description': <>
      <div>Este botón abre el panel de chat.</div>
      <div>Solo está disponible cuando hay otro jugador·a en el juego.</div>
      <div><TourBlankLine/></div>
      <div>Y aunque esté fuera de línea.</div>
    </>,

    'Chat drawer title': <div>Panel de chat</div>,
    'Chat drawer description': <>
      <div>¡Chatea en tiempo real!</div>
      <div><TourBlankLine/></div>
      <div>
        Como en una red social, excepto que la otra persona no recibirá notificaciones.
        Si está fuera de línea, verá sus mensajes en su próxima conexión.
      </div>
    </>,

    'Chat messages title': <div>Mensajes</div>,
    'Chat messages description': <>
      <div>Los mensajes aparecen aquí.</div>
      <div>El nombre de la persona aparece antes del mensaje.</div>
    </>,

    'Chat input title': <div>Entrada de mensaje</div>,
    'Chat input description': <>
      <div>Escribe aquí.</div>
      <div><TourBlankLine/></div>
      <div>Si la otra persona está en línea y ha cerrado su panel de chat, se abrirá automáticamente.</div>
    </>,

    'Game over title': <div>Juego terminado</div>,
    'Game over description': <>
      <div>Puedes iniciar un nuevo juego con el·la misma jugador·a.</div>
      <div><TourBlankLine/></div>
      <div>La grilla será del mismo tamaño.</div>
    </>
  },
  DE: {
    'Tour Dialog title': `Willkommen bei Dots and Boxes!`,
    'Tour Dialog P1': <>
      <p>
        Dieses Spiel wurde von <Anchor href={wikilinks['DE']}><Bold>Édouard Lucas</Bold></Anchor>, einem renommierten französischen Mathematiker, in seinem Buch <Quot/><Italic>Jeux scientifiques pour servir à l<Apos/>histoire</Italic><Quot/> (Wissenschaftliche Spiele zur Geschichtsvermittlung) beschrieben. Er starb zwei Jahre später, am 3. Oktober 1991, im Alter von 49 Jahren.
      </p>
      <Hr/>
    </>,
    'Tour Dialog P2': <p>
      Machen Sie die geführte Tour, um die Benutzeroberfläche dieser Webversion sowie die Regeln des Spiels zu entdecken.
    </p>,
    'Start interface tour': 'Beginnen Sie die Tour',

    'Intro 1 title': <div>Achten Sie auf den <b><RedText>roten</RedText></b> Pfeil.</div>,
    'Intro 1 description': <>
      <div>In diesem Fall bezieht es sich auf die Anzahl der potenziellen Spieler·innen, die sich derzeit auf der Seite befinden.</div>
      <div><TourBlankLine/></div>
      <div>Diese Zahl beinhaltet Sie.</div>
    </>,

    'Intro 2 title': <div>Zukünftige Entwicklungen...</div>,
    'Intro 2 description': <>
      <div>Sie können anfragen, um mit ihnen zu spielen.</div>
      <div><TourBlankLine/></div>
      <div>Aber im Moment müssen Sie einen Ihrer Freunde direkt einladen.</div>
    </>,

    'Intro 3 title': <div>Fangen wir an!</div>,
    'Intro 3 description': <>
      <div>Es müssen zwei Spieler·innen vorhanden sein.</div>
      <div>Spieler·in 1 erstellt das Spiel.</div>
    </>,

    'Player 1 name title': <div>Name von Spieler·in 1</div>,
    'Player 1 name description': <>
      <div>Ihr Name steht links.</div>
      <div>Wenn Sie das Spiel erstellen, wird Ihr Name dort stehen.</div>
    </>,

    'Player 1 score title': <div>Punktestand von Spieler·in 1</div>,
    'Player 1 score description': <div>Für jede Box, die Spieler·in 1 schließt, erhält sie einen Punkt.</div>,

    'Player 2 name title': <div>Name von Spieler·in 2</div>,
    'Player 2 name description': <div>Wenn Sie einem Spiel beitreten, wird Ihr Name links stehen.</div>,

    'Player 2 score title': <div>Punktestand von Spieler·in 2</div>,
    'Player 2 score description': <div>Für jede Box, die Spieler·in 2 schließt, erhält sie einen Punkt.</div>,

    'Play grid title': <div>Spielgitter</div>,
    'Play grid description': <>
      <div>Das Gitter besteht aus Boxen.</div>
      <div><TourBlankLine/></div>
      <div>In diesem Fall handelt es sich um ein <Bold>2</Bold> x <Bold>2</Bold> Gitter.</div>
      <div>Es kann unterschiedliche Dimensionen haben.</div>
      <div>Zum Beispiel: <Bold>6</Bold> x <Bold>8</Bold></div>
    </>,

    'Controls drawer button title': <div>Steuerungen</div>,
    'Controls drawer button description': <div>Dieser Knopf öffnet ein Steuerungsfeld.</div>,

    'Create game title': <div>Erstellen</div>,
    'Create game description': <div>Dieser Knopf öffnet das Formular zur Spiel Erstellung.</div>,

    'Create name input title': <div>Ihr Name</div>,
    'Create name input description': <div>Angenommen, Ihr Name ist Bertha...</div>,

    'Create game grid title': <div>Dimensionen anpassen</div>,
    'Create game grid description': <>
      <div>Verwenden Sie die Schieberegler. Das Gitter wird sich anpassen und Ihnen eine visuelle Vorstellung vom Ergebnis geben.</div>
      <div><TourBlankLine/></div>
      <div>Bitte beachten Sie, dass auf einem mobilen Gerät eine Breite von mehr als <Bold>6</Bold> den Benutzer dazu zwingt, <Quot/>Mit Pinnen zoomen<Quot/> zu müssen, um das gesamte Gitter zu sehen.</div>
    </>,

    'Join game title': <div>Beitreten</div>,
    'Join game description': <div>Dieser Knopf öffnet das Formular, um einem Spiel beizutreten.</div>,

    'Join game input title': <div>Name Ihres Freundes</div>,
    'Join game input description': <div>Angenommen, Ihr Name ist Horacio...</div>,

    'Join game pin title': <div>Spielnummer</div>,
    'Join game pin description': <div>Ihr Freund muss die Nummer eingeben, die Sie ihm gegeben haben.</div>,

    'Leave/Delete game title': <div>Verlassen / Löschen</div>,
    'Leave/Delete game description': <>
      <div>Dieser Knopf ermöglicht es Ihnen, ein Spiel zu verlassen.</div>
      <div><TourBlankLine/></div>
      <div>Wenn nur ein·e Spieler·in vorhanden ist, wird das Spiel gelöscht.</div>
    </>,

    'More title': <div>Mehr</div>,
    'More description': <div>Dieser Knopf zeigt weitere Optionen an.</div>,

    'Less title': <div>Weniger</div>,
    'Less description': <div>Dieser Knopf kehrt zu den ursprünglichen Optionen zurück.</div>,

    'Tour title': <div>Geführte Tour</div>,
    'Tour description': <div>Sie wissen, was dieser Knopf tut!</div>,

    'Language title': <div>Sprachen</div>,
    'Language description': <div>Um eine andere Übersetzung auszuwählen.</div>,

    'Chat title': <div>Chat-Knopf</div>,
    'Chat description': <>
      <div>Dieser Knopf öffnet das Chat-Fenster.</div>
      <div>Es ist nur verfügbar, wenn ein·e weitere·r Spieler·in im Spiel ist.</div>
      <div><TourBlankLine/></div>
      <div>Und sogar, wenn sie offline sind.</div>
    </>,

    'Chat drawer title': <div>Chat-Fenster</div>,
    'Chat drawer description': <>
      <div>Chatte in Echtzeit!</div>
      <div><TourBlankLine/></div>
      <div>
        Wie in einem sozialen Netzwerk, außer dass die andere Person keine Benachrichtigungen erhält.
        Wenn sie offline ist, wird sie ihre Nachrichten bei der nächsten Anmeldung sehen.
      </div>
    </>,

    'Chat messages title': <div>Nachrichten</div>,
    'Chat messages description': <>
      <div>Die Nachrichten erscheinen hier.</div>
      <div>Der Name der Person erscheint vor der Nachricht.</div>
    </>,

    'Chat input title': <div>Nachrichteneingabe</div>,
    'Chat input description': <>
      <div>Hier eingeben.</div>
      <div><TourBlankLine/></div>
      <div>Wenn die andere Person online ist und ihr Chat-Fenster geschlossen hat, wird es automatisch geöffnet.</div>
    </>,

    'Game over title': <div>Spiel vorbei</div>,
    'Game over description': <>
      <div>Sie können ein neues Spiel mit demselben Spieler·in starten.</div>
      <div><TourBlankLine/></div>
      <div>Das Gitter wird die gleiche Größe haben.</div>
    </>,
  },
  IT: {
    'Tour Dialog title': `Benvenuto in Dots and Boxes!`,
    'Tour Dialog P1': <>
      <p>
        Questo gioco è stato descritto da <Anchor href={wikilinks['IT']}><Bold>Édouard Lucas</Bold></Anchor>, un rinomato matematico francese, nel suo libro <Quot/><Italic>Jeux scientifiques pour servir à l<Apos/>histoire</Italic><Quot/> (Giochi Scientifici per Servire la Storia). È deceduto due anni dopo, il 3 ottobre 1991, all<Apos/>età di 49 anni.
      </p>
      <Hr/>
    </>,
    'Tour Dialog P2': <p>
      Fai il tour guidato per scoprire l<Apos/>interfaccia utente di questa versione web, così come le regole del gioco.
    </p>,
    'Start interface tour': 'Inizia il tour',

    'Intro 1 title': <div>Fai attenzione alla freccia <b><RedText>rossa</RedText></b>.</div>,
    'Intro 1 description': <>
      <div>In questo caso, si riferisce al numero di giocatori potenziali attualmente sul sito.</div>
      <div><TourBlankLine/></div>
      <div>Questo numero ti include.</div>
    </>,

    'Intro 2 title': <div>Sviluppo futuro...</div>,
    'Intro 2 description': <>
      <div>Potrai chiedere di giocare con loro.</div>
      <div><TourBlankLine/></div>
      <div>Ma per ora, devi invitare direttamente uno dei tuoi amici.</div>
    </>,

    'Intro 3 title': <div>Iniziamo!</div>,
    'Intro 3 description': <>
      <div>Devono esserci due giocatori.</div>
      <div>Giocatore 1 crea il gioco.</div>
    </>,

    'Player 1 name title': <div>Nome del Giocatore 1</div>,
    'Player 1 name description': <>
      <div>Il suo nome è a sinistra.</div>
      <div>Se crei il gioco, il tuo nome sarà lì.</div>
    </>,

    'Player 1 score title': <div>Punteggio del Giocatore 1</div>,
    'Player 1 score description': <div>Per ogni scatola che il Giocatore 1 chiude, un punto viene assegnato a lui/lei.</div>,

    'Player 2 name title': <div>Nome del Giocatore 2</div>,
    'Player 2 name description': <div>Se ti unisci a un gioco, il tuo nome sarà a sinistra.</div>,

    'Player 2 score title': <div>Punteggio del Giocatore 2</div>,
    'Player 2 score description': <div>Per ogni scatola che il Giocatore 2 chiude, un punto viene assegnato a lui/lei.</div>,

    'Play grid title': <div>Griglia di gioco</div>,
    'Play grid description': <>
      <div>La griglia è composta da scatole.</div>
      <div><TourBlankLine/></div>
      <div>In questo caso, si tratta di una griglia di <Bold>2</Bold> x <Bold>2</Bold>.</div>
      <div>Può avere dimensioni diverse.</div>
      <div>Ad esempio: <Bold>6</Bold> x <Bold>8</Bold></div>
    </>,

    'Controls drawer button title': <div>Controlli</div>,
    'Controls drawer button description': <div>Questo pulsante apre un pannello di controllo.</div>,

    'Create game title': <div>Crea</div>,
    'Create game description': <div>Questo pulsante apre il modulo di creazione del gioco.</div>,

    'Create name input title': <div>Il tuo nome</div>,
    'Create name input description': <div>Diciamo che il tuo nome è Bertha...</div>,

    'Create game grid title': <div>Regola le dimensioni</div>,
    'Create game grid description': <>
      <div>Usa i cursori. La griglia si adatterà e ti darà un<Apos/>idea visiva del risultato.</div>
      <div><TourBlankLine/></div>
      <div>Nota che su un dispositivo mobile, una larghezza maggiore di <Bold>6</Bold> costringe l<Apos/>utente a utilizzare uno <Quot/>Zoom a pizzico<Quot/> per vedere l<Apos/>intera griglia.</div>
    </>,

    'Join game title': <div>Unisciti</div>,
    'Join game description': <div>Questo pulsante apre il modulo per unirsi a un gioco.</div>,

    'Join game input title': <div>Nome del tuo amico</div>,
    'Join game input description': <div>Supponiamo che il tuo nome sia Horacio...</div>,

    'Join game pin title': <div>Numero di gioco</div>,
    'Join game pin description': <div>Il tuo amico deve inserire il numero che gli hai dato.</div>,

    'Leave/Delete game title': <div>Abbandona / Elimina</div>,
    'Leave/Delete game description': <>
      <div>Questo pulsante consente di abbandonare un gioco.</div>
      <div><TourBlankLine/></div>
      <div>Se c<Apos/>è solo un giocatore, il gioco verrà eliminato.</div>
    </>,

    'More title': <div>Di più</div>,
    'More description': <div>Questo pulsante rivela ulteriori opzioni.</div>,

    'Less title': <div>Meno</div>,
    'Less description': <div>Questo pulsante torna alle opzioni iniziali.</div>,

    'Tour title': <div>Tour guidato</div>,
    'Tour description': <div>Sai cosa fa questo pulsante!</div>,

    'Language title': <div>Lingue</div>,
    'Language description': <div>Per scegliere un<Apos/>altra traduzione.</div>,

    'Chat title': <div>Pulsante di chat</div>,
    'Chat description': <>
      <div>Questo pulsante apre il pannello di chat.</div>
      <div>È disponibile solo quando c<Apos/>è un altro giocatore nel gioco.</div>
      <div><TourBlankLine/></div>
      <div>Anche se sono offline.</div>
    </>,

    'Chat drawer title': <div>Pannello di chat</div>,
    'Chat drawer description': <>
      <div>Chatta in tempo reale!</div>
      <div><TourBlankLine/></div>
      <div>
        Come su un social network, tranne che l<Apos/>altra persona non riceverà notifiche.
        Se è offline, vedrà i suoi messaggi al suo prossimo accesso.
      </div>
    </>,

    'Chat messages title': <div>Messaggi</div>,
    'Chat messages description': <>
      <div>I messaggi appaiono qui.</div>
      <div>Il nome della persona appare davanti al messaggio.</div>
    </>,

    'Chat input title': <div>Inserimento Messaggio</div>,
    'Chat input description': <>
      <div>Scrivi qui.</div>
      <div><TourBlankLine/></div>
      <div>Se l<Apos/>altra persona è online e ha chiuso il suo pannello di chat, si aprirà automaticamente.</div>
    </>,

    'Game over title': <div>Gioco Finito</div>,
    'Game over description': <>
      <div>Puoi avviare un nuovo gioco con lo stesso giocatore.</div>
      <div><TourBlankLine/></div>
      <div>La griglia avrà le stesse dimensioni.</div>
    </>,
  },
  NL: {
    'Tour Dialog title': `Welkom bij Dots and Boxes!`,
    'Tour Dialog P1': <>
      <p>
        Dit spel werd beschreven door <Anchor href={wikilinks['NL']}><Bold>Édouard Lucas</Bold></Anchor>, een gerenommeerde Franse wiskundige, in zijn boek <Quot/><Italic>Jeux scientifiques pour servir à l<Apos/>histoire</Italic><Quot/> (Wetenschappelijke Spellen ter Dienst van de Geschiedenis). Hij overleed twee jaar later, op 3 oktober 1991, op 49-jarige leeftijd.
      </p>
      <Hr/>
    </>,
    'Tour Dialog P2': <p>
      Maak de rondleiding om de gebruikersinterface van deze webversie en de spelregels te ontdekken.
    </p>,
    'Start interface tour': 'Begin de tour',

    'Intro 1 title': <div>Let op de <b><RedText>rode</RedText></b> pijl.</div>,
    'Intro 1 description': <>
      <div>In dit geval verwijst het naar het aantal potentiële spelers dat momenteel op de site is.</div>
      <div><TourBlankLine/></div>
      <div>Dit aantal omvat jou.</div>
    </>,

    'Intro 2 title': <div>Toekomstige Ontwikkelingen...</div>,
    'Intro 2 description': <>
      <div>Je kunt verzoeken om met hen te spelen.</div>
      <div><TourBlankLine/></div>
      <div>Maar voor nu moet je een van je vrienden rechtstreeks uitnodigen.</div>
    </>,

    'Intro 3 title': <div>Laten we beginnen!</div>,
    'Intro 3 description': <>
      <div>Er moeten twee spelers zijn.</div>
      <div>Speler 1 maakt het spel aan.</div>
    </>,

    'Player 1 name title': <div>Naam van Speler 1</div>,
    'Player 1 name description': <>
      <div>Hun naam staat aan de linkerkant.</div>
      <div>Als je het spel maakt, staat jouw naam daar.</div>
    </>,

    'Player 1 score title': <div>Score van Speler 1</div>,
    'Player 1 score description': <div>Voor elke doos die Speler 1 sluit, krijgt hij/zij een punt.</div>,

    'Player 2 name title': <div>Naam van Speler 2</div>,
    'Player 2 name description': <div>Als je bij een spel komt, staat jouw naam aan de linkerkant.</div>,

    'Player 2 score title': <div>Score van Speler 2</div>,
    'Player 2 score description': <div>Voor elke doos die Speler 2 sluit, krijgt hij/zij een punt.</div>,

    'Play grid title': <div>Speelrooster</div>,
    'Play grid description': <>
      <div>Het rooster bestaat uit dozen.</div>
      <div><TourBlankLine/></div>
      <div>In dit geval is het een rooster van <Bold>2</Bold> x <Bold>2</Bold>.</div>
      <div>Het kan verschillende dimensies hebben.</div>
      <div>Bijvoorbeeld: <Bold>6</Bold> x <Bold>8</Bold></div>
    </>,

    'Controls drawer button title': <div>Bedieningselementen</div>,
    'Controls drawer button description': <div>Deze knop opent een bedieningspaneel.</div>,

    'Create game title': <div>Aanmaken</div>,
    'Create game description': <div>Deze knop opent het formulier voor het aanmaken van een spel.</div>,

    'Create name input title': <div>Jouw naam</div>,
    'Create name input description': <div>Laten we zeggen dat je naam Bertha is...</div>,

    'Create game grid title': <div>Pas de afmetingen aan</div>,
    'Create game grid description': <>
      <div>Gebruik de schuifregelaars. Het grid past zich aan en geeft je een visuele indicatie van het resultaat.</div>
      <div><TourBlankLine/></div>
      <div>Let op dat op een mobiel apparaat een breedte van meer dan <Bold>6</Bold> de gebruiker dwingt om een <Quot/>Inzoomen met knijpen<Quot/> te gebruiken om het volledige grid te zien.</div>
    </>,

    'Join game title': <div>Deelnemen</div>,
    'Join game description': <div>Deze knop opent het formulier om je bij een spel te voegen.</div>,

    'Join game input title': <div>Naam van je vriend</div>,
    'Join game input description': <div>Laten we zeggen dat jouw naam Horacio is...</div>,

    'Join game pin title': <div>Spelnummer</div>,
    'Join game pin description': <div>Je vriend moet het nummer invoeren dat je hem hebt gegeven.</div>,

    'Leave/Delete game title': <div>Verlaten / Verwijderen</div>,
    'Leave/Delete game description': <>
      <div>Deze knop stelt je in staat om een spel te verlaten.</div>
      <div><TourBlankLine/></div>
      <div>Als er maar één speler is, wordt het spel verwijderd.</div>
    </>,

    'More title': <div>Meer</div>,
    'More description': <div>Deze knop onthult meer opties.</div>,

    'Less title': <div> minder</div>,
    'Less description': <div>Deze knop gaat terug naar de oorspronkelijke opties.</div>,

    'Tour title': <div>Rondleiding</div>,
    'Tour description': <div>Je weet wat deze knop doet!</div>,

    'Language title': <div>Talen</div>,
    'Language description': <div>Om een andere vertaling te kiezen.</div>,

    'Chat title': <div>Chatknop</div>,
    'Chat description': <>
      <div>Deze knop opent het chatpaneel.</div>
      <div>Het is alleen beschikbaar wanneer er een andere speler in het spel is.</div>
      <div><TourBlankLine/></div>
      <div>En zelfs als ze offline zijn.</div>
    </>,

    'Chat drawer title': <div>Chatpaneel</div>,
    'Chat drawer description': <>
      <div>Chat in realtime!</div>
      <div><TourBlankLine/></div>
      <div>
        Zoals op een sociaal netwerk, behalve dat de andere persoon geen meldingen zal ontvangen.
        Als ze offline zijn, zien ze hun berichten bij hun volgende aanmelding.
      </div>
    </>,

    'Chat messages title': <div>Berichten</div>,
    'Chat messages description': <>
      <div>De berichten verschijnen hier.</div>
      <div>De naam van de persoon verschijnt voor het bericht.</div>
    </>,

    'Chat input title': <div>Berichtinvoer</div>,
    'Chat input description': <>
      <div>Typ hier.</div>
      <div><TourBlankLine/></div>
      <div>Als de andere persoon online is en hun chatpaneel heeft gesloten, zal het automatisch openen.</div>
    </>,

    'Game over title': <div>Spel afgelopen</div>,
    'Game over description': <>
      <div>Je kunt een nieuw spel starten met dezelfde speler.</div>
      <div><TourBlankLine/></div>
      <div>Het rooster zal dezelfde grootte hebben.</div>
    </>,
  },
  RU: {
    'Tour Dialog title': `Добро пожаловать в Dots and Boxes!`,
    'Tour Dialog P1': <>
      <p>
        Эта игра была описана <Anchor href={wikilinks['RU']}><Bold>Эдуаром Люкасом</Bold></Anchor>, известным французским математиком, в его книге <Quot/><Italic>Jeux scientifiques pour servir à l<Apos/>histoire</Italic><Quot/> (Научные игры для истории). Он скончался два года спустя, 3 октября 1991 года, в возрасте 49 лет.
      </p>
      <Hr/>
    </>,
    'Tour Dialog P2': <p>
      Пройдите экскурсию, чтобы узнать о пользовательском интерфейсе этой веб-версии, а также о правилах игры.
    </p>,
    'Start interface tour': 'Начать экскурсию',

    'Intro 1 title': <div>Обратите внимание на <b><RedText>красную</RedText></b> стрелку.</div>,
    'Intro 1 description': <>
      <div>В данном случае это количество потенциальных игроков, которые сейчас находятся на сайте.</div>
      <div><TourBlankLine/></div>
      <div>Эта цифра включает вас.</div>
    </>,

    'Intro 2 title': <div>Будущее развитие...</div>,
    'Intro 2 description': <>
      <div>Вы сможете запросить игру с ними.</div>
      <div><TourBlankLine/></div>
      <div>Но пока вам нужно напрямую пригласить одного из ваших друзей.</div>
    </>,

    'Intro 3 title': <div>Начнем!</div>,
    'Intro 3 description': <>
      <div>Должно быть два игрока.</div>
      <div>Игрок 1 создает игру.</div>
    </>,

    'Player 1 name title': <div>Имя Игрока 1</div>,
    'Player 1 name description': <>
      <div>Его имя будет слева.</div>
      <div>Если вы создаете игру, ваше имя будет там.</div>
    </>,

    'Player 1 score title': <div>Очки Игрока 1</div>,
    'Player 1 score description': <div>За каждую коробку, которую закрывает Игрок 1, ему начисляется один балл.</div>,

    'Player 2 name title': <div>Имя Игрока 2</div>,
    'Player 2 name description': <div>Если вы присоединяетесь к игре, ваше имя будет слева.</div>,

    'Player 2 score title': <div>Очки Игрока 2</div>,
    'Player 2 score description': <div>За каждую коробку, которую закрывает Игрок 2, ему начисляется один балл.</div>,

    'Play grid title': <div>Игровая сетка</div>,
    'Play grid description': <>
      <div>Сетка состоит из коробок.</div>
      <div><TourBlankLine/></div>
      <div>В данном случае это сетка <Bold>2</Bold> x <Bold>2</Bold>.</div>
      <div>Она может иметь разные размеры.</div>
      <div>Например: <Bold>6</Bold> x <Bold>8</Bold></div>
    </>,

    'Controls drawer button title': <div>Управление</div>,
    'Controls drawer button description': <div>Эта кнопка открывает панель управления.</div>,

    'Create game title': <div>Создать</div>,
    'Create game description': <div>Эта кнопка открывает форму для создания игры.</div>,

    'Create name input title': <div>Ваше имя</div>,
    'Create name input description': <div>Допустим, ваше имя Бертха...</div>,

    'Create game grid title': <div>Настройте размеры</div>,
    'Create game grid description': <>
      <div>Используйте ползунки. Сетка будет адаптироваться и визуально покажет результат.</div>
      <div><TourBlankLine/></div>
      <div>Обратите внимание, что на мобильном устройстве ширина более <Bold>6</Bold> заставляет пользователя использовать <Quot/>Увеличение с помощью щипка<Quot/>, чтобы увидеть всю сетку.</div>
    </>,

    'Join game title': <div>Присоединиться</div>,
    'Join game description': <div>Эта кнопка открывает форму для присоединения к игре.</div>,

    'Join game input title': <div>Имя вашего друга</div>,
    'Join game input description': <div>Предположим, что ваше имя — Хорацио...</div>,

    'Join game pin title': <div>Номер игры</div>,
    'Join game pin description': <div>Ваш друг должен ввести номер, который вы ему дали.</div>,

    'Leave/Delete game title': <div>Покинуть / Удалить</div>,
    'Leave/Delete game description': <>
      <div>Эта кнопка позволяет покинуть игру.</div>
      <div><TourBlankLine/></div>
      <div>Если остался только один игрок, игра будет удалена.</div>
    </>,

    'More title': <div>Еще</div>,
    'More description': <div>Эта кнопка раскрывает дополнительные опции.</div>,

    'Less title': <div>Меньше</div>,
    'Less description': <div>Эта кнопка возвращает к первоначальным опциям.</div>,

    'Tour title': <div>Экскурсия</div>,
    'Tour description': <div>Вы знаете, что делает эта кнопка!</div>,

    'Language title': <div>Языки</div>,
    'Language description': <div>Чтобы выбрать другой перевод.</div>,

    'Chat title': <div>Кнопка чата</div>,
    'Chat description': <>
      <div>Эта кнопка открывает панель чата.</div>
      <div>Она доступна только тогда, когда в игре есть другой игрок.</div>
      <div><TourBlankLine/></div>
      <div>И даже если они оффлайн.</div>
    </>,

    'Chat drawer title': <div>Чат-панель</div>,
    'Chat drawer description': <>
      <div>Общайтесь в реальном времени!</div>
      <div><TourBlankLine/></div>
      <div>
        Как в социальной сети, за исключением того, что другой человек не получит уведомлений.
        Если он оффлайн, он увидит свои сообщения при следующем входе.
      </div>
    </>,

    'Chat messages title': <div>Сообщения</div>,
    'Chat messages description': <>
      <div>Сообщения появляются здесь.</div>
      <div>Имя человека отображается перед сообщением.</div>
    </>,

    'Chat input title': <div>Ввод сообщения</div>,
    'Chat input description': <>
      <div>Пишите здесь.</div>
      <div><TourBlankLine/></div>
      <div>Если другой человек в сети и закрыл свою панель чата, она откроется автоматически.</div>
    </>,

    'Game over title': <div>Игра окончена</div>,
    'Game over description': <>
      <div>Вы можете начать новую игру с тем же игроком.</div>
      <div><TourBlankLine/></div>
      <div>Сетка будет такого же размера.</div>
    </>,
  },
  ZH: {
    'Tour Dialog title': `欢迎来到 Dots and Boxes!`,
    'Tour Dialog P1': <>
      <p>
        该游戏由 <Anchor href={wikilinks['ZH']}><Bold>埃杜阿尔·卢卡斯</Bold></Anchor>，一位著名的法国数学家，在他的书中进行了描述 <Quot/><Italic>Jeux scientifiques pour servir à l<Apos/>histoire</Italic><Quot/> (科学游戏服务于历史)。他于1991年10月3日去世，享年49岁。
      </p>
      <Hr/>
    </>,
    'Tour Dialog P2': <p>
      参加导览以发现此网页版本的用户界面及游戏规则。
    </p>,
    'Start interface tour': '开始导览',

    'Intro 1 title': <div>请注意 <b><RedText>红色</RedText></b> 箭头。</div>,
    'Intro 1 description': <>
      <div>在这种情况下，它指的是当前在网站上的潜在玩家人数。</div>
      <div><TourBlankLine/></div>
      <div>此数字包括您。</div>
    </>,

    'Intro 2 title': <div>未来发展...</div>,
    'Intro 2 description': <>
      <div>您将能够请求与他们一起游戏。</div>
      <div><TourBlankLine/></div>
      <div>但目前，您需要直接邀请您的朋友。</div>
    </>,

    'Intro 3 title': <div>让我们开始吧!</div>,
    'Intro 3 description': <>
      <div>必须有两个玩家。</div>
      <div>玩家 1 创建游戏。</div>
    </>,

    'Player 1 name title': <div>玩家 1 的名字</div>,
    'Player 1 name description': <>
      <div>他们的名字在左侧。</div>
      <div>如果您创建游戏，您的名字将显示在这里。</div>
    </>,

    'Player 1 score title': <div>玩家 1 的分数</div>,
    'Player 1 score description': <div>每当玩家 1 关闭一个箱子时，便会获得一个积分。</div>,

    'Player 2 name title': <div>玩家 2 的名字</div>,
    'Player 2 name description': <div>如果您加入游戏，您的名字将显示在左侧。</div>,

    'Player 2 score title': <div>玩家 2 的分数</div>,
    'Player 2 score description': <div>每当玩家 2 关闭一个箱子时，便会获得一个积分。</div>,

    'Play grid title': <div>游戏网格</div>,
    'Play grid description': <>
      <div>网格由箱子组成。</div>
      <div><TourBlankLine/></div>
      <div>在这种情况下，这是一个 <Bold>2</Bold> x <Bold>2</Bold> 的网格。</div>
      <div>它可以有不同的尺寸。</div>
      <div>例如: <Bold>6</Bold> x <Bold>8</Bold></div>
    </>,

    'Controls drawer button title': <div>控制</div>,
    'Controls drawer button description': <div>此按钮打开控制面板。</div>,

    'Create game title': <div>创建</div>,
    'Create game description': <div>此按钮打开创建游戏的表单。</div>,

    'Create name input title': <div>你的名字</div>,
    'Create name input description': <div>假设你的名字是伯莎...</div>,

    'Create game grid title': <div>调整尺寸</div>,
    'Create game grid description': <>
      <div>使用滑块。网格将适应并为您提供视觉结果的想法。</div>
      <div><TourBlankLine/></div>
      <div>请注意，在移动设备上，超过 <Bold>6</Bold> 的宽度会强迫用户使用 <Quot/>捏合缩放<Quot/> 查看整个网格。</div>
    </>,

    'Join game title': <div>加入</div>,
    'Join game description': <div>此按钮打开加入游戏的表单。</div>,

    'Join game input title': <div>您朋友的名字</div>,
    'Join game input description': <div>假设您的名字是霍拉西奥...</div>,

    'Join game pin title': <div>游戏编号</div>,
    'Join game pin description': <div>您的朋友必须输入您给他们的编号。</div>,

    'Leave/Delete game title': <div>离开 / 删除</div>,
    'Leave/Delete game description': <>
      <div>此按钮允许您离开游戏。</div>
      <div><TourBlankLine/></div>
      <div>如果只有一个玩家，游戏将被删除。</div>
    </>,

    'More title': <div>更多</div>,
    'More description': <div>此按钮显示更多选项。</div>,

    'Less title': <div>更少</div>,
    'Less description': <div>此按钮返回到初始选项。</div>,

    'Tour title': <div>导览</div>,
    'Tour description': <div>您知道这个按钮的作用！</div>,

    'Language title': <div>语言</div>,
    'Language description': <div>选择另一种翻译。</div>,

    'Chat title': <div>聊天按钮</div>,
    'Chat description': <>
      <div>此按钮打开聊天面板。</div>
      <div>仅在游戏中有其他玩家时可用。</div>
      <div><TourBlankLine/></div>
      <div>即使他们处于离线状态。</div>
    </>,

    'Chat drawer title': <div>聊天面板</div>,
    'Chat drawer description': <>
      <div>实时聊天!</div>
      <div><TourBlankLine/></div>
      <div>
        像社交网络一样，除了另一方不会收到通知。
        如果他们离线，他们将在下次登录时看到他们的消息。
      </div>
    </>,

    'Chat messages title': <div>消息</div>,
    'Chat messages description': <>
      <div>消息在此处出现。</div>
      <div>发送该消息的人的名字出现在消息前面。</div>
    </>,

    'Chat input title': <div>消息输入</div>,
    'Chat input description': <>
      <div>在这里输入。</div>
      <div><TourBlankLine/></div>
      <div>如果另一方在线并关闭了聊天面板，它将自动打开。</div>
    </>,

    'Game over title': <div>游戏结束</div>,
    'Game over description': <>
      <div>您可以与同一玩家开始新的游戏。</div>
      <div><TourBlankLine/></div>
      <div>网格将保持相同的大小。</div>
    </>,
  },
  JA: {
    'Tour Dialog title': `Dots and Boxesへようこそ！`,
    'Tour Dialog P1': <>
      <p>
        このゲームは、著名なフランスの数学者<Anchor href={wikilinks['JA']}><Bold>エドゥアール・リュカス</Bold></Anchor>によって、彼の著書<Quot/><Italic>Jeux scientifiques pour servir à l<Apos/>histoire</Italic><Quot/> (歴史に役立つ科学ゲーム)に記述されました。彼は1991年10月3日に49歳で亡くなりました。
      </p>
      <Hr/>
    </>,
    'Tour Dialog P2': <p>
      ツアーに参加して、このウェブ版のユーザーインターフェースとゲームのルールを発見してください。
    </p>,
    'Start interface tour': 'ツアーを開始',

    'Intro 1 title': <div><b><RedText>赤</RedText></b>の矢印に注意してください。</div>,
    'Intro 1 description': <>
      <div>この場合、現在サイトにいる潜在的なプレイヤーの数を指します。</div>
      <div><TourBlankLine/></div>
      <div>この数字にはあなたが含まれます。</div>
    </>,

    'Intro 2 title': <div>将来の展開...</div>,
    'Intro 2 description': <>
      <div>彼らと遊ぶためにリクエストを送ることができます。</div>
      <div><TourBlankLine/></div>
      <div>しかし今のところ、あなたは友達の1人を直接招待する必要があります。</div>
    </>,

    'Intro 3 title': <div>始めましょう!</div>,
    'Intro 3 description': <>
      <div>2人のプレイヤーが必要です。</div>
      <div>プレイヤー1がゲームを作成します。</div>
    </>,

    'Player 1 name title': <div>プレイヤー1の名前</div>,
    'Player 1 name description': <>
      <div>彼/彼女の名前が左側に表示されます。</div>
      <div>ゲームを作成する場合、あなたの名前がそこに表示されます。</div>
    </>,

    'Player 1 score title': <div>プレイヤー1のスコア</div>,
    'Player 1 score description': <div>プレイヤー1が1つのボックスを閉じるごとに、1ポイントが与えられます。</div>,

    'Player 2 name title': <div>プレイヤー2の名前</div>,
    'Player 2 name description': <div>ゲームに参加する場合、あなたの名前が左側に表示されます。</div>,

    'Player 2 score title': <div>プレイヤー2のスコア</div>,
    'Player 2 score description': <div>プレイヤー2が1つのボックスを閉じるごとに、1ポイントが与えられます。</div>,

    'Play grid title': <div>ゲームグリッド</div>,
    'Play grid description': <>
      <div>グリッドはボックスで構成されています。</div>
      <div><TourBlankLine/></div>
      <div>この場合、<Bold>2</Bold> x <Bold>2</Bold>のグリッドです。</div>
      <div>異なるサイズにすることができます。</div>
      <div>例えば: <Bold>6</Bold> x <Bold>8</Bold></div>
    </>,

    'Controls drawer button title': <div>コントロール</div>,
    'Controls drawer button description': <div>このボタンはコントロールパネルを開きます。</div>,

    'Create game title': <div>作成する</div>,
    'Create game description': <div>このボタンはゲーム作成フォームを開きます。</div>,

    'Create name input title': <div>あなたの名前</div>,
    'Create name input description': <div>あなたの名前はバースだとしましょう...</div>,

    'Create game grid title': <div>サイズを調整する</div>,
    'Create game grid description': <>
      <div>スライダーを使用します。グリッドは調整され、視覚的な結果のアイデアを提供します。</div>
      <div><TourBlankLine/></div>
      <div>モバイルデバイスでは、幅が <Bold>6</Bold> を超えると、ユーザーは <Quot/>ピンチしてズームする<Quot/>必要があります。</div>
    </>,

    'Join game title': <div>参加する</div>,
    'Join game description': <div>このボタンはゲームに参加するためのフォームを開きます。</div>,

    'Join game input title': <div>友達の名前</div>,
    'Join game input description': <div>あなたの名前がホラシオだとしましょう...</div>,

    'Join game pin title': <div>ゲーム番号</div>,
    'Join game pin description': <div>あなたの友達は、あなたが与えた番号を入力する必要があります。</div>,

    'Leave/Delete game title': <div>離脱 / 削除</div>,
    'Leave/Delete game description': <>
      <div>このボタンを使用してゲームを離脱します。</div>
      <div><TourBlankLine/></div>
      <div>1人のプレイヤーしかいない場合、ゲームは削除されます。</div>
    </>,

    'More title': <div>もっと</div>,
    'More description': <div>このボタンはさらに多くのオプションを表示します。</div>,

    'Less title': <div>少なく</div>,
    'Less description': <div>このボタンは元のオプションに戻ります。</div>,

    'Tour title': <div>ガイドツアー</div>,
    'Tour description': <div>このボタンの機能はご存知ですね！</div>,

    'Language title': <div>言語</div>,
    'Language description': <div>別の翻訳を選択します。</div>,

    'Chat title': <div>チャットボタン</div>,
    'Chat description': <>
      <div>このボタンはチャットパネルを開きます。</div>
      <div>ゲームに他のプレイヤーがいるときだけ利用可能です。</div>
      <div><TourBlankLine/></div>
      <div>たとえ彼らがオフラインでも。</div>
    </>,

    'Chat drawer title': <div>チャットパネル</div>,
    'Chat drawer description': <>
      <div>リアルタイムでチャットしましょう！</div>
      <div><TourBlankLine/></div>
      <div>
        ソーシャルネットワークのように、ただしもう一方は通知を受け取りません。
        彼らがオフラインの場合、次回ログインしたときにメッセージを確認します。
      </div>
    </>,

    'Chat messages title': <div>メッセージ</div>,
    'Chat messages description': <>
      <div>メッセージはここに表示されます。</div>
      <div>メッセージを送信した人の名前が前に表示されます。</div>
    </>,

    'Chat input title': <div>メッセージ入力</div>,
    'Chat input description': <>
      <div>ここに入力してください。</div>
      <div><TourBlankLine/></div>
      <div>相手がオンラインで、チャットパネルを閉じた場合、自動的に開きます。</div>
    </>,

    'Game over title': <div>ゲーム終了</div>,
    'Game over description': <>
      <div>同じプレイヤーと新しいゲームを開始できます。</div>
      <div><TourBlankLine/></div>
      <div>グリッドは同じサイズになります。</div>
    </>,

  },
  KO: {
    'Tour Dialog title': `Dots and Boxes에 오신 것을 환영합니다!`,
    'Tour Dialog P1': <>
      <p>
        이 게임은 프랑스의 유명한 수학자 <Anchor href={wikilinks['KO']}><Bold>에두아르 루카스</Bold></Anchor>가 그의 저서 <Quot/><Italic>Jeux scientifiques pour servir à l<Apos/>histoire</Italic><Quot/> (역사에 도움이 되는 과학 게임)에서 설명했습니다. 그는 1991년 10월 3일 49세의 나이로 세상을 떠났습니다.
      </p>
      <Hr/>
    </>,
    'Tour Dialog P2': <p>
      안내 투어에 참여하여 이 웹 버전의 사용자 인터페이스와 게임 규칙을 알아보세요.
    </p>,
    'Start interface tour': '투어 시작',

    'Intro 1 title': <div>빨간색 <b><RedText>화살표</RedText></b>에 주의하세요.</div>,
    'Intro 1 description': <>
      <div>이 경우, 현재 사이트에 있는 잠재적 플레이어 수를 나타냅니다.</div>
      <div><TourBlankLine/></div>
      <div>이 숫자에는 귀하가 포함됩니다.</div>
    </>,

    'Intro 2 title': <div>미래 개발...</div>,
    'Intro 2 description': <>
      <div>그들과 함께 플레이하라고 요청할 수 있습니다.</div>
      <div><TourBlankLine/></div>
      <div>하지만 지금은 친구 중 한 명을 직접 초대해야 합니다.</div>
    </>,

    'Intro 3 title': <div>시작해봅시다!</div>,
    'Intro 3 description': <>
      <div>두 명의 플레이어가 필요합니다.</div>
      <div>플레이어 1이 게임을 만듭니다.</div>
    </>,

    'Player 1 name title': <div>플레이어 1 이름</div>,
    'Player 1 name description': <>
      <div>그들의 이름은 왼쪽에 있습니다.</div>
      <div>게임을 만들 경우, 당신의 이름이 여기에 표시됩니다.</div>
    </>,

    'Player 1 score title': <div>플레이어 1 점수</div>,
    'Player 1 score description': <div>플레이어 1이 상자를 닫을 때마다 1점이 부여됩니다.</div>,

    'Player 2 name title': <div>플레이어 2 이름</div>,
    'Player 2 name description': <div>게임에 참여하면 당신의 이름이 왼쪽에 표시됩니다.</div>,

    'Player 2 score title': <div>플레이어 2 점수</div>,
    'Player 2 score description': <div>플레이어 2가 상자를 닫을 때마다 1점이 부여됩니다.</div>,

    'Play grid title': <div>게임 그리드</div>,
    'Play grid description': <>
      <div>그리드는 상자로 구성되어 있습니다.</div>
      <div><TourBlankLine/></div>
      <div>이 경우, <Bold>2</Bold> x <Bold>2</Bold> 크기의 그리드입니다.</div>
      <div>다양한 크기를 가질 수 있습니다.</div>
      <div>예: <Bold>6</Bold> x <Bold>8</Bold></div>
    </>,

    'Controls drawer button title': <div>제어</div>,
    'Controls drawer button description': <div>이 버튼은 제어 패널을 엽니다.</div>,

    'Create game title': <div>생성</div>,
    'Create game description': <div>이 버튼은 게임 생성 양식을 엽니다.</div>,

    'Create name input title': <div>당신의 이름</div>,
    'Create name input description': <div>당신의 이름이 베르타라고 가정해 봅시다...</div>,

    'Create game grid title': <div>크기 조정</div>,
    'Create game grid description': <>
      <div>슬라이더를 사용하세요. 그리드는 조정되며 결과에 대한 시각적 아이디어를 제공합니다.</div>
      <div><TourBlankLine/></div>
      <div>모바일 장치에서는 너비가 <Bold>6</Bold>을 초과하면 사용자가 <Quot/>손가락으로 확대<Quot/>하여 전체 그리드를 보아야 합니다.</div>
    </>,

    'Join game title': <div>게임 참여</div>,
    'Join game description': <div>이 버튼은 게임에 참여하기 위한 양식을 엽니다.</div>,

    'Join game input title': <div>친구의 이름</div>,
    'Join game input description': <div>당신의 이름이 호라시오라고 가정해 봅시다...</div>,

    'Join game pin title': <div>게임 번호</div>,
    'Join game pin description': <div>당신의 친구는 당신이 준 번호를 입력해야 합니다.</div>,

    'Leave/Delete game title': <div>나가기 / 삭제</div>,
    'Leave/Delete game description': <>
      <div>이 버튼은 게임을 나갈 수 있게 해줍니다.</div>
      <div><TourBlankLine/></div>
      <div>오직 한 명의 플레이어만 남았다면 게임은 삭제됩니다.</div>
    </>,

    'More title': <div>더보기</div>,
    'More description': <div>이 버튼은 더 많은 옵션을 표시합니다.</div>,

    'Less title': <div>덜 보기</div>,
    'Less description': <div>이 버튼은 초기 옵션으로 돌아갑니다.</div>,

    'Tour title': <div>가이드 투어</div>,
    'Tour description': <div>이 버튼이 하는 일을 잘 알고 계시죠!</div>,

    'Language title': <div>언어</div>,
    'Language description': <div>다른 번역을 선택합니다.</div>,

    'Chat title': <div>채팅 버튼</div>,
    'Chat description': <>
      <div>이 버튼은 채팅 패널을 엽니다.</div>
      <div>게임에 다른 플레이어가 있을 때만 사용할 수 있습니다.</div>
      <div><TourBlankLine/></div>
      <div>심지어 그들이 오프라인일 때도 가능합니다.</div>
    </>,

    'Chat drawer title': <div>채팅 패널</div>,
    'Chat drawer description': <>
      <div>실시간으로 채팅하세요!</div>
      <div><TourBlankLine/></div>
      <div>
        소셜 네트워크처럼, 단지 다른 사람은 알림을 받지 않습니다.
        그들이 오프라인일 경우, 다음 로그인 시 메시지를 볼 수 있습니다.
      </div>
    </>,

    'Chat messages title': <div>메시지</div>,
    'Chat messages description': <>
      <div>여기에 메시지가 표시됩니다.</div>
      <div>메시지를 보낸 사람의 이름이 메시지 앞에 표시됩니다.</div>
    </>,

    'Chat input title': <div>메시지 입력</div>,
    'Chat input description': <>
      <div>여기에 입력하세요.</div>
      <div><TourBlankLine/></div>
      <div>상대방이 온라인이고 채팅 패널을 닫았다면 자동으로 열립니다.</div>
    </>,

    'Game over title': <div>게임 종료</div>,
    'Game over description': <>
      <div>같은 플레이어와 함께 새로운 게임을 시작할 수 있습니다.</div>
      <div><TourBlankLine/></div>
      <div>그리드는 같은 크기를 유지합니다.</div>
    </>,
  },
  PT: {
    'Tour Dialog title': `Bem-vindo ao Dots and Boxes!`,
    'Tour Dialog P1': <>
      <p>
        Este jogo foi descrito por <Anchor href={wikilinks['PT']}><Bold>Édouard Lucas</Bold></Anchor>, um renomado matemático francês, em seu livro <Quot/><Italic>Jeux scientifiques pour servir à l<Apos/>histoire</Italic><Quot/> (Jogos científicos para servir à história). Ele faleceu dois anos depois, em 3 de outubro de 1991, aos 49 anos.
      </p>
      <Hr/>
    </>,
    'Tour Dialog P2': <p>
      Faça o tour guiado para descobrir a interface do usuário desta versão web e as regras do jogo.
    </p>,
    'Start interface tour': 'Começar o tour',

    'Intro 1 title': <div>Preste atenção na seta <b><RedText>vermelha</RedText></b>.</div>,
    'Intro 1 description': <>
      <div>Neste caso, refere-se ao número de jogador·eas potenciais que estão atualmente no site.</div>
      <div><TourBlankLine/></div>
      <div>Esse número te inclui.</div>
    </>,

    'Intro 2 title': <div>Desenvolvimento futuro...</div>,
    'Intro 2 description': <>
      <div>Você poderá solicitar jogar com elas.</div>
      <div><TourBlankLine/></div>
      <div>Mas por enquanto, é necessário convidar um·a de seus amig·as diretamente.</div>
    </>,

    'Intro 3 title': <div>Vamos começar!</div>,
    'Intro 3 description': <>
      <div>Deve haver dois jogador·eas.</div>
      <div>Jogador·a 1 cria o jogo.</div>
    </>,

    'Player 1 name title': <div>Nome de Jogador·a 1</div>,
    'Player 1 name description': <>
      <div>Seu nome está à esquerda.</div>
      <div>Se você criar o jogo, seu nome estará lá.</div>
    </>,

    'Player 1 score title': <div>Pontuação de Jogador·a 1</div>,
    'Player 1 score description': <div>Para cada caixa que o Jogador·a 1 fecha, um ponto é atribuído.</div>,

    'Player 2 name title': <div>Nome de Jogador·a 2</div>,
    'Player 2 name description': <div>Se você entrar em um jogo, seu nome estará à esquerda.</div>,

    'Player 2 score title': <div>Pontuação de Jogador·a 2</div>,
    'Player 2 score description': <div>Para cada caixa que o Jogador·a 2 fecha, um ponto é atribuído.</div>,

    'Play grid title': <div>Grade de jogo</div>,
    'Play grid description': <>
      <div>A grade é composta por caixas.</div>
      <div><TourBlankLine/></div>
      <div>Aqui, é uma grade de <Bold>2</Bold> x <Bold>2</Bold>.</div>
      <div>Pode ter dimensões diferentes.</div>
      <div>Por exemplo: <Bold>6</Bold> x <Bold>8</Bold></div>
    </>,

    'Controls drawer button title': <div>Controles</div>,
    'Controls drawer button description': <div>Este botão abre um painel de controle.</div>,

    'Create game title': <div>Criar</div>,
    'Create game description': <div>Este botão abre o formulário de criação de jogo.</div>,

    'Create name input title': <div>Seu nome</div>,
    'Create name input description': <div>Suponhamos que seu nome seja Bertha...</div>,

    'Create game grid title': <div>Ajuste as dimensões</div>,
    'Create game grid description': <>
      <div>Use os controles deslizantes. A grade se ajustará e fornecerá uma ideia visual do resultado.</div>
      <div><TourBlankLine/></div>
      <div>Observe que em um dispositivo móvel, uma largura superior a <Bold>6</Bold> força o usuário·a a dar um <Quot/>Zoom com pinça<Quot/> para ver toda a grade.</div>
    </>,

    'Join game title': <div>Juntar</div>,
    'Join game description': <div>Este botão abre o formulário para juntar-se a um jogo.</div>,

    'Join game input title': <div>Nome do seu amig·a</div>,
    'Join game input description': <div>Suponhamos que seu nome seja Horacio...</div>,

    'Join game pin title': <div>Número do jogo</div>,
    'Join game pin description': <div>Seu amig·a deve inserir o número que você forneceu.</div>,

    'Leave/Delete game title': <div>Sair / Excluir</div>,
    'Leave/Delete game description': <>
      <div>Este botão permite sair de um jogo.</div>
      <div><TourBlankLine/></div>
      <div>Se houver apenas um·a jogador·a, o jogo será excluído.</div>
    </>,

    'More title': <div>Mais</div>,
    'More description': <div>Este botão revela mais opções.</div>,

    'Less title': <div>Menos</div>,
    'Less description': <div>Este botão volta às opções iniciais.</div>,

    'Tour title': <div>Tour guiado</div>,
    'Tour description': <div>Você sabe o que este botão faz!</div>,

    'Language title': <div>Idiomas</div>,
    'Language description': <div>Para escolher outra tradução.</div>,

    'Chat title': <div>Botão de chat</div>,
    'Chat description': <>
      <div>Este botão abre o painel de chat.</div>
      <div>Está disponível apenas quando há outro jogador·a no jogo.</div>
      <div><TourBlankLine/></div>
      <div>E mesmo que ele esteja offline.</div>
    </>,

    'Chat drawer title': <div>Painel de chat</div>,
    'Chat drawer description': <>
      <div>Chateie em tempo real!</div>
      <div><TourBlankLine/></div>
      <div>
        Como em uma rede social, exceto que a outra pessoa não receberá notificações.
        Se ela estiver offline, verá suas mensagens em sua próxima conexão.
      </div>
    </>,

    'Chat messages title': <div>Mensagens</div>,
    'Chat messages description': <>
      <div>As mensagens aparecem aqui.</div>
      <div>O nome da pessoa aparece antes da mensagem.</div>
    </>,

    'Chat input title': <div>Entrada de mensagem</div>,
    'Chat input description': <>
      <div>Escreva aqui.</div>
      <div><TourBlankLine/></div>
      <div>Se a outra pessoa estiver online e tiver fechado o painel de chat, ele abrirá automaticamente.</div>
    </>,

    'Game over title': <div>Jogo terminado</div>,
    'Game over description': <>
      <div>Você pode iniciar um novo jogo com o·a mesmo·a jogador·a.</div>
      <div><TourBlankLine/></div>
      <div>A grade será do mesmo tamanho.</div>
    </>,
  },
  HT: {
    'Tour Dialog title': `Byenveni nan Dots and Boxes!`,
    'Tour Dialog P1': <>
      <p>
        Jwèt sa a te dekri pa <Anchor href={wikilinks['HT']}><Bold>Édouard Lucas</Bold></Anchor>, yon matematisyen franse renome, nan liv li <Quot/><Italic>Jeux scientifiques pour servir à l<Apos/>histoire</Italic><Quot/> (Jwèt syantifik pou sèvi ak istwa). Li te mouri de zan apre, le 3 oktòb 1991, a laj de 49 ane.
      </p>
      <Hr/>
    </>,
    'Tour Dialog P2': <p>
      Fè tour gid la pou dekouvri entèfas itilizatè vèsyon entènèt sa a ak règ yo nan jwèt la.
    </p>,
    'Start interface tour': 'Kòmanse tour la',

    'Intro 1 title': <div>Fè atansyon ak flèch la <b><RedText>wouj</RedText></b>.</div>,
    'Intro 1 description': <>
      <div>Nan ka sa a, sa refere a kantite joueur·eas potansyèl ki sou sit la kounye a.</div>
      <div><TourBlankLine/></div>
      <div>Nouvo kantite a enkli ou.</div>
    </>,

    'Intro 2 title': <div>Devlopman nan lavni...</div>,
    'Intro 2 description': <>
      <div>Ou ka mande pou jwe ak yo.</div>
      <div><TourBlankLine/></div>
      <div>Men, pou kounye a, ou dwe envite yon·e nan zanmi ou dirèkteman.</div>
    </>,

    'Intro 3 title': <div>Ann kòmanse!</div>,
    'Intro 3 description': <>
      <div>Gen pou gen de joueur·eas.</div>
      <div>Joueur·euse 1 kreye jwèt la.</div>
    </>,

    'Player 1 name title': <div>Non Joueur·euse 1</div>,
    'Player 1 name description': <>
      <div>Non li a se sou bò gòch.</div>
      <div>Si ou kreye jwèt la, non ou ap la.</div>
    </>,

    'Player 1 score title': <div>Pwen Joueur·euse 1</div>,
    'Player 1 score description': <div>Pou chak bwat Joueur·euse 1 fèmen, yo ba li yon pwen.</div>,

    'Player 2 name title': <div>Non Joueur·euse 2</div>,
    'Player 2 name description': <div>Si ou antre nan yon jwèt, non ou ap sou bò gòch.</div>,

    'Player 2 score title': <div>Pwen Joueur·euse 2</div>,
    'Player 2 score description': <div>Pou chak bwat Joueur·euse 2 fèmen, yo ba li yon pwen.</div>,

    'Play grid title': <div>Rezo jwèt</div>,
    'Play grid description': <>
      <div>Rezo a konpoze de bwat.</div>
      <div><TourBlankLine/></div>
      <div>Lè sa a, se yon rezo de <Bold>2</Bold> x <Bold>2</Bold>.</div>
      <div>Li ka genyen dimansyon diferan.</div>
      <div>Pa egzanp: <Bold>6</Bold> x <Bold>8</Bold></div>
    </>,

    'Controls drawer button title': <div>Kontwòl</div>,
    'Controls drawer button description': <div>Button sa a ouvri yon panèl kontwòl.</div>,

    'Create game title': <div>Kreye</div>,
    'Create game description': <div>Button sa a ouvri fòmilè pou kreye jwèt.</div>,

    'Create name input title': <div>Non ou</div>,
    'Create name input description': <div>Ann di non ou se Bertha...</div>,

    'Create game grid title': <div>Ajiste dimansyon yo</div>,
    'Create game grid description': <>
      <div>Utilize koursè yo. Rezo a ap ajiste e li ap ba ou yon ide vizyèl sou rezilta a.</div>
      <div><TourBlankLine/></div>
      <div>Remake ke sou yon aparèy mobil, yon lajè plis pase <Bold>6</Bold> fòse itilizatè·a a fè yon <Quot/>Zoom ak pinse<Quot/> pou wè tout rezo a.</div>
    </>,

    'Join game title': <div>Jwen</div>,
    'Join game description': <div>Button sa a ouvri fòmilè pou jwen yon jwèt.</div>,

    'Join game input title': <div>Non zanmi ou</div>,
    'Join game input description': <div>Ann di non ou se Horacio...</div>,

    'Join game pin title': <div>Nimewo jwèt la</div>,
    'Join game pin description': <div>Zanmi ou dwe antre nimewo a ou te ba li.</div>,

    'Leave/Delete game title': <div>Sòti / Efase</div>,
    'Leave/Delete game description': <>
      <div>Button sa a pèmèt ou sòti nan yon jwèt.</div>
      <div><TourBlankLine/></div>
      <div>Si gen yon sèl·e jugador·euse, jwèt la ap efase.</div>
    </>,

    'More title': <div>Plis</div>,
    'More description': <div>Button sa a revele plis opsyon.</div>,

    'Less title': <div>Menos</div>,
    'Less description': <div>Button sa a retounen nan opsyon inisyal yo.</div>,

    'Tour title': <div>Gid vizit</div>,
    'Tour description': <div>Ou konnen sa button sa a fè!</div>,

    'Language title': <div>Lang</div>,
    'Language description': <div>Pou chwazi yon lòt tradiksyon.</div>,

    'Chat title': <div>Button chat</div>,
    'Chat description': <>
      <div>Button sa a ouvri panèl chat la.</div>
      <div>Li disponib sèlman lè gen yon lòt jugador·a nan jwèt la.</div>
      <div><TourBlankLine/></div>
      <div>Men, menm si li offline.</div>
    </>,

    'Chat drawer title': <div>Panèl chat</div>,
    'Chat drawer description': <>
      <div>Chat an tan reyèl!</div>
      <div><TourBlankLine/></div>
      <div>
        Tankou sou yon rezo sosyal, eksepte ke lòt moun nan pap resevwa notifikasyon.
        Si li offline, li ap wè mesaj li yo nan pwochen koneksyon li.
      </div>
    </>,

    'Chat messages title': <div>Mesaj</div>,
    'Chat messages description': <>
      <div>Mesaj yo aparèt isit la.</div>
      <div>Non moun nan ap parèt devan mesaj la.</div>
    </>,

    'Chat input title': <div>Antre mesaj</div>,
    'Chat input description': <>
      <div>Ekri isit la.</div>
      <div><TourBlankLine/></div>
      <div>Si lòt moun nan an liy e li fèmen panèl chat la, li ap ouvri otomatikman.</div>
    </>,

    'Game over title': <div>Jwèt fini</div>,
    'Game over description': <>
      <div>Ou ka kòmanse yon nouvo jwèt ak menm jugador·a a.</div>
      <div><TourBlankLine/></div>
      <div>Rezo a ap gen menm dimansyon.</div>
    </>,
  },
}