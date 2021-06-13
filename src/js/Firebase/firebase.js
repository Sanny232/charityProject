import firebase from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';
import notify from '../notification';

firebase.initializeApp(firebaseConfig);

export function firebaseGetDBValues(path, callback) {
  const dbRef = firebase.database().ref();
  dbRef.child(path).get().then((snapshot) => {
    callback(snapshot.val());
  }).catch((error) => {
    notify('Не вдалося отримати дані', 'red');
  });
}

export function firebaseAddChangeListener(path, callback) {
  const ref = firebase.database().ref(path);
  ref.on('value', (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
}

export function firebaseGetImage(path, urlSelector) {
  const storage = firebase.storage();
  storage.ref().child(path).getDownloadURL()
    .then((url) => {
      const img = document.querySelector(urlSelector);
      img.setAttribute('src', url);
    })
    .catch((error) => {
      console.error(error);
    });
}

export function firebaseInsertToDB(path, data) {
  return firebase.database().ref(path).push().set(data)
    .catch((error) => {
      console.log(error);
      notify('Помилка при внесенні в базу даних', 'red');
    });
}

export function firebaseAddFileToStorage(path, file, progressCallback, successCallback) {
  const metadata = {
    contentType: 'image/jpeg',
  };

  const storageRef = firebase.storage().ref(path);
  const uploadTask = storageRef.put(file, metadata);

  uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      progressCallback(progress);
    },
    (error) => {
      notify('Помилка при завантаженні файлу!', 'red');
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        successCallback(downloadURL);
      });
    });
}

const provider = new firebase.auth.GoogleAuthProvider();
export function firebaseAuthUser(onSuccess = () => {}) {
  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      onSuccess(result);
    }).catch((error) => {
      switch (error.code) {
        case 'auth/user-disabled': notify('Ваш акаунт відключено. Зверніться у підтримку.', 'red');
          break;
        case 'auth/popup-closed-by-user':
          break;
        default: notify('Щось пішло не так!', 'red');
      }
    });
}
export function firebaseSignOutUser(callback = () => {}) {
  firebase.auth().signOut().then(callback).catch((error) => {
    console.error(error);
  });
}

export function getCurrentUser() {
  return firebase.auth().currentUser;
}
