import firebase from 'firebase';
import { firebaseAuthUser, firebaseSignOutUser, getCurrentUser } from './Firebase/firebase';

export function signIn(selector, callback = () => {}) {
  const el = document.querySelector(selector);
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      el.src = 'images/google-icon.svg';
    } else {
      el.src = user.photoURL;
    }
    callback(user);
  });
  el.addEventListener('click', () => {
    if (getCurrentUser() == null) {
      firebaseAuthUser();
    } else {
      firebaseSignOutUser();
    }
  });
}
