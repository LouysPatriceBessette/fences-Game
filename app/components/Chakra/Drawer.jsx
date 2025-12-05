import { useState } from 'react'
import {
  CloseButton,
  Drawer,
  Portal,
} from "@chakra-ui/react"
import { ChakraButton } from './Button'


export const ChakraDrawer = ({title, placement, footer=undefined, ref, externalControl=false, drawerIsOpen, setDrawerIsOpen, children}) => {

  const [isOpen, setIsopen] = useState(false)

  return (
    <Drawer.Root
      key={placement}
      placement={placement}
      onClose={externalControl ? () => setDrawerIsOpen(false) : () => setIsopen(false)}
      open={externalControl ? drawerIsOpen : isOpen}
      onOpenChange={() => {
        if(externalControl){
          if(drawerIsOpen){
            setDrawerIsOpen(false)
          }
          return
        }
        setIsopen(!isOpen)
      }}
    >
      <Drawer.Trigger asChild>
        <ChakraButton
          ref={ref}
          onMouseDown={() => setDrawerIsOpen(true)}
          variant="outline"
          size="sm"
          text='Chat'
        />
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content
            roundedTop={placement === "bottom" ? "l3" : undefined}
            roundedBottom={placement === "top" ? "l3" : undefined}
          >
            <Drawer.Header>
              <Drawer.Title>{title}</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              {children}
            </Drawer.Body>
            {footer && <Drawer.Footer>
              {footer}
            </Drawer.Footer>}
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}
