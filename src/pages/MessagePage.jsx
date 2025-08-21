import React, { useContext } from "react";
import { uiContext } from "../contexts/UIContext";

import "./../styles/messagePage.css";
import CloseIcon from "../svgs/CloseIcon";
function MessagePage() {
  const { state: uiState, dispatch: uiDispatch } = useContext(uiContext);

  const hidden = !uiState?.messagePage;
  const message = uiState?.message;

  const handleClose = () => {
    uiDispatch({ type: "CLOSE_MESSAGEPAGE" });
  };
  return (
    <div id="message_page" className={`overlay_page ${hidden ? "hidden" : ""}`}>
      <div className="wrapper">
        {message?.title && <div className="title">{message.title}</div>}

        <p className="message">{message?.message}</p>
        <button className="close_btn btn" onClick={handleClose}>
          close
        </button>
      </div>
    </div>
  );
}

export default MessagePage;
