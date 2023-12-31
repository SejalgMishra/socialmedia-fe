import { EditData, POST_TYPES } from "../actions/postAction";

const initialState = {
  posts: [],
  result: 0,
  page: 2,
  loading: false,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_TYPES.CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case POST_TYPES.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case POST_TYPES.GET_POSTS:
      console.log(action.payload);
      return {
        ...state,
        posts: action.payload.posts,
        result: action.payload.result,
      };
      case POST_TYPES.UPDATE_POST:
      return {
        ...state,
        posts: EditData(state.posts , action.payload._id , action.payload)
       
      };
    default:
      return state;
  }
};

export default postReducer;
