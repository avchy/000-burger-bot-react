import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Paper,
  styled,
  Box,
  Button,
  CircularProgress,
  Typography,
  TableCell,
} from '@mui/material'

export const FlexRowContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  // border: '1px solid blue',
}))

export const FlexColumnContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  // gap: theme.spacing(2),

  // border: '1px solid green',
}))
export const CenterBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  position: 'absolute';
`

const BlackBox = styled(Box)`
  width: 22px;
  height: 21px;
  background: #000000 0% 0% no-repeat padding-box;
  margin-bottom: 11px;
`

export const FiveBlackBoxes = () => {
  return (
    <Container>
      <BlackBox />
      <BlackBox />
      <BlackBox />
      <BlackBox />
      <BlackBox />
    </Container>
  )
}
