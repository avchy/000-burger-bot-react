const tele = window.Telegram.WebApp
import { useState, useCallback, useEffect, useContext } from "react"
import {
  Box,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Typography,
} from "@mui/material"

import { Link, useLocation, useNavigate } from "react-router-dom"
import "App.scss"
import { ButtonCounter } from "components/ButtonCounter"
import { BigButton } from "components/BigButton"
import { useNavigator } from "hooks/useNavigator"

import { useTranslation } from "react-i18next"
import i18n from "helpers/i18n"
import Avatar from "@mui/material/Avatar"
import default_dish_img from "images/svg_dishes/pot-dinner-svgrepo-com.svg"
import isPhotoUrl from "helpers/isPhotoUrl"
import toppings_icon from "images/toppings_icon.png"

import { FlexRowContainer } from "components/AllHelpComponents"
import { CartContext } from "App"
import { LoadingOverlay } from "./LoadingOverlay"
import queryString from "query-string"

export const Product = () => {
  const { t } = useTranslation()
  const { env } = useNavigator()
  const navigate = useNavigate()
  const location = useLocation()
  const { cartItems, setCartItems, typesList } = useContext(CartContext)
  console.log("cartItems1111 :>> ", cartItems)
  const food = location?.state?.food
  const exist = cartItems.find((x) => x.id === food.id)

  const query = queryString.parse(location.search)
  const dish_id = query.dish_id

  // const food = cartItems.find((x) => x.id === dish_id.id)
  // const exist = cartItems.find((x) => x.id === dish_id.id)

  const [quantityItem, setQuantityItem] = useState(exist?.quantity || 1)
  const [selectedToppings, setSelectedToppings] = useState(
    exist?.selectedToppings || []
  )
  const [selectedExtras, setSelectedExtras] = useState({})
  const [selectedExtrasNames, setSelectedExtrasNames] = useState({})
  const [groupedExtras, setGroupedExtras] = useState({})

  useEffect(() => {
    console.log("selectedExtras :>> ", selectedExtras)
    console.log("selectedExtrasNames :>> ", selectedExtrasNames)
  }, [selectedExtras, selectedExtrasNames])

  useEffect(() => {
    tele.ready()
  })

  useEffect(() => {
    const exist = cartItems.find((x) => x.id === food.id)

    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity } : x
        )
      )
    } else {
      setCartItems([...cartItems, { ...food, quantity: 1 }])
    }

    console.log("cartItems", cartItems)
  }, [])

  const onAdd = () => {
    const exist = cartItems.find((x) => x.id === food.id)

    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      )
    } else {
      setCartItems([...cartItems, { ...food, quantity: 1 }])
    }
  }

  const onRemove = () => {
    const exist = cartItems.find((x) => x.id === food.id)

    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((x) => x.id !== food.id))
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity - 1 } : x
        )
      )
    }
  }

  //=================================================

  const onSubmit = useCallback(() => {
    console.log("selectedToppings", selectedToppings)
    const exist = cartItems.find((x) => x.id === food.id)
    setCartItems(
      cartItems.map((x) =>
        x.id === food.id
          ? { ...exist, selectedToppings, selectedExtrasNames }
          : x
      )
    )

    navigate("/")
  }, [cartItems, selectedToppings, selectedExtrasNames])

  const onCancel = useCallback(() => {
    const exist = cartItems.find((x) => x.id === food.id)
    setCartItems(
      cartItems.map((x) => (x.id === food.id ? { ...exist, quantity: 0 } : x))
    )

    navigate("/")
  }, [cartItems])

  //=================================================

  const onBackButtonClicked = useCallback(() => {
    setCartItems(cartItems.filter((x) => x.id !== food.id))

    navigate("/")
  }, [cartItems])

  useEffect(() => {
    tele.onEvent("backButtonClicked", onBackButtonClicked)

    return () => {
      tele.offEvent("backButtonClicked", onBackButtonClicked)
    }
  }, [onSubmit])

  useEffect(() => {
    tele.BackButton.show()
    //  tele.isClosingConfirmationEnabled = false
  }, [])

  //====================================================

  const toggleTopping = (title) => {
    const exist = cartItems.find((x) => x.id === food.id)

    if (exist) {
      const updatedToppings = exist.toppings.map((topping) => {
        if (topping.title === title) {
          return { ...topping, count: topping.count === 0 ? 1 : 0 }
        }
        return topping
      })

      console.log("updatedToppings", updatedToppings)

      // Update the item in the cart with the updated toppings
      const updatedCartItems = cartItems.map((item) =>
        item.id === exist.id ? { ...exist, toppings: updatedToppings } : item
      )

      // Update the cart items state
      setCartItems(updatedCartItems)
    }

    const isToppingSelected = selectedToppings.includes(title)

    if (isToppingSelected) {
      setSelectedToppings(
        selectedToppings.filter((topping) => topping !== title)
      )
    } else {
      setSelectedToppings([...selectedToppings, title])
    }
  }

  //================================================

  // Обработчики изменения выбранных опций для каждого типа

  const getTypeValue = (type) => {
    console.log("type2222 :>> ", type)
    console.log("selectedExtras type2222 :>> ", selectedExtras)
    console.log("selectedExtrasNames type2222 :>> ", selectedExtrasNames)
    console.log("cartItems type2222 :>> ", cartItems)
    // selectedExtrasNames[type] || ""
    selectedExtras[type] || ""
  }

  // const getTypeValue = (type) => selectedExtras[type] || ""

  useEffect(() => {
    function groupExtrasByType(extras) {
      if (extras.length === 0) {
        return null
      }

      const grouped = {}

      for (const extra of extras) {
        const { type_id } = extra
        const type_name = typesList.find((type) => type.id === type_id)?.type

        if (!grouped[type_name]) {
          grouped[type_name] = []
        }
        grouped[type_name].push(extra)
      }

      return grouped
    }

    if (typesList.length > 0) {
      const groupedExtras = groupExtrasByType(food.extras)

      setGroupedExtras(groupedExtras) // Обновление состояния groupedExtras
    }
  }, [typesList])

  useEffect(() => {
    console.log(
      "cartItems?.selectedExtrasNames :>> ",
      cartItems?.selectedExtrasNames
    )
    // cartItems?.selectedExtrasNames?.length > 0 &&
    setSelectedExtrasNames(cartItems?.selectedExtrasNames)
  }, [])

  // const handleExtrasChange = (type, title) => {
  //   toggleExtras(title, type) // Вызов toggleExtras с передачей типа и названия опции
  // }

  const toggleExtras = (title, type) => {
    const exist = cartItems.find((x) => x.id === food.id)

    if (exist) {
      const updatedExtras = exist.extras.map((extra) => {
        if (extra.title === title && extra.type === type) {
          return { ...extra, count: extra.count === 0 ? 1 : 0 }
        }
        return extra
      })

      // Обновление товара в корзине с обновленными дополнительными опциями
      const updatedCartItems = cartItems.map((item) =>
        item.id === exist.id ? { ...exist, extras: updatedExtras } : item
      )

      // Обновление состояния корзины
      setCartItems(updatedCartItems)
    }

    console.log("titl3232e :>> ", title)

    const selectedExtraId = title
    const selectedExtra = food.extras.find(
      (extra) => String(extra.id) === String(selectedExtraId)
    )

    console.log("selectedExtra?.title :>> ", selectedExtra?.title)
    setSelectedExtrasNames({
      ...selectedExtrasNames,
      [type]: selectedExtra?.title || "",
    })

    setSelectedExtras({
      ...selectedExtras,
      [type]: title, // В противном случае, выбрать опцию
    })
    // }
  }

  useEffect(() => {
    // Получение начального значения selectedExtrasNames из cartItems
    const exist = cartItems.find((x) => x.id === food.id)
    if (exist && exist.selectedExtrasNames) {
      setSelectedExtrasNames(exist.selectedExtrasNames)
    }
  }, [])
  return (
    <>
      {!cartItems && <LoadingOverlay />}
      <Box className="pageContainer">
        <Typography
          sx={{ p: 2, textAlign: "center", fontSize: "calc(1.5em + 2vw)" }}
        >
          {t(food.title)}
        </Typography>
        <ButtonCounter
          onAdd={onAdd}
          onRemove={onRemove}
          quantity={quantityItem}
        />
        {/* {console.log("food.image", food.image)}{" "} */}
        <Box className="orderContainer">
          <Box className="imageContainer">
            <img
              src={isPhotoUrl(food.image) ? food.image : default_dish_img}
              alt={"productImageContainer"}
            />
          </Box>

          <Box className="textContainer">
            <Box className="text1"> {t(food.description)} </Box>
          </Box>
        </Box>

        {/* extras __________________________________________ */}
        {console.log("groupedExtras :>> ", groupedExtras)}
        {groupedExtras && (
          <>
            <Typography
              sx={{
                p: 2,
                fontSize: "calc(0.7em + 2vw)",
                color: "tomato",
                fontWeight: 700,
                borderBottom: "1px solid tomato",
                width: "50%",
              }}
            >
              {t("Extras")}
            </Typography>
            {Object.entries(groupedExtras).map(([type, typeExtras]) => (
              <div key={type}>
                <Typography
                  sx={{ p: 2, fontSize: "calc(0.5em + 2vw)", fontWeight: 700 }}
                >
                  {t(type)}
                </Typography>
                <Box sx={{ pl: 4 }}>
                  <FormControl component="fieldset">
                    <RadioGroup
                      name={type}
                      value={getTypeValue(type)}
                      onChange={(e) => toggleExtras(e.target.value, type)} // Вызов handleExtrasChange при изменении значения
                    >
                      {typeExtras.map((extra) => (
                        <>
                          <FormControlLabel
                            key={extra.id}
                            value={String(extra.id)}
                            control={
                              <Radio
                                icon={
                                  <Box className={`extra-circle`}>
                                    <Avatar
                                      alt={extra.title}
                                      src={
                                        isPhotoUrl(extra.image)
                                          ? extra.image
                                          : toppings_icon
                                      }
                                      sx={{ width: 66, height: 66 }}
                                    />
                                  </Box>
                                }
                                checkedIcon={
                                  <Box className={`extra-circle selected`}>
                                    <Avatar
                                      alt={extra.title}
                                      src={
                                        isPhotoUrl(extra.image)
                                          ? extra.image
                                          : toppings_icon
                                      }
                                      sx={{ width: 66, height: 66 }}
                                    />
                                  </Box>
                                }
                                checked={
                                  selectedExtrasNames
                                    ? selectedExtrasNames[type] === extra.title
                                    : cartItems[0]?.selectedExtrasNames &&
                                      Object.entries(
                                        cartItems[0]?.selectedExtrasNames
                                      )
                                        .flat()
                                        .join(", ")
                                        .includes(extra.title)
                                }
                              />
                            }
                            label={t(extra.title)}
                          />
                        </>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Box>
              </div>
            ))}
          </>
        )}

        {/* Toppings __________________________________________ */}
        {food.toppings.length > 0 && (
          <>
            <Typography
              sx={{
                p: 2,
                fontSize: "calc(0.7em + 2vw)",
                color: "#e0c521",
                fontWeight: 700,
                borderBottom: "1px solid #e0c521",
                width: "50%",
              }}
            >
              {t("toppings")}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-around",
              }}
            >
              {food.toppings.map((topping) => (
                <Box
                  sx={{
                    width: "100px",
                    textAlign: "center",
                    margin: "10px",
                  }}
                  key={topping.title}
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleTopping(topping.title)}
                >
                  <Box
                    className={`topping-circle ${
                      selectedToppings.includes(topping.title) ? "selected" : ""
                    }`}
                  >
                    <Avatar
                      alt={topping.title}
                      src={
                        isPhotoUrl(topping.image)
                          ? topping.image
                          : toppings_icon
                      }
                      sx={{ width: 66, height: 66 }}
                    />
                  </Box>
                  <Typography sx={{ m: 1 }}>
                    {t(topping.title)}
                    {topping.price !== 0 ? ` + ₪${topping.price}` : ""}
                  </Typography>
                </Box>
              ))}
            </Box>
          </>
        )}

        {/* Buttons __________________________________________ */}
        <FlexRowContainer>
          <BigButton onClick={onCancel} backgroundColor={"grey"}>
            {t("Cancel")}
          </BigButton>

          <BigButton onClick={onSubmit} backgroundColor={"#e0c521"}>
            {t("confirm")}
          </BigButton>
        </FlexRowContainer>
      </Box>
    </>
  )
}
