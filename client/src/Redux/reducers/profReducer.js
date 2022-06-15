import {
  LOADING_REGISTRE,
  GET_REGISTRE_SUCCESS,
  GET_REGISTRE_FAIL,
  PUT_ABSENCE_SUCCESS,
  PUT_ABSENCE_FAIL,
} from "../constants/profConst";

const initialState = {
  loading: false,
  errors: null,
  registre: [],
};

export const profClasseReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING_REGISTRE:
      return { ...state, loading: true };
    case GET_REGISTRE_SUCCESS:
      return { ...state, loading: false, registre: payload, errors: null };
    case GET_REGISTRE_FAIL:
      return { ...state, loading: false, errors: payload };
    case PUT_ABSENCE_SUCCESS:
      return { ...state, loading: false, errors: null };
    case PUT_ABSENCE_FAIL:
      return { ...state, errors: payload, loading: false };

    default:
      return state;
  }
};
