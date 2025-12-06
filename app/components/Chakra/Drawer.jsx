import { useState, useEffect } from 'react'
import {
  CloseButton,
  Drawer,
  Portal,
} from "@chakra-ui/react"
import { ChakraButton } from './Button'

export const ChakraDrawer = ({
  title='',
  placement,
  buttonText,
  displayCloseButton=false,
  footer=undefined,
  triggerOpen: triggerOpen=false,
  children
}) => {

  const [isOpen, setIsopen] = useState(false)

  useEffect(() => {
    if(triggerOpen && !isOpen){
      (() => setIsopen(true))()
    }
  }, [triggerOpen, isOpen])

  return (
    <Drawer.Root
      key={placement}
      placement={placement}
      onClose={() =>setIsopen(false)}
      open={isOpen}
      onPointerDownOutside={() =>setIsopen(false)}
    >
      <Drawer.Trigger asChild>
        <ChakraButton
          onClick={() => setIsopen(!isOpen)}
          variant="outline"
          size="sm"
          text={buttonText}
        />
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content
            roundedTop={placement === "bottom" ? "l3" : undefined}
            roundedBottom={placement === "top" ? "l3" : undefined}
          >
            {title && <Drawer.Header>
              <Drawer.Title>{title}</Drawer.Title>
            </Drawer.Header>}
            <Drawer.Body>
              {children}
            </Drawer.Body>
            {footer && <Drawer.Footer>
              {footer}
            </Drawer.Footer>}
            <Drawer.CloseTrigger asChild>
              {displayCloseButton && <CloseButton size="sm" onClick={() => setIsopen(!isOpen)}/>}
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}
