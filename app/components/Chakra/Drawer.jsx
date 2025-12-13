import { useEffect } from 'react';
import {
  CloseButton,
  Drawer,
  Portal,
} from "@chakra-ui/react"
import { ChakraButton } from './Button'

export const ChakraDrawer = (props) => {
  const {
    open,
    setOpen,
    title,
    placement,
    buttonId,
    buttonText,
    displayCloseButton=false,
    footer,
    onOpenChange,
    disableOverlayClick=false,
    children,
    ...rest
  } = props

  useEffect(() => {
    if(rest.triggerOpen && !open){
      (() => setOpen(true))()
    }
  }, [rest.triggerOpen, open, setOpen])

  return (
    <Drawer.Root
      key={placement}
      placement={placement}
      onClose={() => setOpen(false)}
      open={open}
      setOpen={setOpen}
      onPointerDownOutside={(event) => {
        if(disableOverlayClick){
          event.preventDefault()
        }
      }}
      onOpenChange={onOpenChange}
    >
      <Drawer.Trigger asChild>
        <ChakraButton
        id={buttonId}
          onClick={() => {
            if(rest.buttonCallback){
              rest.buttonCallback()
            } else {
              setOpen(!open)
            }
          }}
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
              {displayCloseButton && <CloseButton
                size="sm"
                onClick={() => setOpen(false)}
              />}
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}
