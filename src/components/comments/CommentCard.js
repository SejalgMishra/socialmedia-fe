import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../profile/Avatar";
import moment from "moment";
import LikeButton from "../LikeButton";
import { likePost, unlikePost } from "../../redux/actions/postAction";
import { useDispatch, useSelector } from "react-redux";
import InputCommnet from "../post_card/InputCommnet";

const CommentCard = ({ post, comment , children , commentId }) => {
    const [isLike, setIsLike] = useState(false);
  const [content, setContent] = useState("");
  const [readMore, setReadMore] = useState(false);
  const [onReply, setReply] = useState(false);

  const { auth } = useSelector(state => state)

  const dispatch = useDispatch()

  useEffect(() => {
    setContent(comment.content);
  }, [comment]);

  const handleLike = async () => {
    setIsLike(true);
    
  };
  const handleReply = async () => {
    if(onReply) return setReply(false)
   setReply({...comment , commentId })
    
  };

  const handleUnLike = async() => {
    setIsLike(false);
    
  };

  return (
    <div className="mt-2 m-3" >
      <Link to={`profile/${comment.user._id}`} className="flex items-center">
        <Avatar
          src={comment.user?.avatar}
          size={"h-10 w-10 rounded-full mx-2"}
        />
        <h6>{comment.user?.username}</h6>
      </Link>

      <div className="bg-[#eee] p-3 mt-1 rounded-xl ">
        <div>
          <span>
            {content?.length < 100
              ? content
              : readMore
              ? content + " "
              : content?.slice(0, 100) + "...."}
          </span>
          {content?.length > 100 && (
            <span className="readMore" onClick={() => setReadMore(!readMore)}>
              {readMore ? "Hide content" : "Read more"}
            </span>
          )}
        </div>
        <div>
        <small className="text-muted mr-3">
          {moment(comment.createdAt).fromNow()}
        </small>

        <small className="font-weight-bold mr-3">
          {comment.likes?.length} likes
        </small>
        <small className="font-weight-bold mr-3" onClick={handleReply}>
          {
            onReply ? 'cancel' : 'reply'
          }
        </small>
      </div>
      <LikeButton
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
      </div>
      {
        onReply && <InputCommnet post={post} onReply={onReply} setReply={setReply} >
            <Link>
            @{onReply.user?.username}:
            </Link>
            {children}
        </InputCommnet>
      }
      
    </div>
  );
};

export default CommentCard;
