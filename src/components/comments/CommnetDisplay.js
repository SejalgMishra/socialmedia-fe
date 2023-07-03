import React from 'react'
import CommentCard from './CommentCard'

const CommnetDisplay = ({post , comment}) => {
  return (
    <div>
        <CommentCard comment={comment} post={post}  />
    </div>
  )
}

export default CommnetDisplay