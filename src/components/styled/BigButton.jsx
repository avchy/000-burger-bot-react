import React from "react"
import { StyledButton } from "components/styled/StyledButton"

export function BigButton({ title, disable, onClick }) {
  return (
    <StyledButton variant="contained" disabled={disable} onClick={onClick}>
      {title}
    </StyledButton>
  )
}
