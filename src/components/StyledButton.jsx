import { styled } from "@mui/system"
import { Button } from "@mui/material"
import {BlackBox} from "./AllHelpComponents"

export const StyledButton = styled(Button)(
  ({ theme }) => ({
    backgroundColor: "#1a3f6c",
    // backgroundColor: "#1a222c",
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
    border : "2px solid #000",
   }),

  { shouldForwardProp: (prop) => prop !== "variant" }
)
