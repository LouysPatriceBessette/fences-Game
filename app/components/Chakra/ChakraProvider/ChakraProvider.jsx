import React from 'react'
import {
  ChakraProvider as Provider,
} from '@chakra-ui/react'
import { system } from './theme'


export function ChakraProvider(props) {
  return (
    <Provider value={system}>
      {props.children}
    </Provider>
  )
}
