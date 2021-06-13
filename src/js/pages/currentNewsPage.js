import '../../css/app.css';
import getQueryVariable from '../getQueryVariable';
import { firebaseGetDBValues } from '../Firebase/firebase';
import { signIn } from '../signIn';
import { toggleComments } from '../comments/toggleComments';
import { loadComments } from '../comments/loadComments';

const id = getQueryVariable('id');
if (!id) {
  window.location.href = 'news.html';
}
firebaseGetDBValues(`news/${id}`, getCurrentNews);

function getCurrentNews(response) {
  if (!response) {
    window.location.href = 'news.html';
  }
  document.querySelector('.newsText').innerHTML = response.text;
  document.querySelector('.newsTitle').innerText = response.title;
  document.querySelector('.newsImage').style.backgroundImage = `url('${response.photo}')`;
  document.querySelector('.newsText').onload = document.querySelector('.loadingContainer').classList.add('noDisplay');
}

signIn('.headerItems img', toggleComments);
loadComments();
// document.addEventListener("DOMContentLoaded", () => {
//   document.querySelector('.loadingContainer').classList.add('noDisplay');
// })
