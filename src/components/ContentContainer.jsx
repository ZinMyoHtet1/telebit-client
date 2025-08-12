import React, { useContext } from "react";
import ContentCard from "./ContentCard";
import "./../styles/contentContainer.css";
import { uiContext } from "../contexts/UIContext";

function ContentContainer({ contents }) {
  // const { directories, files } = contents;
  const { state: uiState } = useContext(uiContext);
  return (
    <div
      id="content_container"
      className={`${uiState?.viewMode === "list" ? "list" : ""}`}
    >
      {contents.map((content) => (
        <ContentCard key={content.id || content.uploadId} content={content} />
      ))}
    </div>
  );
}

export default ContentContainer;
