import React, { useContext } from "react";

import "./../styles/errorMessage.css";
import { directoryContext } from "../contexts/DirectoryContext";
import { fileContext } from "../contexts/FileContext";
function ErrorMessage() {
  const { state: directoryState } = useContext(directoryContext);
  const { state: fileState } = useContext(fileContext);
  const message = directoryState?.errorMessage || fileState?.errorMessage;
  if (!message) return null;
  return <div className={`error_message`}>{message}</div>;
}

export default ErrorMessage;
