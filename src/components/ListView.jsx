import React from "react";

import "./../styles/listView.css";
// eslint-disable-next-line no-unused-vars
function ListView({ title = "No title", contents = [], Card }) {
  return (
    <div className="list_view">
      <div className="list_title">{title}</div>
      <div className="content_container">
        {contents.length > 0 ? (
          contents.map((item, index) => (
            <Card
              key={item?.uploadId ?? index}
              content={item}
              state="pending"
            />
          ))
        ) : (
          <div className="message">no item</div>
        )}
      </div>
    </div>
  );
}

export default ListView;
