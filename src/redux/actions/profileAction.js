import { getDataAPI, patchDataAPI } from "../../utilis/fetchData"
import { imageUpload } from "../../utilis/imageUpload";

export const TYPES = {
    LOADING : 'LOADING',
    GET_USER : "GET_USER"
}

export const getProfileUsers = ({users , id , auth}) => async(dispatch) => {
    console.log(users);
  if(users.every(user => user._id !== id)){
    try {
       dispatch({type :TYPES.LOADING , payload : true}) 
       const res = await getDataAPI(`user/${id}` , auth.token)
       dispatch({type :TYPES.GET_USER , payload : res.data}) 

       console.log(res);
    } catch (error) {
        
    }
  }
}


export const updateProfileUser = ({userData, avatar, auth}) => async (dispatch) => {
  if(!userData.fullname)
  return dispatch({type: "NOTIFY", payload: {error: "Please add your full name."}})

  if(userData.fullname.length > 25)
  return dispatch({type: "NOTIFY", payload: {error: "Your full name too long."}})

  if(userData.story.length > 200)
  return dispatch({type: "NOTIFY", payload: {error: "Your story too long."}})

  try {
      let media;
      dispatch({type: "NOTIFY", payload: {loading: true}})

      if(avatar) media = await imageUpload([avatar])

      const res = await patchDataAPI("user", {
          ...userData,
          avatar: avatar ? media[0].url : auth.user.avatar
      }, auth.token)

      dispatch({
          type: "AUTH",
          payload: {
              ...auth,
              user: {
                  ...auth.user, ...userData,
                  avatar: avatar ? media[0].url : auth.user.avatar,
              }
          }
      })

      dispatch({type: "NOTIFY", payload: {success: res.data.msg}})
  } catch (err) {
      dispatch({
          type: "NOTIFY", 
          payload: {error: err.msg}
      })
  }
}