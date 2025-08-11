import React from "react";
import ContentCard from "./ContentCard";
import "./../styles/contentContainer.css";

function ContentContainer({ contents }) {
  // const { directories, files } = contents;
  return (
    <div id="content_container">
      {contents.map((content) => (
        <ContentCard key={content.id || content.uploadId} content={content} />
      ))}
      {/* {directories?.length
        ? directories.map((directory) => (
            <ContentCard key={directory.id} content={directory} />
          ))
        : null}
      {files?.length
        ? files.map((file) => (
            <ContentCard key={file.uploadId} content={file} />
          ))
        : null} */}
    </div>
  );
}

export default ContentContainer;
