import { BrowserRouter as BRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import "./App.css";
import PageRender from "./PageRender";
import Login from "./pages/login";
import Register from "./pages/register";

import Home from "./pages/Home";
import { useEffect } from "react";
import StatusModal from "./components/StatusModal";
import { getPosts } from "./redux/actions/postAction";
import Header from "./components/header/Header";
// import { refreshToken } from "./redux/actions/authAction";


function App() {

 const { auth , status } = useSelector(state => state)
 const dispatch = useDispatch()

 useEffect(() => {
  if(auth.token) return dispatch(getPosts(auth.token))
 
   
 }, [dispatch , auth.token])
 
  return (
    <BRouter>
      {" "}
      <div className="App max-w-screen-xl mx-auto">
        <div className="main">
        {auth.token && <Header />}
          <Routes>
          <Route exact path="/" Component={ Login} />
          <Route exact path="/register" Component={ Register} />

          <Route exact path="/home" Component={ Home } />

          <Route exact path="/:page" Component={PageRender} />
          <Route exact  path="/:page/:id" Component={PageRender} />
          </Routes>
        </div>
      </div>
    </BRouter>
  );
}

export default App;
