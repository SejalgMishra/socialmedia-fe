import { getDataAPI, patchDataAPI, postDataAPI } from "../../utilis/fetchData";
import { imageUpload } from "../../utilis/imageUpload";

export const POST_TYPES = {
  CREATE_POST: "CREATE_POST",
  LOADING: "LOADING",
  GET_POSTS: "GET_POSTS",
  UPDATE_POST: "UPDATE_POST",
};

export const EditData = (data, id, post) => {
  const newData = data.map((item) => (item._id === id ? post : item));
  return newData;
};

export const DeleteData = (data, id) => {
  const newData = data.filter((item) => item._id !== id);
  return newData;
};

export const createPost =
  ({ content, auth, images }) =>
  async (dispatch) => {
    try {
      let media = [];
      if (images.length > 0) media = await imageUpload(images);
      const res = await postDataAPI(
        "post",
        { content, images: media },
        auth.token
      );
      dispatch({ type: POST_TYPES.CREATE_POST, payload: res.newPosts });
      console.log(res.newPosts);
    } catch (error) {
      console.log(error);
    }
  };

export const getPosts = (token) => async (dispatch) => {
  try {
    const res = await getDataAPI("post", token);
    console.log(res, "jhjg");
    dispatch({ type: POST_TYPES.GET_POSTS, payload: res });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost =
  ({ content, auth, images, status }) =>
  async (dispatch) => {
    try {
      let media = [];
      const imgOldUrl = images.filter((img) => img.url);
      const imgNewUrl = images.filter((img) => !img.url);

      console.log({ imgOldUrl, imgNewUrl });

      //   if(status.content === content && imgNewUrl.length === 0 && imgOldUrl.length === status.images.length){
      //     return

      //   }

      if (imgNewUrl.length > 0) media = await imageUpload(imgNewUrl);
      const res = await patchDataAPI(
        `post/${status._id}`,
        { content, images: [...imgOldUrl, ...media] },
        auth.token
      );
      console.log(res, "ghtrhtrhuy");
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: res.new });
      console.log(res.new, "gftryhtr");
    } catch (error) {
      console.log(error);
    }
  };

export const likePost =
  ({ post, auth }) =>
  async (dispatch) => {
    console.log(post);
    const newPost = { ...post, likes: [...post.likes, auth.user] };
    console.log({ newPost });
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    try {
      await patchDataAPI(`post/${post._id}/like`, null, auth.token);
    } catch (error) {
      console.log(error);
    }
  };

  export const unlikePost =
  ({ post, auth }) =>
  async (dispatch) => {
    console.log(post);
    const newPost = { ...post, likes:post.likes.filter(like => like._id !== auth.user._id) };
    console.log({ newPost });
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    try {
      await patchDataAPI(`post/${post._id}/unlike`, null, auth.token);
    } catch (error) {
      console.log(error);
    }
  };