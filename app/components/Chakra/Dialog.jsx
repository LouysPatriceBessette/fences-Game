import {
  Dialog,
  Portal,
  CloseButton,
} from '@chakra-ui/react'
import { ChakraButton as Button } from './Button'

export const ChakraDialog = ({
  // key,
  size,
  title='Dialog Title',
  openButtonText,
  openButtonColor='white',
  cancelButtonText,
  saveButtonText,
  saveCallback=() => {},
  body=<p>Add the body property (JSX) to the body attribute.</p>,
  disabled=false
}) => {

  return (
    <Dialog.Root size={size}>
      <Dialog.Trigger asChild>
        <Button
          customVariant={openButtonColor}
          size={size}
          text={openButtonText}
          disabled={disabled}
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
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                customVariant='red'
                text={cancelButtonText}
                
                />
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button
                customVariant='green'
                text={saveButtonText}
                onClick={() => saveCallback()}
                />
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}


/*

*/