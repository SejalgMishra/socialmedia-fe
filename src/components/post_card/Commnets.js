import React from 'react'
import CommnetDisplay from '../comments/CommnetDisplay'

const Commnets = ({post}) => {
  return (
    <div>

      {
        post.commnets?.map(comment => (
          <div>
            <CommnetDisplay key={comment._id} comment={comment} post={post} />
            </div>
        ))
      }
      
    </div>
  )
}

export default Commnets