import {
  LOADING_REGISTRE,
  GET_REGISTRE_SUCCESS,
  GET_REGISTRE_FAIL,
} from "../constants/parentsConst";
import axios from "axios";

export const getParentRegistre = (identifiant) => async (dispatch) => {
  dispatch({ type: LOADING_REGISTRE });
  try {
    const auth = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    const response = await axios.get(`/parent/registre/${identifiant}`,auth);
    dispatch({ type: GET_REGISTRE_SUCCESS, payload: response.data });
  } catch (error) {
    console.dir(error);
    dispatch({ type: GET_REGISTRE_FAIL, payload: error });
  }
};
