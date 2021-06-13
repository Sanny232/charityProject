import { firebaseAddFileToStorage, firebaseInsertToDB } from '../Firebase/firebase';

const fileUploader = document.querySelector('#articlePhotoUploader');
const form = document.querySelector('.articleForm');

function progressBarUpdater(percentage) {
  document.querySelector('.uploaderBar').value = percentage;
}

export function formSubmitHandler(e) {
  e.preventDefault();
  if (fileUploader.files.length < 1) {
    alert('No file!');
    return;
  }
  const file = fileUploader.files[0];
  firebaseAddFileToStorage(`articles/${file.name}`, file, progressBarUpdater, (url) => {
    const article = {
      title: form.elements.articleTitleArea.value,
      text: form.elements.articleTextArea.value,
      date: new Date().toString(),
      photo: url,
    };
    firebaseInsertToDB('news', article).then(() => {
      form.reset();
      window.location.href = 'news.html';
    }).catch((error) => alert('error'));
  });
}
