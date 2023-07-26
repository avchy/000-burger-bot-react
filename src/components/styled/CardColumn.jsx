import React, { useState } from "react"
import { Skeleton } from "@mui/material"
import "../../App.scss"
import { Button } from "./Button"
import { useTranslation } from "react-i18next"

export function CardColumn({ food, onAdd, onRemove, quantity }) {
  const [count, setCount] = useState(quantity || 0)
  const [imageLoaded, setImageLoaded] = useState(false) // State to track if the image has loaded
  const { title, Image, price, id } = food
  const { t, i18n } = useTranslation()

  const handleIncrement = () => {
    setCount(count + 1)
    onAdd(food)
  }

  const handleDecrement = () => {
    setCount(count - 1)
    onRemove(food)
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  return (
    <div className="CardColumn">
      <span className={`${count !== 0 ? "card_badge" : "card_badge--hidden"}`}>
        {count}
      </span>

      {/* Show Skeleton while image is loading */}
      {!imageLoaded && <Skeleton variant="rounded" />}
      {/* {!imageLoaded && <Skeleton variant="rounded" width={210} height={118} /> } */}

      {/* Show the image after it has loaded */}
      <div
        className="image_container"
        style={{ display: imageLoaded ? "block" : "none" }}
      >
        <img
          src={Image}
          alt={title}
          onLoad={handleImageLoad}
          style={{ display: imageLoaded ? "block" : "none" }}
        />
      </div>

      {/* <h4 className="card_title">{title}</h4> */}
      <h4 className="card_title">{t(title)}</h4>

      <p className="cart_text_center">{price} ₪</p>

      <div className="btn-container">
        <Button title={"+"} type={"add"} onClick={handleIncrement} />
        {count !== 0 ? (
          <Button title={"-"} type={"remove"} onClick={handleDecrement} />
        ) : (
          ""
        )}
      </div>
    </div>
  )
}
