import { firebaseAddChangeListener, firebaseGetDBValues } from '../Firebase/firebase';
import getQueryVariable from '../getQueryVariable';

export function loadComments() {
  const id = getQueryVariable('id');
  firebaseAddChangeListener(`news/${id}/comments`, (res) => {
    renderComments(res);
  });
}

function renderComments(data) {
  if (!data) {
    document.querySelector('.commentsBlock').innerHTML = '<p>Коментарів поки немає!</p>';
    return;
  }
  data = Object.entries(data).reverse();
  const comments = document.createElement('div');
  comments.classList.add('comments');
  comments.innerHTML = '';
  data.forEach((item) => {
    const comment = document.createElement('div');
    const img = document.createElement('img');
    const text = document.createElement('div');
    const author = document.createElement('div');
    img.src = item[1].authorPhoto;
    comment.classList.add('comment');
    text.classList.add('commentText');
    img.classList.add('commentImg');
    author.classList.add('commentAuthor');
    text.innerText = `${item[1].text}`;
    author.innerText = item[1].author;

    comment.appendChild(author);
    comment.appendChild(img);
    comment.appendChild(text);
    comments.appendChild(comment);
  });
  document.querySelector('.commentsBlock').innerHTML = '';
  document.querySelector('.commentsBlock').appendChild(comments);
}
