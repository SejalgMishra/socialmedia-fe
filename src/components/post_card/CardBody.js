import React, { useState } from "react";
import Carousel from "../Carousel";

const CardBody = ({ post }) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <div className="card_body p-2 ">
      <div className="card_content  flex mx-auto mb-2">
        <p className="flex" >
          {post.content.length < 60
            ? post.content
            : readMore
            ? post.content + ""
            : post.content.slice(0, 60)}
        </p>
        {
          post.content.length > 60  && <span className="readMore text-red-500" onClick={() => setReadMore(!readMore)}>
            {readMore ? '...Hide Content' : '...Read More'}
          </span>
        }
      </div>
      {post.images.length > 0 && (
        <Carousel images={post.images} id={post._id} />
      )}
    </div>
  );
};

export default CardBody;
