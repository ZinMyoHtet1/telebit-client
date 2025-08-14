import React, { useContext } from "react";
import "./../styles/downloads.css";

import BackIcon from "../svgs/BackIcon";
import ListView from "../components/ListView";
import DownloadItem from "../components/DownloadItem";
import { fileContext } from "../contexts/FileContext";
function Downloads() {
  //   const navigate = useNavigate();
  const { state: fileState } = useContext(fileContext);

  const uploadingContents = fileState?.uploadingContents;
  const handleClickBack = () => {
    // navigate("/", { replace: true });
    history.back();
  };
  return (
    <div id="downloads_page" className="page">
      <div className="wrapper">
        {/* <Navbar />
        <SideDrawer /> */}
        <div className="page_navbar">
          <button className="back_icon btn" onClick={handleClickBack}>
            <BackIcon />
          </button>
          <div className="page_name">Downloads</div>
        </div>
        <div className="listview_container">
          <ListView
            title="Uploading"
            contents={uploadingContents}
            Card={DownloadItem}
          />

          {/* <ListView title="Recent" contents={contents} Card={DownloadItem} /> */}
        </div>
      </div>
    </div>
  );
}

export default Downloads;
