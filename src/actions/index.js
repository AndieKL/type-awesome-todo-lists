import { todoListsRef } from '../config/firebase';

export const FETCH_LISTS = "fetch-lists";


//collect all to-do lists from database
export const fetchToDos = () => async dispatch => {
  todoListsRef.on("value", snapshot => {
    dispatch({
      type: FETCH_LISTS,
      payload: snapshot.val()
    });
  });
};

//add a new list or replace ('edit') an existing list
export const addList = (newList,name) => async dispatch => {
  todoListsRef.child(name).set({...newList});
};

//delete an existing list
export const removeList = name => async dispatch => {
  todoListsRef.child(name).remove();
};

//replace an existing list ('edit' it)
export const editList = (editedList,name) => async dispatch => {
	todoListsRef.child(name).set({...editedList});
};

//direct access to the boolean that controls the strikethrough effect for list items
export const toggleComplete = (itemPath, complete) => async dispatch => {
	todoListsRef.child(itemPath).set(complete);
};