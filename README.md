# Dots and Boxes
This is a rainy days camping game. I started coding it on **2025-11-27**.

I used to call it *"jeux des p'tites lignes"* in French, which would translate to "little lines game"" in English.

## How to play?

<iframe width="560" height="315" src="https://www.youtube.com/embed/hQdQWxQk8_A?si=2OSdoyprUf6NruJz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## More about this game
Obviouly, I am not the inventor. In fact this is a **19th century** game.

Have a look at this [Wikipedia](https://en.wikipedia.org/wiki/Dots_and_boxes) article.


## My "work in progress" implementation
I am focussing on playing **with a human** in real time. This is a **Socket challenge** more than coding a bot.

My objective is to complete all the users management logic, since the game rules are simple and where implemented in less than 2 days.


### TODO list, as of 2025-12-02:

- [x] `n` x `n` grid layout
- [x] Socket connections between players of a specific game id.
- [x] Turns alternance, respecting the "additional turn" on drawing the 4^th^ line a square.
- [x] Socket id refresh (and players registration to a game id update).
- [x] Score count
- [x] Players real time chat.
- [x] Player names
- [x] *Ping/Pong* web socket connections check to display acurate players online state.
- [ ] Player selection for the grid size (on game creation) with a `x` x `y` grid instead od `n` x `n`.
- [ ] Controls: Leave, drop, destroy or start a new game.
- [ ] Share the game id (link or QR).
- [ ] Play with an unknown player (if you have no friends available... or to resume a game dropped by your opponent).
- [ ] A sympatic guided tour on first visit (for the controls, rule games...) instead of plain text instructions.


### Instructions to run

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.
