import React from 'react'
import { ScrollArea } from '@chakra-ui/react'

export const ChakraScrollArea = (props) => {

  const {children, orientation, barColor, thumbColor, always, size} = props

  const horizontal = orientation === 'horizontal'
  const vertical = orientation === 'vertical' || orientation === 'both' || orientation === undefined

  return (
    <ScrollArea.Root size={size} variant={always ? 'always' : 'hover'}>
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          {children}
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      {horizontal && <ScrollArea.Scrollbar orientation='horizontal' bg={barColor}>
        <ScrollArea.Thumb bg={thumbColor} />
      </ScrollArea.Scrollbar>}
      {vertical && <ScrollArea.Scrollbar orientation='vertical' bg={barColor}>
        <ScrollArea.Thumb bg={thumbColor} />
      </ScrollArea.Scrollbar>}
      <ScrollArea.Corner />
    </ScrollArea.Root>
  )
}
