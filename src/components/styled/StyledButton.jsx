import { styled } from "@mui/system"
import { Button } from "@mui/material"

export const StyledButton = styled(Button)(
  ({ theme }) => ({
    backgroundColor: "#000000",
    cursor: "pointer",
    width: "90%",
    height: "50px",
    color: "white",
    padding: "50px 20px",
    margin: "20px 20px",
    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
    gap: 5,

    fontSize: "20px",
    fontWeight: "bold",
  }),
 
  { shouldForwardProp: (prop) => prop !== "variant" }
)
