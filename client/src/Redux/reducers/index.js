import { combineReducers } from "redux";
import { parentReducer, profReducer ,adminReducer} from "../reducers/authReducer";
import { profClasseReducer} from "../reducers/profReducer";
import {parentEleveReducer} from "../reducers/parentReducer"
export const rootReducer = combineReducers({
  parentReducer,
  profReducer,
  adminReducer,
  profClasseReducer,
  parentEleveReducer,
});
 