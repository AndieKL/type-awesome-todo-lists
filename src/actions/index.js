import { todoListsRef } from '../config/firebase';
import firebase from 'firebase';

export const FETCH_LISTS = "fetch-lists";
export const GET_USER = "get-user";


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
export const addList = (uid,newList,name) => async dispatch => {
  todoListsRef.child(uid).child(name).set({...newList});
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


export const getUser = () => dispatch => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: GET_USER,
        payload: user
      });
    }
    else {
      dispatch({
        type: GET_USER,
        payload: null
      });
    }
  });
};


export const signIn = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebase.auth().signInWithPopup(authProvider);
};

export const signOut = () => firebase.auth().signOut();