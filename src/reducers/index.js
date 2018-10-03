import { combineReducers } from "redux";
import lists from "./reducer_list_collection";
import user from "./reducer_user";
import activeList from "./reducer_activeList";

export default combineReducers({
  lists,
  user,
  activeList
}); 