'use client'

import { Provider } from 'react-redux';
import { store } from "./store/store";
import { Game } from "./pages/game";
import { SocketListen } from "./socket";
import { Chat } from "./components/chat";

export default function Home() {
  return (
    <Provider store={store}>
      <Game />
      <SocketListen/>
      <Chat/>
    </Provider>
  );
}
