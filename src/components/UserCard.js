import React from "react";
import Avatar from "./profile/Avatar";
import { Link, useParams } from "react-router-dom";

const UserCard = ({user , border , children}) => {

  const {id} = useParams()
  return (
    <div
      className={`d-flex p-2 align-items-center justify-content-between w-100 ${border}`}
    >

      <div>
        <Link
          to={`/profile/${id}`}
          className="d-flex align-items-center"
        >
          <Avatar src={user?.avatar}   size="h-8 w-8 rounded-full " />

          <div className="ml-1" style={{ transform: "translateY(-2px)" }}>
            <span className="d-block">{user.username}</span>

            <small style={{ opacity: 0.7 }}>{user?.fullname}</small>
          </div>
        </Link>
      </div>

      {children}
    </div>
  );
};

export default UserCard;
