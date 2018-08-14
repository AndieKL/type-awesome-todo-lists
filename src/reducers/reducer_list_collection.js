import { FETCH_LISTS } from "../actions";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_LISTS:
    	return action.payload;
    default:
      return state;
  }
}