'use client'

import { Provider } from 'react-redux';
import { store } from "./store/store";
import { Game } from "./pages/game";
import { SocketListen } from "./socket/socket";
import { Chat } from "./socket/chat";

export default function Home() {
  return (
    <Provider store={store}>
      <Game />
      <SocketListen/>
      <Chat/>
    </Provider>
  );
}
