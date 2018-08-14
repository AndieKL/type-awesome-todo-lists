import { todoListsRef } from '../config/firebase';

export const FETCH_LISTS = "fetch-lists";

export const fetchToDos = () => async dispatch => {
  todoListsRef.on("value", snapshot => {
    dispatch({
      type: FETCH_LISTS,
      payload: snapshot.val()
    });
  });
};


export const addList = newList => async dispatch => {
  todoListsRef.push().set(newList);
};

export const removeList = listId => async dispatch => {
  todoListsRef.child(listId).remove();
};

export const editList = editedList => async dispatch => {
	//need to look for an edit/replace option
	todoListsRef.push().set(editedList);
}

