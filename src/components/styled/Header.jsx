import React, { useEffect, useState } from "react"
import { Button, Typography } from "@mui/material"
import { useTelegram } from "hooks/useTelegram"
import "../../App.scss"
import { US, IL, RU, FR } from "country-flag-icons/react/3x2"
import { FlexRowContainer } from "components/styled/AllHelpComponents"
import generatedGitInfo from "helpers/generatedGitInfo.json"
const { gitCommitHash, timeCommitPushed, timeUploadingToNetlify } =
  generatedGitInfo
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
const tele = window.Telegram.WebApp

export const Header = () => {
  const { user, onClose } = useTelegram()
  const { t, i18n } = useTranslation()

  const [currentLanguage, setCurrentLanguage] = useState("en")

  // useEffect(() => {
  //   tele.ready()
  // })

  useEffect(() => {
    const language_code = user?.language_code
 
    if (language_code && currentLanguage !== language_code) {
      setCurrentLanguage(language_code)
      i18n.changeLanguage(language_code)
    }
  }, [user?.language_code])

  const location = useLocation()
  const state = location?.state || []

  const WebApp = window.Telegram.WebApp

  const query_id = window.Telegram.WebApp.initDataUnsafe?.query_id
  const fullURL = window.location.href

  const changeLanguage = (language) => {
    setCurrentLanguage(language)
    i18n.changeLanguage(language)
  }

  return (
    <>
      <FlexRowContainer
        sx={{
          // alignContent: "center",
          // display: "flex",
          // flexDirection: "row",
          // alignItems: "center",
          justifyContent: "space-around",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        {/* <p>{currentLanguage}</p> */}

        <Typography
          sx={{ border: "2px solid orange", padding: "4px 8px " }}
          variant="body1"
        >
          {currentLanguage}
        </Typography>

        <Button
          variant={currentLanguage === "en" ? "contained" : "outlined"}
          onClick={() => changeLanguage("en")}
        >
          <US title="United States" className="countryFlag" />
          EN
        </Button>
        <Button
          variant={currentLanguage === "ru" ? "contained" : "outlined"}
          onClick={() => changeLanguage("ru")}
        >
          <RU title="Russian" className="countryFlag" />
          RU
        </Button>
        <Button
          variant={currentLanguage === "he" ? "contained" : "outlined"}
          onClick={() => changeLanguage("he")}
        >
          <IL title="Israel" className="countryFlag" />
          HE
        </Button>
        <Button
          variant={currentLanguage === "fr" ? "contained" : "outlined"}
          onClick={() => changeLanguage("fr")}
        >
          <FR title="France" className="countryFlag" />
          FR
        </Button>
      </FlexRowContainer>

      {/* <p className="testText">{`user?.language_code ${user?.language_code}`}</p> */}

      {/* <p className={"testText"}>
        {` initDataUnsafe - ${JSON.stringify(tele?.initDataUnsafe, null, 2)}`}{" "}
      </p>
      <p className={"testText"}>
        {` WebApp - ${JSON.stringify(WebApp, null, 2)}`}{" "}
      </p> */}

      {/* 
    
      <p className="testText">{`user?.username ${user?.username}`}</p>

      <p className={"testText"}>{` timeCommitPushed - ${timeCommitPushed}`} </p>
      <p className={"testText"}>
        {" "}
        {` timeUploadingToNetlify - ${timeUploadingToNetlify}`}{" "}
      </p>

      <p className={"testText"}> {` gitCommitHash - ${gitCommitHash}`} </p>
      <p className={"testText"}> {` query_id - ${query_id}`} </p>
      <p className="testText">{`fullURL ${fullURL}`}</p>

      <p className={"testText"}>
        {" "}
        {` state - ${JSON.stringify(state, null, 2)}`}{" "}
      </p> */}

      {/* <BigButton onClick={onClose}>Close</BigButton> */}
    </>
  )
}
