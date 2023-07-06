import React from "react"
import BigButton from "./BigButton"
import { useTelegram } from "../hooks/useTelegram"
import "../App.scss"

import generatedGitInfo from "../helpers/generatedGitInfo.json"
const { gitCommitHash, gitTimestampDate, gitTimestamp } = generatedGitInfo

export const Header = () => {
  const { user, onClose } = useTelegram()

  const query_id = window.Telegram.WebApp.initDataUnsafe.query_id

  return (
    <div className={"header"}>
            <p className={"testText"}> {`   gitTimestamp - ${gitTimestamp}`} </p>

      <p className={"testText"}> {`   gitTimestampDate - ${gitTimestampDate}`} </p>
      <p className={"testText"}> {`   gitCommitHash - ${gitCommitHash}`} </p>
      <p className={"testText"}> {`   query_id - ${query_id}`} </p>

      {/* <BigButton onClick={onClose}>Close</BigButton> */}
      {/* <span className={"username"}>{user?.username}</span> */}
    </div>
  )
}
