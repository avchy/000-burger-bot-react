import React, { useState } from "react"
import "../../App.scss"
import { Button } from "./Button"
import { Link, useLocation, useNavigate } from "react-router-dom"

export function ButtonCounter({ food, onAdd, onRemove, quantity }) {
  const [count, setCount] = useState(quantity || 0)

  const handleIncrement = () => {
    setCount(count + 1)
  }

  const handleDecrement = () => {
    setCount(count - 1)
  }

  return (
    <>
    

      <div className="btn-container">
      <span className={`${count !== 0 ? "card_badge" : "card_badge--hidden"}`}>
        {count}
      </span>
        <Button title={"+"} type={"add"} onClick={handleIncrement} />
        {count !== 0 ? (
          <Button title={"-"} type={"remove"} onClick={handleDecrement} />
        ) : (
          ""
        )}
      </div>
    </>
  )
}
