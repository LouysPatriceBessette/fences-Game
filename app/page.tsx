'use client'

import { Provider } from 'react-redux';
import { store } from "./store/store";
import { Game } from "./pages/game";



export default function Home() {
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  );
}
