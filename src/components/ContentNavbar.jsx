import React from "react";
import ContentActions from "./ContentActions";
import Breadcrump from "./Breadcrump";

import "./../styles/contentNavbar.css";
function ContentNavbar({ breadcrumps }) {
  return (
    <div id="content_navbar">
      <Breadcrump breadcrumps={breadcrumps} />
      <ContentActions />
    </div>
  );
}

export default ContentNavbar;
