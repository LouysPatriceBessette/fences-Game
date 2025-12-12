import {
  Dialog,
  Portal,
  CloseButton,
} from '@chakra-ui/react'
import { ChakraButton as Button } from './Button'

export const ChakraDialog = (props) => {

  const {
    id,

    size='md',
    title,
    body=<p>Add the body property (JSX) to the body attribute.</p>,

    open,
    setOpen,
    onOpenChange,

    openButtonText,
    openButtonColor='white',
    openButtonDisabled=false,
    openButtonCallback,

    cancelButtonText='',
    cancelButtonColor='red',
    cancelButtonDisabled=false,
    cancelCallback=() => {},
    cancelButtonHidden=false,

    saveButtonText,
    saveButtonColor='green',
    saveButtonDisabled=false,
    saveButtonCallback=() => {},
    saveButtonHidden=false,
    
    overlayCloseDisabled=false,
    closeButtonHidden=false,
    
  } = props

  let externalOpenControl
  if(open && setOpen){
    externalOpenControl = {
      open,
      setOpen
    }
  }

  return (
    <Dialog.Root
      size={size}
      {...externalOpenControl}
      closeOnInteractOutside={!overlayCloseDisabled}
      onOpenChange={onOpenChange}
      >
      <Dialog.Trigger asChild>
        <Button
          id={id}
          customVariant={openButtonColor}
          size={size}
          text={openButtonText ?? 'Open Dialog'}
          disabled={openButtonDisabled}
          onMouseUp={() => openButtonCallback?.()}
        />
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              {body}
            </Dialog.Body>
            <Dialog.Footer id='tour__dialog-footer'>
              {!cancelButtonHidden && <Dialog.ActionTrigger asChild>
                <Button
                customVariant={cancelButtonColor}
                text={cancelButtonText}
                onClick={() => cancelCallback()}
                disabled={cancelButtonDisabled}
              />
              </Dialog.ActionTrigger>}
              {!saveButtonHidden && <Dialog.ActionTrigger asChild>
                <Button
                  customVariant={saveButtonColor}
                  text={saveButtonText}
                  onClick={() => saveButtonCallback()}
                  disabled={saveButtonDisabled}
                />
              </Dialog.ActionTrigger>}
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              {!closeButtonHidden && <CloseButton size="sm" />}
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
