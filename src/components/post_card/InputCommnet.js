import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../redux/actions/commentAction";

const InputCommnet = ({ children, post , setReply , onReply }) => {
  const [content, setContent] = useState("");
  const { auth } = useSelector((state) => state);


  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
      reply : onReply && onReply.commentId,
      tag : onReply && onReply.user
    };
    console.log(newComment);
    dispatch(createComment({post , newComment , auth}))
    if(setReply) return setReply(false)
    setContent("")
  };

  return (
    <form
      className="flex items-center justify-between m-2"
      onSubmit={handleSubmit}
    >
      {children}
      <input
        placeholder="Add your comment here.."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="bg-[#f7f7f7] rounded-l-lg border-none p-3 outline-none flex-1 overflow-auto"
      />
      <button className="bg-blue-800 p-3 text-white font-bold rounded-r-lg">
        post
      </button>
    </form>
  );
};

export default InputCommnet;
