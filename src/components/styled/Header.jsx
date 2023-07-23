import React from "react"
import BigButton from "./BigButton"
import { useTelegram } from "hooks/useTelegram"
import "../../App.scss"

import generatedGitInfo from "helpers/generatedGitInfo.json"
const { gitCommitHash, timeCommitPushed, timeUploadingToNetlify } =
  generatedGitInfo

import { Link, useLocation, useNavigate } from "react-router-dom"

export const Header = () => {
  const { user, onClose } = useTelegram()

  const location = useLocation()
  const state = location?.state || []

  const query_id = window.Telegram.WebApp.initDataUnsafe?.query_id
  const fullURL = window.location.href

  const webAppUser = window.Telegram.WebAppUser
  const userLang = window.Telegram.WebAppUser.language_code
  const username = window.Telegram.WebAppUser.username

  return (
    <div className={"header"}>
      <p className={"testText"}>{` userLang - ${userLang}`} </p>
      <p className={"testText"}>{` username - ${username}`} </p>

      <p className={"testText"}>{` timeCommitPushed - ${timeCommitPushed}`} </p>
      <p className={"testText"}>
        {" "}
        {` timeUploadingToNetlify - ${timeUploadingToNetlify}`}{" "}
      </p>

      <p className={"testText"}> {` gitCommitHash - ${gitCommitHash}`} </p>
      <p className={"testText"}> {` query_id - ${query_id}`} </p>
      <p className="testText">{`fullURL ${fullURL}`}</p>
      <p className="testText">{`user?.username ${user?.username}`}</p>

      <p className={"testText"}>
        {" "}
        {` state - ${JSON.stringify(state, null, 2)}`}{" "}
      </p>
      {/* <BigButton onClick={onClose}>Close</BigButton> */}
    </div>
  )
}
