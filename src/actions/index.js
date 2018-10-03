import { todoListsRef } from '../config/firebase'; 
import firebase from 'firebase';

export const FETCH_LISTS = "fetch-lists";
export const GET_USER = "get-user";
export const ACTIVE_LIST = "active-list";

//collect all to-do lists from database
export const fetchToDos = (uid) => async dispatch => {
  todoListsRef.child(uid).on("value", snapshot => {
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
export const removeList = (uid,name) => async dispatch => {
  todoListsRef.child(uid).child(name).remove();
};

//replace an existing list ('edit' it)
export const editList = (uid,editedList,name) => async dispatch => {
	todoListsRef.child(uid).child(name).set({...editedList});
};

//direct access to the boolean that controls the strikethrough effect for list items
export const toggleComplete = (uid,itemPath, complete) => async dispatch => {
	todoListsRef.child(uid).child(itemPath).set(complete);
};

//the user has selected a list (either for editting or for forward display on small screens)
//the list key is stored only
export const activeList = (listKey) => {
  if (listKey) {
      return {
        type: ACTIVE_LIST,
        payload: listKey
      };
    }
    else {
      return {
        type: ACTIVE_LIST,
        payload: null
      };
    }
}



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


export const signIn = provider => dispatch => {
  const authProvider = new firebase.auth[`${provider}AuthProvider`]();
  firebase.auth().signInWithPopup(authProvider)
    .then(result => {})
    .catch(error => {
      console.log(error);
    });
};

export const signOut = () => dispatch => {
  firebase.auth().signOut()
    .then(() => {//success
    })
    .catch(error => {
      console.log(error);
    });
};