import React, { useState, useCallback } from 'react'
import {
  Button,
  CircularProgress,
  Typography,
  TableCell,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'

import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { AiFillCloseSquare } from 'react-icons/ai'
import { IoCloseOutline } from 'react-icons/io5'

const styled_icon = {
  fontSize: '20px',
  backgroundColor: '#F5F5F5',
  color: '#3B3B3B',
}

export const DialogComponent = ({ title, content, open, onClose }) => {
  const [dialogOpen, setDialogOpen] = useState(open)

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false)
    onClose()
  }, [onClose])

  const handleOpenDialog = useCallback(() => {
    setDialogOpen(true)
  }, [])

  React.useEffect(() => {
    setDialogOpen(open)
  }, [open])

  function CloseBox(props) {
    const { children, onClose, ...other } = props

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            onClick={onClose}
            size='large'
            sx={{
              position: 'absolute',
              left: '24px',
              top: '24px',
              width: '32px',
              height: '32px',
              backgroundColor: '#F5F5F5',
              borderRadius: '5px',
            }}
          >
            <CloseIcon onClick={onClose} style={styled_icon} />
            <IoCloseOutline onClick={onClose} style={styled_icon} />
          </IconButton>
        ) : null}
      </DialogTitle>
    )
  }

  return (
    <>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <CloseBox onClose={handleCloseDialog}></CloseBox>

        <DialogTitle
          sx={{
            p: '85px 114px 0 114px',
            font: 'normal normal 600 33px/39px Rubik',
            color: ' #3B3B3B',
            width: '355px',
          }}
        >
          {title}
        </DialogTitle>
        <DialogContent
          sx={{
            p: '85px 114px 0 114px',
            font: 'normal normal 300 26px/31px Rubik',
            color: ' #3B3B3B',
            width: '355px',
            pb: '120px',
          }}
        >
          {content}
        </DialogContent>
      </Dialog>
    </>
  )
}
