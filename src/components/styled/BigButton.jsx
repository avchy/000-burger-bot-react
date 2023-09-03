import React from "react"
import { StyledButton } from "components/styled/StyledButton"

export function BigButton({ title, disable, onClick, backgroundColor }) {
  const buttonStyle = {
    background: backgroundColor, // Здесь передайте цвет фона
  };

  return (
    <StyledButton variant="contained" disabled={disable} onClick={onClick} style={buttonStyle}>
      {title}
    </StyledButton>
  )
}
