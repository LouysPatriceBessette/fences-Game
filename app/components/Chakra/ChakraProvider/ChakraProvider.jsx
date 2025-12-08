import React from 'react'
import {
  ChakraProvider as Provider,
  // defaultTheme,
} from '@chakra-ui/react'
import { system } from './theme'
import { ColorModeProvider } from './color-mode'


export function ChakraProvider(props) {
  return (
    <Provider value={system}>
      <ColorModeProvider {...props} />
    </Provider>
  )
}
