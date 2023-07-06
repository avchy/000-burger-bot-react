import React from "react"
import BigButton from "./BigButton"
import { useTelegram } from "../hooks/useTelegram"
import "../App.scss"

import generatedGitInfo from "../helpers/generatedGitInfo.json"
const { gitCommitHash } = generatedGitInfo

export const Header = () => {
  const { user, onClose } = useTelegram()
  
  const query_id = window.Telegram.WebApp.initDataUnsafe.query_id;

  return (
    <div className={"header"}>
      <p className={"title"}> {`gitCommitHash - ${gitCommitHash}`} </p>
      <p className={"title"}> {`query_id - ${query_id}`} </p>
      <p className={"title"}> {`window.Telegram - ${window.Telegram}`} </p>
 
      {/* <BigButton onClick={onClose}>Close</BigButton> */}
      {/* <span className={"username"}>{user?.username}</span> */}
    </div>
  )
}
