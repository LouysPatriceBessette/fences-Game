'use client'

import { Provider } from 'react-redux';
import { store } from "./store/store";
import { NextStepProvider} from 'nextstepjs';
import { NextStepStore } from "./tour/NextStepStore";

import { Game } from "./pages/game";
import { SocketListen } from "./socket";
import { ChakraProvider } from "./components/Chakra/ChakraProvider/ChakraProvider";

export default function Home() {
  return (
    <NextStepProvider>
      <Provider store={store}>
        <NextStepStore>
          <ChakraProvider>
            <Game />
            <SocketListen/>        
          </ChakraProvider>
        </NextStepStore>
      </Provider>
    </NextStepProvider>
  );
}
