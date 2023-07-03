import React from 'react'
import Header from '../components/header/Header'
import HomePage from '../components/home/home'
import { useDispatch, useSelector } from 'react-redux'
import StatusModal from "../components/StatusModal";


const Home = () => {
  const { auth , status } = useSelector(state => state)
 const dispatch = useDispatch()
  return (
    <div>
        
        {status && <StatusModal />}
        <HomePage />
    </div>
  )
}

export default Home