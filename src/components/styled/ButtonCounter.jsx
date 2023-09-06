import React, { useState } from "react"
import "../../App.scss"
import { Button } from "./Button"
import { Box, Typography } from "@mui/material"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  FlexRowContainer,
  StyledTextField,
} from "components/styled/AllHelpComponents"
import { CartContext } from "App"
import { useContext } from "react"

const card_badge_simple = { padding: "0 8px" }
const card_badge_hidden = { display: "none" }

export function ButtonCounter({ food, onAdd, onRemove, quantity }) {
  const [count, setCount] = useState(quantity || 0)

  // const handleIncrement = () => {
  //   setCount(count + 1)
  // }

  const handleIncrement = () => {
    setCount(count + 1)
    onAdd(food)
  }

  const handleDecrement = () => {
    setCount(count - 1)
    onRemove(food)
  }

  return (
    <>
      <FlexRowContainer
        sx={{
          justifyContent: "flex-end",
          // width: "30%",
        }}
      >
        {count !== 0 ? (
          <Button title={"-"} type={"remove"} onClick={handleDecrement} />
        ) : (
          ""
        )}

        <Box
          sx={count !== 0 ? card_badge_simple : card_badge_hidden}
          display="inline"
        >
          <Typography
            sx={{ border: "2px solid orange", padding: "4px 8px " }}
            variant="body1"
          >
            {  count}
            {/* {count === 1 ? count + 1 : count} */}
          </Typography>
        </Box>

        <Button title={"+"} type={"add"} onClick={handleIncrement} />
      </FlexRowContainer>
    </>
  )
}
