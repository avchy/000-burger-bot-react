import React, { useEffect, useState } from "react"
import { Button, Typography, MenuItem, Select, Box } from "@mui/material"
import { useTelegram } from "hooks/useTelegram"
import "App.scss"
import { FlexRowContainer } from "components/AllHelpComponents"
import generatedGitInfo from "helpers/generatedGitInfo.json"
import { useTranslation } from "react-i18next"
import axios from "axios"
import { serverIP, port } from "constants/api"
import { tableData } from "constants/constants"
import { languageButtons } from "../constants/languageButtons"
import { useTheme } from "@mui/material/styles"
import { useLocation } from "react-router-dom"
import queryString from "query-string"
import { StyledButton } from "components/StyledButton"
import waiterImg from "images/waiter.png"

export const Header = () => {
  const location = useLocation()
  const query = queryString.parse(location.search)
  console.log("query", query)
  console.log("query.restaurant_name", query.restaurant_name)

  const { gitCommitHash, timeCommitPushed, timeUploadingToNetlify } =
    generatedGitInfo

  const theme = useTheme()
  const tele = window.Telegram.WebApp

  const { user, queryId, onClose } = useTelegram()
  const { t, i18n } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState("en")
  const [isTestTextVisible, setTestTextVisible] = useState(false)
  const [tableNumber, setTableNumber] = useState("")
  const [restaurant_name, setRestaurant_name] = useState("")
  const [formOpenSendWaiter, setFormOpenSendWaiter] = useState(false)

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)

    console.log("window.location.search :>> ", window.location.search)
    console.log("searchParams :>> ", searchParams)

    const restaurant_name = searchParams.get("restaurant_name")
    setRestaurant_name(restaurant_name)
  }, [])

  const handleTableNumberChange = (event) => {
    setTableNumber(event.target.value)
  }

  const toggleTestText = () => {
    setTestTextVisible(!isTestTextVisible)
  }
  useEffect(() => {
    const language_code = user?.language_code
    if (language_code && currentLanguage !== language_code) {
      setCurrentLanguage(language_code)
      i18n.changeLanguage(language_code)
    }
  }, [user?.language_code])

  const changeLanguage = (language) => {
    setCurrentLanguage(language)
    i18n.changeLanguage(language)
  }

  async function onSendWaiter() {
    const dataPay = {
      queryId: "0",
      cartItems: [],
      comment: "Send Waiter",
      totalPrice: "-",
      paymentMethod: "-",

      address: `tableNumber: ${tableNumber}`,
      optionDelivery: "Send Waiter",

      user_id: user?.id || 0,
      user_name: user?.username || "",
    }

    try {
      const response = await axios.post(serverIP + "/create_order_db", dataPay)
      console.log('Запрос "onSendWaiter" успешно выполнен')
    } catch (error) {
      console.error('Ошибка при выполнении запроса "onSendWaiter":', error)
      return
    } finally {
      setFormOpenSendWaiter(false)
    }
  }

  const onOpenSendWaiter = () => {
    setFormOpenSendWaiter(formOpenSendWaiter ? false : true)
  }

  return (
    <>
      <FlexRowContainer sx={{ justifyContent: "space-between" }}>
        <Select
          value={currentLanguage}
          onChange={(event) => changeLanguage(event.target.value)}
          sx={{
            border: "2px solid orange",
            backgroundColor: theme.blue,
            width: "150px",
            marginBottom: "10px",
          }}
        >
          {languageButtons.map((button) => (
            <MenuItem
              key={button.code}
              value={button.code}
              sx={{ height: "100px" }}
            >
              <FlexRowContainer>
                <Box>{button.flag} </Box>

                <Box>{button.label}</Box>
              </FlexRowContainer>
            </MenuItem>
          ))}
        </Select>

        <StyledButton onClick={onOpenSendWaiter} variant="contained">
          {t("Call the waiter")}
          <div className="imageContainer">
            <img
              loading="lazy"
              src={waiterImg}
              alt={"waiterImg"}
              width="50"
              height="50"
            />
          </div>
        </StyledButton>
        {formOpenSendWaiter && (
          <Box sx={{ padding: "10px 20px ", backgroundColor: theme.blue }}>
            <Select
              value={tableNumber}
              onChange={handleTableNumberChange}
              sx={{ width: "150px", marginBottom: "10px" }}
            >
              {tableData.map((table) => (
                <MenuItem key={table.value} value={table.value}>
                  {table.label}
                </MenuItem>
              ))}
            </Select>
            <Button
              variant="contained"
              sx={{ width: "150px", color: "black", height: "100%" }}
              onClick={onSendWaiter}
              disabled={!tableNumber}
            >
              call the waiter{" "}
            </Button>
          </Box>
        )}
      </FlexRowContainer>

      <Button
        sx={{
          width: "100%",
          color: "black",
          height: "30px",
          border: "1px solid black",
        }}
        onClick={toggleTestText}
      ></Button>

      {isTestTextVisible && (
        <>
          <p className={"testText"}>
            {`initDataUnsafe - ${query.restaurant_name}`}{" "}
          </p>

          <p className={"testText"}>
            {`timeCommitPushed - ${timeCommitPushed}`}{" "}
          </p>

          <p
            className={"testText"}
          >{`timeUploadNetlify - ${timeUploadingToNetlify}`}</p>

          <p className={"testText"}>{`gitCommitHash - ${gitCommitHash}`}</p>

          <p className={"testText"}>{`queryId - ${queryId}`}</p>
        </>
      )}
    </>
  )
}
