import { postDataAPI } from "../../utilis/fetchData";
import { POST_TYPES } from "./postAction";

export const createComment =
  ({ post, newComment, auth }) =>
  async (dispatch) => {
console.log(post);
    const newPost = { ...post, commnets: [...post.comments, newComment] };
    console.log(newPost);
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    try {
        const data = {...newComment , postId : post._id}
        console.log(data);
        const res = await postDataAPI('cmnt' , data , auth.token)
        console.log(res);
        const newData = {...res.newComment , user : auth.user}
        const newPost = {...post , comments : [...post.commnets , newData]}
        console.log(res.newComment);
            dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    } catch (error) {
        
    }
  };
