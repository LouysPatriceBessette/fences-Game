import React from 'react'
import { Menu, Portal } from '@chakra-ui/react'
import { ChakraButton } from './Button'
import { randomReactKey } from '../../basics/utils'

export const ChakraMenu = ({ buttonTitle, buttonCustomVariant='', items, onSelect }) => {

  return (
    <Menu.Root onSelect={onSelect}>
      <Menu.Trigger asChild>
        <ChakraButton
          text={buttonTitle}
          customVariant={buttonCustomVariant}
        />
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {items.map((item) => (
              <Menu.Item
                key={randomReactKey()}
                value={item.value}
                disabled={item.disabled}
              >
                {item.label}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}
