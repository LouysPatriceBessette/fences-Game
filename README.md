# Dots and Boxes
This is a rainy days camping game. I started coding it on **2025-11-27**.

I used to call it *"jeux des p'tites lignes"* in French, which would translate to "little lines game"" in English.


![Valid XHTML](./public/Dots-and-Squares.jpg).
## How to play?

Here is a short [Youtube video](https://www.youtube.com/watch?v=hQdQWxQk8_A) (40 seconds) to explain the rules.

## More about this game
Obviouly, I am not the inventor. In fact this is a **19th century** game.

Have a look at this [Wikipedia](https://en.wikipedia.org/wiki/Dots_and_boxes) article.


## My "work in progress" implementation
I am focussing on playing **with a human** in real time. This is a **Socket challenge** more than coding a bot.

My objective is to complete all the users management logic, since the game rules are simple and where implemented in less than 2 days.


### TODO list, as of 2025-12-07:

- [x] `n` x `n` grid layout
- [x] Socket connections between players of a specific game id.
- [x] Turns alternance, respecting the "additional turn" on drawing the 4^th^ line a square.
- [x] Socket id refresh (and players registration to a game id update).
- [x] Score count
- [x] Players real time chat.
- [x] Player names
- [x] *Ping/Pong* web socket connections check to display acurate players online state.
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
- [ ] Controls: on game over, start a new game with same opponent.
- [ ] A sympatic guided tour on first visit (for the controls, rule games...) instead of plain text instructions.
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
