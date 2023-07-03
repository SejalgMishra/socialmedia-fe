import React from 'react'
import Posts from './posts'
import Status from './status'
import { useSelector } from 'react-redux'

const HomePage = () => {
  const { homePosts } = useSelector(state => state)
  console.log(homePosts);
  return (
    <div>
      <div className='flex flex-col'>
      <Status />
      <Posts />
      </div>
       
    </div>
  )
}

export default HomePage