import axios from "axios";
import {
  LOADING_PARENT,
  LOADING_PROF,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CURRENT_USER,
  CURRENT_FAIL,
  LOGOUT_USER,
  LOADING_ADMIN,
  SIGNUP_ADMIN_SUCCESS,
  SIGNUP_ADMIN_FAIL,
  SIGNUP_PROF_FAIL,
  SIGNUP_PROF_SUCCESS,
  SIGNUP_PARENT_SUCCESS,
  SIGNUP_PARENT_FAIL,
  SIGNUP_ELEVE_SUCCESS,
  SIGNUP_ELEVE_FAIL,
} from "../constants/authConst";


export const loginAdmin = (infoAdmin, history) => async (dispatch) => {
  dispatch({ type: LOADING_ADMIN });
  try {
    const response = await axios.post("/admin/loginadmin", infoAdmin);
    console.log(response.data.Administration)
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    history.push("/dashboard");
  } catch (error) {
    console.log(error);
    dispatch({ type: LOGIN_FAIL, payload: error });
  }
};

export const loginProf = (infoProf, history) => async (dispatch) => {
  dispatch({ type: LOADING_PROF });
  try {
    const response = await axios.post("/prof/loginProf", infoProf);
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    history.push("/dashboard");
  } catch (error) {
    console.log(error);
    dispatch({ type: LOGIN_FAIL, payload: error });
  }
};

export const loginParent = (infoParent, history) => async (dispatch) => {
  dispatch({ type: LOADING_PARENT });
  try {
    const response = await axios.post("/parent/loginParents", infoParent);
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    history.push("/dashboard");
  } catch (error) {
    console.log(error);
    dispatch({ type: LOGIN_FAIL, payload: error });
  }
};

//GET CURRENT USER

export const currentAdmin = () => async (dispatch) => {
  dispatch({ type: LOADING_ADMIN });
  try {
    const opts = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    const response = await axios.get("/admin/currentUser", opts);
    console.log("ACTION:",response.data)
    dispatch({ type: CURRENT_USER, payload: response.data.user });
  } catch (error) {
    console.dir(error);
    dispatch({ type: CURRENT_FAIL, payload: error });
  }
};

export const currentProf = () => async (dispatch) => {
  dispatch({ type: LOADING_PROF });
  try {
    const opts = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    const response = await axios.get("/prof/currentUser", opts);
    dispatch({ type: CURRENT_USER, payload: response.data.user });
  } catch (error) {
    console.dir(error);
    dispatch({ type: CURRENT_FAIL, payload: error });
  }
};

export const currentParent = () => async (dispatch) => {
  dispatch({ type: LOADING_PARENT });
  try {
    const opts = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    const response = await axios.get("/parent/currentUser", opts);
    dispatch({ type: CURRENT_USER, payload: response.data.user });
  } catch (error) {
    console.dir(error);
    dispatch({ type: CURRENT_FAIL, payload: error });
  }
};

export const signUpAdmin = (newAdmin, history) => async (dispatch) => {
  dispatch({ type: LOADING_ADMIN });
  try {
    const auth = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    const response = await axios.post("/admin/adminsignup", newAdmin, auth);
    dispatch({ type: SIGNUP_ADMIN_SUCCESS, payload: response.data });
    history.push(`/dashboard`);
  } catch (error) {
    console.dir(error);
    dispatch({ type: SIGNUP_ADMIN_FAIL, payload: error });
  }
};

export const signUpProf = (newProf, history) => async (dispatch) => {
  dispatch({ type: LOADING_ADMIN });
  try {
    const auth = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    const response = await axios.post(`/admin/profsignup`, newProf, auth);
    dispatch({ type: SIGNUP_PROF_SUCCESS, payload: response.data });
    history.push(`/dashboard`);
  } catch (error) {
    console.dir(error);
    dispatch({ type: SIGNUP_PROF_FAIL, payload: error });
  }
};

export const signUpParent = (newParent, history) => async (dispatch) => {
  dispatch({ type: LOADING_ADMIN });
  try {
    const auth = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    const response = await axios.post(`/admin/parentsignup`, newParent, auth);
    dispatch({ type: SIGNUP_PARENT_SUCCESS, payload: response.data });
    history.push(`/dashboard`);
  } catch (error) {
    console.dir(error);
    dispatch({ type: SIGNUP_PARENT_FAIL, payload: error });
  }
};


export const signUpEleve = (newEleve, history) => async (dispatch) => {
  dispatch({ type: LOADING_ADMIN });
  try {
    const auth = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    const response = await axios.post(`/admin/elevessignup`, newEleve, auth);
    dispatch({ type: SIGNUP_ELEVE_SUCCESS, payload: response.data });
    history.push(`/dashboard`);
  } catch (error) {
    console.dir(error);
    dispatch({ type: SIGNUP_ELEVE_FAIL, payload: error });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT_USER });
};