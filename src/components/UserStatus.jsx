import React, { useContext, useEffect, useState } from "react";

import "../styles/userStatus.css";
import ProfileIcon from "../svgs/ProfileIcon";
import { mediaQueryContext } from "../contexts/MediaQueryContext";

function UserStatus() {
  const [user, setUser] = useState(null);
  const { windowWidth } = useContext(mediaQueryContext);

  const getIconSize = (windowWidth) => {
    switch (true) {
      case windowWidth < 360:
        return 12;
      case windowWidth < 560:
        return 16;
      case windowWidth > 560:
        return 18;
      default:
        24;
    }
  };

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("user")) || null);
  }, []);
  return (
    <div id="user_status">
      <div className="profile_picture">
        {user?.profilePicture ? (
          <img src={user.profilePicture} alt="profile_picture" />
        ) : (
          <ProfileIcon
            width={getIconSize(windowWidth)}
            height={getIconSize(windowWidth)}
          />
        )}
      </div>
      <div className="email">{user?.email}</div>
    </div>
  );
}

export default UserStatus;
