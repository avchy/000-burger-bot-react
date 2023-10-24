import React from "react"
import { StyledButton } from "components/StyledButton"

export function BigButton({ title, disable, onClick, backgroundColor }) {
  const buttonStyle = {
    background: backgroundColor,
    border: "4px solid black",
    borderRadius: "10px",
  }

  return (
    <StyledButton
      variant="contained"
      disabled={disable}
      onClick={onClick}
      style={buttonStyle}
    >
      {title}
    </StyledButton>
  )
}
