import React, { useContext, useEffect } from "react";
import { fetchTrashes } from "./../actions/trashActions.js";

import { trashContext } from "../contexts/TrashContext.js";

// import timeAgo from "../utils/timeAgo.js";

import "./../styles/trashPage.css";
import BackIcon from "../svgs/BackIcon.jsx";
import TrashCard from "../components/TrashCard.jsx";

import Loading from "../components/Loading";
import OverlayPage from "./OvelayPage";

import { mediaQueryContext } from "../contexts/MediaQueryContext.jsx";
// import { uiContext } from "../contexts/UIContext.js";
function TrashPage() {
  const { state: trashState, dispatch: trashDispatch } =
    useContext(trashContext);
  const { windowWidth } = useContext(mediaQueryContext);
  // const { dispatch: uiDispatch } = useContext(uiContext);

  const trashes = trashState?.trashes;

  const getIconSize = (windowWidth) => {
    switch (true) {
      case windowWidth < 360:
        return 14;
      case windowWidth < 660:
        return 18;
      default:
        24;
    }
  };
  // console.log(trashes, "trashes");
  const handleClickBack = () => {
    // navigate("/", { replace: true });
    history.back();
  };

  useEffect(() => {
    fetchTrashes()(trashDispatch);
  }, [trashDispatch]);
  return (
    <>
      <div id="trash_page" className="page">
        <div className="wrapper">
          <div className="page_navbar">
            <button className="back_icon btn" onClick={handleClickBack}>
              <BackIcon
                width={getIconSize(windowWidth)}
                height={getIconSize(windowWidth)}
              />
            </button>
            <div className="page_name">Trashes</div>
          </div>
          <div className="message_text">
            automative delete content permanently after 1 day
          </div>
          {trashes.length ? (
            <div className="trashes_container content_container">
              {trashes.map((trash) => (
                <TrashCard key={trash._id} content={trash} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <OverlayPage>
        <Loading />
      </OverlayPage>
    </>
  );
}

export default TrashPage;
