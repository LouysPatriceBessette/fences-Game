import { Box, Input } from '@chakra-ui/react'
import { CustomLabel } from './customComponents'

export const ChakraInput = (props) => {
  const { variant, placeholder, label, id, name, value, setValue, ...rest } = props

  return (
    <Box className='chakraContainer'>
      <CustomLabel label={label}/>
      <Input
        {...rest}
        variant={variant}
        placeholder={placeholder}
        aria-label={label}
        id={id}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </Box>

  )
}
