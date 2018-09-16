import { GET_USER } from "../actions";

export default function(state = false, action) {
  switch (action.type) {
    case GET_USER:
    	return action.payload || null;
    default:
      return state;
  }
} 