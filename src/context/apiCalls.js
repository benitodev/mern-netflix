import axios from "axios";

import { loginStart, loginSuccess, loginFailure } from "./AuthActions";

const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "https://immense-chamber-40390.herokuapp.com/api/login",
      user
    );
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};
export default login;
