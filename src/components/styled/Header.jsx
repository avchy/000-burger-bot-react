import React, { useState } from "react"
// import BigButton from "./BigButton"
// import { StyledButton } from "components/styled/StyledButton"

import { Button } from "@mui/material"
import { useTelegram } from "hooks/useTelegram"
import "../../App.scss"

import generatedGitInfo from "helpers/generatedGitInfo.json"
const { gitCommitHash, timeCommitPushed, timeUploadingToNetlify } =
  generatedGitInfo

import { Link, useLocation, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

export const Header = () => {
  const { user, onClose } = useTelegram()

  const [currentLanguage, setCurrentLanguage] = useState("en")
  const location = useLocation()
  const state = location?.state || []

  const query_id = window.Telegram.WebApp.initDataUnsafe?.query_id
  const fullURL = window.location.href

  const webAppUser = window.Telegram.WebAppUser
  const userLang = webAppUser?.language_code
  const username = webAppUser?.username

  const { t, i18n } = useTranslation()

  const changeLanguage = (language) => {
    setCurrentLanguage(language)
    i18n.changeLanguage(language)
  }

  return (
    <div className={"header"}>
      <Button
        sx={{ mr: 1 }}
        variant={currentLanguage === "en" ? "contained" : "outlined"}
        onClick={() => changeLanguage("en")}
      >
        EN
      </Button>
      <Button
        sx={{ mr: 1 }}
        variant={currentLanguage === "ru" ? "contained" : "outlined"}
        onClick={() => changeLanguage("ru")}
      >
        RU
      </Button>
      <Button
        sx={{ mr: 1 }}
        variant={currentLanguage === "he" ? "contained" : "outlined"}
        onClick={() => changeLanguage("he")}
      >
        HE
      </Button>
      
      
      <p className={"testText"}>
        {` webAppUser - ${JSON.stringify(webAppUser, null, 2)}`}{" "}
      </p>
      <p className={"testText"}>{` userLang - ${userLang}`} </p>
      <p className={"testText"}>{` username - ${username}`} </p>
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
      </p>
      {/* <BigButton onClick={onClose}>Close</BigButton> */}
    </div>
  )
}
