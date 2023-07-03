import React from "react";
import { useSelector } from "react-redux";
import CardBody from "../post_card/CardBody";
import CardHeader from "../post_card/CardHeader";
import CardFooter from "../post_card/CardFooter";
import InputCommnet from "../post_card/InputCommnet";
import Commnets from "../post_card/Commnets";

const Posts = () => {
  const { homePosts } = useSelector(state => state);
  console.log(homePosts.posts);
  return (
    
    <div>
      { homePosts.posts.map((posts , index) => (
        <div key={posts._id} className="border m-2">
         
          <CardHeader post={posts} />
          <CardBody post={posts}  />
          <CardFooter post={posts} />

          <Commnets post={posts} />
          <InputCommnet post={posts} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
