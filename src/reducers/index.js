import { combineReducers } from "redux";
import lists from "./reducer_list_collection";
import user from "./reducer_user";

export default combineReducers({
  lists,
  user
}); 