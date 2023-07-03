import { postDataAPI } from "../../utilis/fetchData";
import valid from "../../utilis/valid";

export const TYPES = {
  AUTH: "AUTH",
};

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    const res = await postDataAPI("login", data);
    console.log(res);
    dispatch({
      type: "AUTH",
      payload: { token: res.access_token, user: res.user },
    });
    localStorage.setItem("firstlogin", true);
    dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  } catch (error) {
    console.log(error.message);
  }
};

// export const refreshToken = (data) => async (dispatch) => {
//   const firstlogin = localStorage.getItem("firstlogin");
//   if (firstlogin) {
//     dispatch({ type: "NOTIFY", payload: { loading: true } });
//   }
//   try {
//     const res = await postDataAPI("refresh_token", data);
//     dispatch({
//       type: "AUTH",
//       payload: { token: res.access_token, user: res.user },
//     });
//   } catch (error) {
//     dispatch({ type: "NOTIFY", payload: { err: error.response } });
//   }
// };

export const register = (data) => async (dispatch) => {
  const check = valid(data);
  console.log(check);
  if (check.errLength > 0)
    return dispatch({ type: "NOTIFY", payload: check.errMsg });
  try {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    const res = await postDataAPI("", data);
    console.log(res);
    dispatch({
      type: "AUTH",
      payload: { token: res.access_token, user: res.user },
    });
    localStorage.setItem("firstlogin", true);
    dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  } catch (error) {
    console.log(error.message);
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("firstLogin");
    await postDataAPI("logout");
    window.location.href = "/";
  } catch (err) {
    dispatch({
      type: "NOTIFY",
      payload: {
        error: err.message,
      },
    });
  }
};
