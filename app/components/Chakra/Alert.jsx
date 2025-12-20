import React from 'react'
import { Alert, Box } from '@chakra-ui/react'

export const ChakraAlert = (props) => {

  const {status, title, description, action} = props

  return (
    <Alert.Root status={status}>
      <Alert.Indicator />
      <Alert.Content>
        {title && <Alert.Title style={{ textAlign: 'left' }}>{title}</Alert.Title>}
        <Alert.Description>
          {description && <Box display='flex' justifyContent='start'>
            {description}
          </Box>}
          {action && <Box display='flex' justifyContent='end'>
            {action}
          </Box>}
        </Alert.Description>
      </Alert.Content>
    </Alert.Root>
  )
}
