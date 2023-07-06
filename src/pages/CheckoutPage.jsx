import React, { useState, useEffect, useCallback } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

import "../App.scss"
import { serverIP, port } from "../constants/api.js"
import { BigButton } from "../components/BigButton"
import { CardRowSmall } from "../components/CardRowSmall"
import { getTotalPrice } from "../utils/utils"
import { useTelegram } from "../hooks/useTelegram"
import orderImg from "../images/orderImg.png"
import { useNavigator } from "../hooks/useNavigator"
import axios from "axios"
const tele = window.Telegram.WebApp

export function CheckoutPage() {
  const { queryId } = useTelegram()
  // console.log('queryId :>> ', queryId);
  const { env } = useNavigator()

  const [address, setAddress] = useState("")
  const [optionDelivery, setOptionDelivery] = useState("on_site")

  // tele.BackButton.show()
  tele.enableClosingConfirmation()

  tele.expand() //расширяем на все окно

  tele.MainButton.setParams({ text: "PAY" })
  // tele.MainButton.setText("PAY")
  // tele.MainButton.text = "PAY"

  // tele.MainButton.onClick(() => alert("submitted111"))

  const query_id = window.Telegram.WebApp.initDataUnsafe.query_id

  const location = useLocation()
  const cartItems = location.state.cartItems
  const comment = location.state.value

  const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0)

  const navigate = useNavigate()

  const onBackButtonClicked = useCallback(() => {
    navigate(-1)
  }, [cartItems])

  const onSendData = useCallback(() => {

      console.log("onSendData")
      alert("onSendData")
      // console.log("tele", tele)
      // console.log("tele.initDataUnsafe?.query_id", tele.initDataUnsafe?.query_id)
      // console.log("tele.initData", tele.initData)
      // console.log("tele.initDataUnsafe", tele.initDataUnsafe)

      // tele.sendData("some string that we need to send")
      // window.Telegram.WebView.postEvent("web_app_data_send", false, {
      //   data: "some string that we need to send2222",
      // })

      // const shopDataRoute = `${serverIP}:${port}/web-data`
      const shopDataRoute = `http://94.198.216.20:8000/web-data`
      // const shopDataRoute = `http://54.86.166.140:8000/web-data`
      // const shopDataRoute = `localhost:8000/web-data`

      console.log("shopDataRoute :>> ", shopDataRoute)

      const data = {
        queryId,
        products: cartItems,
        // totalPrice: totalPrice,
        totalPrice: getTotalPrice(cartItems),
      }

      //   {
      //     "queryId": "AAHqIAUXAAAAAOogBRcbo4rw",
      //     "products": [],
      //     "totalPrice": 123123
      // }

      console.log("data11", data)
      
alert(queryId)
alert(cartItems)
alert(totalPrice)

 
      axios
        .post(shopDataRoute, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            console.log("response.data", response.data)
            alert("status200")
          } else {
            // Обработка ошибок
            alert("status not 200")
            throw new Error("Ошибка при выполнении запроса: " + response.status)
          }
        })
        .catch((error) => {
          // Обработка ошибок сети или других ошибок
          console.error("Произошла ошибка:", error)
          alert("Произошла ошибка:", error)
        })
    },
    [cartItems])

  //   const onSendData = useCallback(() => {
  //     const data = {
  //         products: addedItems,
  //         totalPrice: getTotalPrice(addedItems),
  //         queryId,
  //     }
  //     fetch('http://85.119.146.179:8000/web-data', {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(data)
  //     })
  // }, [addedItems])

  useEffect(() => {
    tele.onEvent("mainButtonClicked", onSendData)
    tele.onEvent("backButtonClicked", onBackButtonClicked)

    return () => {
      tele.offEvent("mainButtonClicked", onSendData)
      tele.offEvent("backButtonClicked", onBackButtonClicked)
    }
  }, [onSendData])

  useEffect(() => {
    if (optionDelivery == "take_away" && !address) {
      tele.MainButton.hide()
    } else {
      tele.MainButton.show()
    }
  }, [address])

  const onChangeAddress = (e) => {
    setAddress(e.target.value)
  }

  const onChangeOption = (e) => {
    setOptionDelivery(e.target.value)
  }

  return (
    <>
      <div className="checkoutPage">
        <h1 className="title">Checkout</h1>
        <div className="orderContainer">
          <div className="imageContainer">
            <img src={orderImg} alt={"orderImg"} />
          </div>

          <div className="textContainer">
            <div className="text1"> Order № 770770</div>
            {/* <div className='text1'> Order № {queryId||123123}</div> */}
            <div className="text1"> Perfect lunch from Burger Bot.</div>
            <div className="text_small">Burger Bot.</div>
          </div>
        </div>
        <div className="cardsContainer">
          {cartItems.map((food) => {
            return <CardRowSmall food={food} key={food.id} />
          })}
        </div>

        <CardRowSmall food={{ id: 9999, title: "Free delivery" }} key={9999} />
        <CardRowSmall
          food={{ id: 1, title: "Total Price:", price: totalPrice.toFixed(2) }}
          key={0}
        />
      </div>

      {comment && (
        <div className="comment_container">
          <div className="title_mini"> Your Comment : </div>
          <div className="text_small">{comment}</div>
        </div>
      )}

      <div className={"form"}>
        <div className={"title_mini"}>Choose where you eat</div>

        <select
          value={optionDelivery}
          onChange={onChangeOption}
          className={"select"}
        >
          <option className={"selectField"} value={"on_site"}>
            On Site
          </option>
          <option className={"selectField"} value={"take_away"}>
            Take Away
          </option>
        </select>

        {optionDelivery == "take_away" && (
          <input
            className={"input"}
            type="text"
            placeholder={"Address"}
            value={address}
            onChange={onChangeAddress}
          />
        )}
      </div>

      {console.log("env  :>> ", env)}
      {/* {console.log("  optionDelivery  :>> ", optionDelivery)}
      {console.log(" address :>> ", !address)} */}

      {env === "browser" &&
        (optionDelivery === "on_site" ||
          (optionDelivery === "take_away" && address)) && (
          <BigButton
            title={`${"Checkout"} `}
            type={"checkout"}
            disable={cartItems.length === 0 ? true : false}
            onClick={onSendData}
          />
        )}
    </>
  )
}
