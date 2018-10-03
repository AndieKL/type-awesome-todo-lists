
import { ACTIVE_LIST } from "../actions";

export default function(state = null,action) {
	switch(action.type) {
		case ACTIVE_LIST:
    		return action.payload;
    	default:
      		return state;
  	}
}