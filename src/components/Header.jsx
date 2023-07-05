import React from "react"
import BigButton from "./BigButton"
import { useTelegram } from "../hooks/useTelegram"
import "../App.scss"

import generatedGitInfo from "../helpers/generatedGitInfo.json"
const { gitCommitHash } = generatedGitInfo

export const Header = () => {
  const { user, onClose } = useTelegram()

  return (
    <div className={"header"}>
      <span className={"title"}> {`Telegram Web App - ${gitCommitHash}`} </span>

      {/* <BigButton onClick={onClose}>Close</BigButton> */}
      {/* <span className={"username"}>{user?.username}</span> */}
    </div>
  )
}
