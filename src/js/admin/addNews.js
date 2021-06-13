import '../../css/app.css';
import firebase from 'firebase';
import { formSubmitHandler } from './addNewsHandler';
import { addPetHandler } from './addPetHandler';
import { firebaseAuthUser, firebaseSignOutUser, getCurrentUser } from '../Firebase/firebase';

const formArticle = document.querySelector('.articleForm');
const formPet = document.querySelector('.petForm');

formArticle.addEventListener('submit', formSubmitHandler);
formPet.addEventListener('submit', addPetHandler);

firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    document.querySelector('main').style.display = 'none';
    firebaseAuthUser(() => {}, () => {});
  }
  if (user.uid === 'K6mFkTLeTzYDx5nvLeginamaWL63') {
    document.querySelector('main').style.display = 'block';
  } else {

  }
});
