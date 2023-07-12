import { styled } from '@mui/system'
import { Button } from '@mui/material'

export const StyledButton = styled(Button)(
  ({ theme }) => ({
    backgroundColor: '#409FFF',
    cursor: 'pointer',
width: '100%',
heaight: '100%',
    color: 'white',
    padding: '10px 20px',
    fontSize: '16px',
    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    // '&:active': {
    //   backgroundColor: '#409FFF',
    // },
  }),
  { shouldForwardProp: (prop) => prop !== 'variant' }
)
