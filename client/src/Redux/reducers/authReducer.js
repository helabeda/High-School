import {
  LOADING_PARENT,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CURRENT_USER,
  CURRENT_FAIL,
  LOGOUT_USER,
  LOADING_PROF,
  LOADING_ADMIN,
  SIGNUP_ADMIN_SUCCESS,
  SIGNUP_ADMIN_FAIL,
  SIGNUP_PROF_SUCCESS,
  SIGNUP_PROF_FAIL,
  SIGNUP_PARENT_SUCCESS,
  SIGNUP_PARENT_FAIL,
  SIGNUP_ELEVE_SUCCESS,
  SIGNUP_ELEVE_FAIL,
} from "../constants/authConst";

const initialState = {
  loading: false,
  errors: null,
  parent: {},
  admin: {},
  prof: {},
};


export const parentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING_PARENT:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return { ...state, loading: false, parent: payload.user, errors: null };
    case LOGIN_FAIL:
      return { ...state, errors: payload, loading: false };
    case CURRENT_USER:
      return { ...state, parent: payload, loading: false, errors: null };
    case CURRENT_FAIL:
      return { ...state, errors: payload, loading: false };
    case LOGOUT_USER:
      localStorage.removeItem("token");
      return { parent: {}, errors: null, loading: false };
    default:
      return state;
  }
};

export const profReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING_PROF:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return { ...state, loading: false, prof: payload.user, errors: null };
    case LOGIN_FAIL:
      return { ...state, errors: payload, loading: false };
    case CURRENT_USER:
      return { ...state, prof: payload, loading: false, errors: null };
    case CURRENT_FAIL:
      return { ...state, errors: payload, loading: false };
    case LOGOUT_USER:
      localStorage.removeItem("token");
      return { prof: {}, errors: null, loading: false };
    default:
      return state;
  }
};

export const adminReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING_ADMIN:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      console.log("Reducer:", payload.Administration);
      return {
        ...state,
        loading: false,
        admin: payload.Administration,
        errors: null,
      };
    case LOGIN_FAIL:
      return { ...state, errors: payload, loading: false };
    case SIGNUP_ADMIN_SUCCESS:
      return { ...state, loading: false, errors: null };
    case SIGNUP_ADMIN_FAIL:
      return { ...state, errors: payload, loading: false };
    case SIGNUP_PROF_SUCCESS:
      return { ...state, loading: false, errors: null };
    case SIGNUP_PROF_FAIL:
      return { ...state, errors: payload, loading: false };
    case SIGNUP_PARENT_SUCCESS:
      return { ...state, loading: false, errors: null };
    case SIGNUP_PARENT_FAIL:
      return { ...state, errors: payload, loading: false };
    case SIGNUP_ELEVE_SUCCESS:
      return { ...state, loading: false, errors: null };
    case SIGNUP_ELEVE_FAIL:
      return { ...state, errors: payload, loading: false };
    case CURRENT_USER:
      return { ...state, admin: payload, loading: false, errors: null };
    case CURRENT_FAIL:
      return { ...state, errors: payload, loading: false };
    case LOGOUT_USER:
      localStorage.removeItem("token");
      return { admin: {}, errors: null, loading: false };
    default:
      return state;
  }
};
