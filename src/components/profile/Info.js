import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "./Avatar";
import { getProfileUsers } from "../../redux/actions/profileAction";
import EditProfile from "./EditProfile";
import FollowBtn from "../FollowBtn";

const Info = () => {
  const { auth, profile } = useSelector((state) => state);
  console.log(profile, "profile");
  const { id } = useParams();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState([]);
  const [onEdit, setOnEdit] = useState(false);

  useEffect(() => {
    console.log(getProfileUsers({ id, auth }));
    if (id !== auth.user._id) {
      dispatch(getProfileUsers({ users: profile.users, id, auth }));
      const newData = profile.users.filter((x) => x._id == id);
      setUserData(newData);
      console.log(profile);
    } else {
      setUserData([auth.user]);
    }
  }, [id, profile.users, auth, dispatch]);

  return (
    <div className="w-full p-10 pt-24">
      {userData?.map((user) => (
        <div
          className="info_container flex justify-center gap-10 items-center flex-wrap"
          key={user._id}
        >
          <Avatar src={user.avatar} size={"h-52 w-52 rounded-full"} />
          <div className="info_content flex flex-col ">
            <div className="info_content_title flex justify-between">
              <h2 className="text-2xl font-bold ">{user.username}</h2>
              {
                user._id === auth.user._id ?<button
                className="p-2 bg-blue-700 rounded-lg text-white"
                onClick={() => setOnEdit(true)}
              >
                Edit Profile
              </button>
                : <FollowBtn />
              }
              
              
            </div>
            { onEdit && <EditProfile setOnEdit={setOnEdit}  />}
            <div> <span className="text-sm"> {user.followers.length} Followers</span>
            <span className="text-sm"> {user.following.length} Following</span></div>
           
            <h6 className="text-lg capitalize font-semibold">
              {" "}
              {user.fullname}
            </h6>
            <p>{user.address}</p>
            <h6 className="text-md font-serif">{user.email}</h6>
            <p className="text-lg font-light">{user.story}</p>
            <h6 className="text-sm font-serif">{user.gender}</h6>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Info;
