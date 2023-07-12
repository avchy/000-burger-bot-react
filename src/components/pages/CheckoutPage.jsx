import  { useState, useEffect, useCallback } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

import "../../App.scss"
import { serverIP, port } from "constants/api.js"
import { BigButton } from "components/BigButton"
import { CardRowSmall } from "components/CardRowSmall"
// import { getTotalPrice } from "../utils/utils"
import { useTelegram } from "hooks/useTelegram"
import orderImg from "../../images/orderImg.png"
import { useNavigator } from "hooks/useNavigator"
import axios from "axios"
import { StyledButton } from "components/StyledButton"

const tele = window.Telegram.WebApp

export function CheckoutPage() {
  const { queryId } = useTelegram()
  // console.log('queryId :>> ', queryId);
  const { env } = useNavigator()

  const [address, setAddress] = useState("")
  const [tempError, setTempError] = useState("---")
  const [tempData, setTempData] = useState({})
  const [optionDelivery, setOptionDelivery] = useState("on_site")

  tele.BackButton.show()

  tele.MainButton.setParams({ text: "PAY" })

  const query_id = window.Telegram.WebApp.initDataUnsafe?.query_id

  const location = useLocation()
  const cartItems = location?.state?.cartItems || []
  const comment = location?.state?.comment
  console.log("location?.state?", location?.state)

  const totalPrice = location?.state?.totalPrice
  // const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0)

  const navigate = useNavigate()

  const onBackButtonClicked = useCallback(() => {
    navigate(-1)
  }, [cartItems])
  
  tele.BackButton.onClick(onBackButtonClicked)

  const onSubmit = useCallback(() => {
    for (let i = 0; i < cartItems.length; i++) {
      delete cartItems[i].Image
    }

    const data = {
      address: address,
      comment: comment,
      products: cartItems,
      totalPrice: totalPrice,
    }

    navigate("/payments", { state: data })
  }, [cartItems, comment])

  useEffect(() => {
    tele.onEvent("mainButtonClicked", onSubmit)
    tele.onEvent("backButtonClicked", onBackButtonClicked)

    return () => {
      tele.offEvent("mainButtonClicked", onSubmit)
      tele.offEvent("backButtonClicked", onBackButtonClicked)
    }
  }, [onSubmit])

  const onSendData = () => {
    // const onSendData = useCallback(() => {

    // const shopDataRoute = `${serverIP}:${port}/web-data`

    // const data = {
    //   queryId:"AAHqIAUXAAAAAOogBRex84jA",
    //   products: cartItems,
    //   totalPrice: getTotalPrice(cartItems),
    // }

    for (let i = 0; i < cartItems.length; i++) {
      delete cartItems[i].Image
    }

    const data = {
      queryId,
      address: address,
      comment: comment,
      products: cartItems,
      totalPrice: totalPrice,
    }

    tele.sendData(JSON.stringify(data))

    // setTempData(data)

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://94.198.216.20:8000/web-data",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      data: JSON.stringify(data),
    }

    try {
      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data))
          setTempData(JSON.stringify(response.data))
        })
        .catch((error) => {
          if (error.response) {
            console.log("error.response.data", error.response?.data)

            setTempError(
              "Обработка ошибок при выполнении axios.post ---" +
                JSON.stringify(error.response?.data, null, 2)
            )
          }

          setTempError(
            "Обработка ошибок при выполнении axios.post ---" +
              JSON.stringify(error, null, 2)
          )
        })
    } catch (error) {
      console.error("error:", error)
    }
  }

  useEffect(() => {
    // tele.onEvent("mainButtonClicked", onSendData)
    tele.onEvent("mainButtonClicked", onSubmit)

    return () => {
      // tele.offEvent("mainButtonClicked", onSendData)
      tele.offEvent("mainButtonClicked", onSubmit)
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
      {/* <div className="testWindow">
        <p className="testText">{`tempData ${JSON.stringify(
          tempData,
          null,
          2
        )}`}</p>
        <p className="testText">{`tempError ${tempError}`}</p>
      </div> */}

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

        {cartItems && cartItems.length > 0 && (
          <div className="cardsContainer">
            {cartItems.map((food) => {
              return <CardRowSmall food={food} key={food.id} />
            })}
          </div>
        )}

        <CardRowSmall food={{ id: 9999, title: "Free delivery" }} key={9999} />
        <CardRowSmall
          food={{ id: 1, title: "Total Price:", price: totalPrice }}
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

      {env === "browser" &&
        (optionDelivery === "on_site" ||
          (optionDelivery === "take_away" && address)) && (
          <BigButton
            title={`${"Payments"} `}
            type={"payments"}
            disable={cartItems.length === 0 ? true : false}
            onClick={onSubmit}
          />
        )}
    </>
  )
}
