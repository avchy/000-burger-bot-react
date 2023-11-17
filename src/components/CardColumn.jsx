import React, { useState, useContext } from "react"
// import { Skeleton, Stack } from "@mui/material"
import "App.scss"
import { Button } from "./Button"
import { useTranslation } from "react-i18next"
import { Link, useLocation, useNavigate } from "react-router-dom"
// import * as React from 'react';
// import { CartContext } from "App"
import default_dish_img from "images/svg_dishes/pot-dinner-svgrepo-com.svg"
import isPhotoUrl from "helpers/isPhotoUrl"
 
export function CardColumn({ food, onAdd, onRemove, quantity }) {
  const navigate = useNavigate()

  const [count, setCount] = useState(quantity || 0)
  const [imageLoaded, setImageLoaded] = useState(false) // State to track if the image has loaded
  const { id, title, image, price, toppings } = food
  const { t, i18n } = useTranslation()

  const handleIncrement = () => {
    setCount(count + 1)
    onAdd(food)
  }
  const handleToppings = () => {
    navigate("/product", { state: { food } })
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

      <div
        className="image_container"
        // style={{ display: "block" }}
        style={{ display: imageLoaded ? "block" : "none" }}
      >
        <img
          src={isPhotoUrl(image) ?  image : default_dish_img}
          alt={title}
          onLoad={handleImageLoad}
          // style={{ display: imageLoaded ? "block" : "none" }}
          style={{ display: "block" }}
        />

        {/* {!imageLoaded ? (
          <Skeleton
            sx={{ bgcolor: "grey.900" }}
            animation="wave"
            variant="rectangular"
            width={100}
            height={100}
          />
        ) : (
          <img
            src={image}
            alt={title}
            onLoad={handleImageLoad}
            // style={{ display: imageLoaded ? "block" : "none" }}
            style={{ display: "block" }}
          />
        )} */}
      </div>

      {/* <h4 className="card_title">{title}</h4> */}
      <h4 className="card_title">{t(title)}</h4>

      <p className="cart_text_center">{price} ₪</p>

      <div className="btn-container">
        <Button
          title={toppings ? "choose" : "+"}
          type={"add"}
          onClick={toppings ? handleToppings : handleIncrement}
        />
        {count !== 0 ? (
          <Button title={"-"} type={"remove"} onClick={handleDecrement} />
        ) : (
          ""
        )}
      </div>
    </div>
  )
}
