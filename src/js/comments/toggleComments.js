import { firebaseInsertToDB } from '../Firebase/firebase';
import getQueryVariable from '../getQueryVariable';

export function toggleComments(user) {
  if (user) {
    document.querySelector('.commentsWrite').innerHTML = `
                <div class="commentsWrite">
                <form action="" class="commentForm">
                    <p><textarea name="commentAdd" id="commentAdd" cols="30" rows="10"></textarea></p>
                    <p><input type="submit" value="Надіслати"></p>
                </form>
            </div>
    `;
    const form = document.querySelector('.commentForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = form.elements.commentAdd.value.trim();
      if (!text) { return false; }
      const message = {
        text,
        author: user.displayName,
        authorPhoto: user.photoURL,
      };
      const id = getQueryVariable('id');
      firebaseInsertToDB(`news/${id}/comments`, message).then(() => { form.reset(); }).catch((error) => console.log(error));
    });
  } else {
    document.querySelector('.commentsWrite').innerHTML = '<b class="noAuthErrorMessage"">Щоб залишити коментар, авторизуйтеся з вашим акаунтом Google</b>';
  }
}
