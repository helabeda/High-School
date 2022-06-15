import {
  LOADING_REGISTRE,
  GET_REGISTRE_SUCCESS,
  GET_REGISTRE_FAIL,
  PUT_ABSENCE_SUCCESS,
  PUT_ABSENCE_FAIL,
} from "../constants/profConst";
import axios from "axios";

export const getRegistre = (classe) => async (dispatch) => {
  dispatch({ type: LOADING_REGISTRE });
  try {
       const auth = {
         headers: {
           Authorization: localStorage.getItem("token"),
         },
       };
    const response = await axios.get(`/prof/eleves/${classe}`, auth);
    dispatch({ type: GET_REGISTRE_SUCCESS, payload: response.data });
    console.log(response.data)
    console.log(classe)
  } catch (error) {
    console.dir(error);
    dispatch({ type: GET_REGISTRE_FAIL, payload: error });
  }
};

export const putAbsence = (identifiant) => async (dispatch) => {
  dispatch({ type: LOADING_REGISTRE });
  try {
    const auth = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    const response = await axios.put(`/prof/eleves/${identifiant}`, auth);
    dispatch({ type: PUT_ABSENCE_SUCCESS, payload: response.data });
    console.log(response.data);
    console.log(identifiant);
  } catch (error) {
    console.dir(error);
    dispatch({ type: PUT_ABSENCE_FAIL, payload: error });
  }
};

