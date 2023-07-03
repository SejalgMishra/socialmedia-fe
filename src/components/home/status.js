import React from "react";
import Avatar from "../profile/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { TYPES } from "../../redux/actions/statusAction";

const Status = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div className="flex mt-32 shadow-lg p-2 rounded-lg max-w-lg gap-4">
      <Avatar src={auth.user?.avatar} size={"h-16 w-16 rounded-full"} />
      <button
        className="text-xl font-serif bg-[#f1f1f1] px-4 rounded-full"
        onClick={() => dispatch({ type: TYPES.STATUS, payload: true })}
      >
        {auth.user?.username}, what are you thinking?
      </button>
    </div>
  );
};

export default Status;
