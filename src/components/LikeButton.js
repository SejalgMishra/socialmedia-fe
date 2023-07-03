import React from 'react'
import { AiOutlineHeart } from "react-icons/ai"
import { FcLike } from "react-icons/fc"

const LikeButton = ({isLike, handleLike, handleUnLike}) => {

    return (
        <>
            {
                isLike
                ? <FcLike className="h-10 w-10 "  onClick={handleUnLike}
                />
                : <AiOutlineHeart className="h-10 w-10" onClick={handleLike} />
            }
        </>
    )
}

export default LikeButton