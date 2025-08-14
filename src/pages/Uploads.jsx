import React, { useContext } from "react";
import "./../styles/uploads.css";

import BackIcon from "../svgs/BackIcon";
import ListView from "../components/ListView";
import DownloadItem from "../components/DownloadItem";
import { fileContext } from "../contexts/FileContext";
function Uploads() {
  //   const navigate = useNavigate();
  const { state: fileState } = useContext(fileContext);

  const uploadingContents = fileState?.uploadingContents;
  const uploadingFiles = uploadingContents.map((content) => content.file);
  const handleClickBack = () => {
    // navigate("/", { replace: true });
    history.back();
  };
  return (
    <div id="uploads_page" className="page">
      <div className="wrapper">
        <div className="page_navbar">
          <button className="back_icon btn" onClick={handleClickBack}>
            <BackIcon />
          </button>
          <div className="page_name">Uploads</div>
        </div>
        <div className="listview_container">
          <ListView
            title="Uploading"
            contents={uploadingFiles}
            Card={DownloadItem}
          />

          {/* <ListView title="Recent" contents={contents} Card={DownloadItem} /> */}
        </div>
      </div>
    </div>
  );
}

export default Uploads;
