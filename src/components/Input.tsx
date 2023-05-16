import { forwardRef } from 'react'
import { TextField } from '@mui/material'

interface InputType {
  name: string,
  placeholder: string
}

const Input = forwardRef((props: InputType, ref) => {
  return (
    <TextField
        variant="outlined"
        margin="normal"
        inputRef={ref}
        fullWidth
        type='text'
        sx={{ width: '300px' }}
        {...props}
    >
    </TextField>
  )
});

export default Input