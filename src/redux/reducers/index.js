import { combineReducers } from "redux"
import auth from "./authReducers"
import notify from "./notifyReducers"
import profile from "./profileReducer"
import status from "./statusReducer"
import homePosts from "./postReducers"





export default combineReducers({
  auth,
  notify,
  profile,
  status,
  homePosts
})