import React, { useEffect, useState } from "react";

import "../styles/userStatus.css";
import ProfileIcon from "../svgs/ProfileIcon";

function UserStatus() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("user")) || null);
  }, []);
  return (
    <div id="user_status">
      <div className="profile_picture">
        {user?.profilePicture ? (
          <img src={user.profilePicture} alt="profile_picture" />
        ) : (
          <ProfileIcon width={24} height={24} />
        )}
      </div>
      <div className="email">{user?.email}</div>
    </div>
  );
}

export default UserStatus;
