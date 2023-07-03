import React, { useState } from "react";
import Avatar from "../profile/Avatar";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import { FiMoreHorizontal, FiEdit2, FiDelete } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

const CardHeader = ({ post }) => {
  const [open, setOpen] = useState(false);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleEdit = () => {
    dispatch({ type: "STATUS", payload: { ...post, onEdit: true } });
  };

  return (
    <div className="card_header flex justify-between px-3 py-2">
      <div className="card_header__title flex gap-2 ">
        <Avatar src={post.user.avatar} size={"h-12 w-12 rounded-full"} />

        <div className="card_name flex flex-col">
          <h6 className="m-0">
            {" "}
            <Link
              to={`/profile/${post.user._id}`}
              className="text-dark text-lg font-bold"
            >
              {post.user.username}
            </Link>
          </h6>
          <small className="text-muted">
            {moment(post.createdAt).fromNow()}
          </small>
        </div>
      </div>
      <div className="nav-item dropdown  ">
        <FiMoreHorizontal onClick={handleOpen} className="font-bold text-2xl" />

        {open && (
          <div className=" absolute bg-white shadow-md border rounded-lg right-0 z-10">
            <Link
              className="dropdown-item flex items-center gap-2 font-bold"
              onClick={handleEdit}
            >
              <FiEdit2 /> <span>Edit</span>
            </Link>

            <div className="dropdown-divider"></div>
            <Link
              className="dropdown-item flex items-center gap-2 font-bold"
              to="/"
            >
              <FiDelete /> <span>Delete</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardHeader;
