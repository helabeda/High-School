import {
  LOADING_REGISTRE,
  GET_REGISTRE_SUCCESS,
  GET_REGISTRE_FAIL,
} from "../constants/parentsConst";

const initialState = {
  loading: false,
  errors: null,
  registre: {},
};

export const parentEleveReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING_REGISTRE:
      return { ...state, loading: true };
    case GET_REGISTRE_SUCCESS:
      return { ...state, loading: false, registre: payload, errors: null };
    case GET_REGISTRE_FAIL:
      return { ...state, loading: false, errors: payload };

    default:
      return state;
  }
};
