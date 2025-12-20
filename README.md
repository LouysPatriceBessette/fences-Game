# Dots and Boxes - version 0.2.0
This is a rainy days camping game. I started coding it on **2025-11-27**.
I used to call it *"jeux des p'tites lignes"* in French, which would translate to "little lines game"" in English.


![Valid XHTML](./public/Dots-and-Squares.jpg).


## How to play?
Here is a short [Youtube video](https://www.youtube.com/watch?v=hQdQWxQk8_A) (40 seconds) to explain the rules.

## More about this game
Obviously, I am not the inventor. In fact this is a **19th century** game.
Have a look at this [Wikipedia](https://en.wikipedia.org/wiki/Dots_and_boxes) article.


## My "work in progress" implementation
I am focusing on playing **with a human** in real time. This is a **Socket challenge** more than coding a bot.
My objective is to complete all the users management logic, since the game rules are simple and where implemented in less than 2 days.


### TODO list, as of 2025-12-18:

- [x] `n` x `n` grid layout
- [x] Socket connections between players of a specific game id.
- [x] Turns alternate respecting the "additional turn" on drawing the 4^th^ line a square.
- [x] Socket id refresh (and players registration to a game id update).
- [x] Score count
- [x] Players real time chat.
- [x] Player names
- [x] *Ping/Pong* web socket connections check to display accurate players online state.
- [x] Controls: Grid size (on game creation) with a `x` x `y` grid instead od `n` x `n`.
- [x] Controls: Leave, re-join and destroy.
- [x] Auto generate .env file
- [x] Use Chakra components
- [x] Overall debugging
- [x] Deploy version 0.1.0 on VPS
- [x] Title and favicon
- [x] SSL cert on the sub-domain
- [x] Deploy version 0.1.1 on VPS
- [x] Improved "box has 4 sides" dispatch (better render, data retention on server)
- [x] Deploy version 0.1.2 on VPS
- [x] Translations (11 languages)
- [x] Changed the Ping/Pong strategy (only server emits ping, clients emit pong)
- [x] Controls: on game over, start a new game with same opponent.
- [x] Deploy version 0.1.3 on VPS (via GitHub Actions)
- [x] FAILED attempt to use NextStep.js to create a guided tour... and removed it. Almost two days lost.
- [x] Added a nice animated 'Loading' icon.
- [x] Added Italiano, making the game trnaslated in 12 languages.
- [x] A sympathetic guided tour on first visit (for the controls, rule games...) instead of plain text instructions.
- [x] Track version in the app to clear localStorage.
- [x] Deploy version 0.2.0 on VPS (via GitHub Actions)
- [ ] Display "opened to anyone" games to join (without having a game number)
- [ ] Share a game using a link or a QR code.


### Instructions to run

First (and unusual!!), have the `create-env` executable.
The reason is there is Node server "wrapping" Next, to handle Socket.io

```bash
chmod 775 ./create-env.sh
```

Then to run the development server:

```bash
npm install
npm run dev
```

Or the production server:
```bash
npm install
npm run build
npm start
```

Open [http://localhost:3001](http://localhost:3001) with your browser.
