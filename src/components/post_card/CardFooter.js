import React, { useState ,useEffect } from "react";
import {
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineSend,
} from "react-icons/ai";
import { BiBookmark } from "react-icons/bi";
import LikeButton from "../LikeButton";
import { useDispatch, useSelector } from "react-redux";
import { likePost, unlikePost } from "../../redux/actions/postAction";


const CardFooter = ({ post }) => {
  const [isLike, setIsLike] = useState(false);
  const [isLoadLike, setIsLoadLike] = useState(false);
 
  const { auth } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    if(post.likes.find(like => like._id === auth.user._id)){
      setIsLike(true)
    }
    console.log(post.commnets , "post");
  
    
  }, [post.likes ,auth.user._id])
  

  const handleLike = async () => {
    if (isLoadLike) return;
    setIsLoadLike(true);
    setIsLike(true);
    await dispatch(likePost({post , auth}))
    setIsLoadLike(false)
  };

  const handleUnLike = async() => {
    if (isLoadLike) return;
    setIsLoadLike(true);
    setIsLike(false);
    await dispatch(unlikePost({post , auth}))
    setIsLoadLike(false)
  };

  return (
    <div className="card_footer">
      <div className=" flex justify-between">
        <div className="flex m-2 gap-2">
          <LikeButton
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
          <AiOutlineComment className="h-10 w-10 cursor-pointer" />
          <AiOutlineSend className="h-10 w-10 cursor-pointer" />
        </div>
        <BiBookmark className="h-10 w-10" />
      </div>
      <div className="flex justify-between mx-3 my-1">
        <h6 className="cursor-pointer">{post.likes.length} Likes</h6>
         <h6 className="cursor-pointer">{post.commnets?.length} Comments</h6> 
      </div>
    </div>
  );
};

export default CardFooter;
