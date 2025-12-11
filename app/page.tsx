'use client'

import { Provider } from 'react-redux';
import { store } from "./store/store";
import { NextStepProvider, NextStep} from 'nextstepjs';
import { steps } from './tour';
import { Game } from "./pages/game";
import { SocketListen } from "./socket";
import { ChakraProvider } from "./components/Chakra/ChakraProvider/ChakraProvider";

export default function Home() {
  return (
    <NextStepProvider>
      <Provider store={store}>
        <NextStep steps={steps}>
          <ChakraProvider>
            <Game />
            <SocketListen/>        
          </ChakraProvider>
        </NextStep>
      </Provider>
    </NextStepProvider>
  );
}
