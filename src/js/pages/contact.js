import '../../css/app.css';
import { firebaseInsertToDB } from '../Firebase/firebase';
import { addMap } from '../googleMap';
import notify from '../notification';

const form = document.querySelector('.contactForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = form.elements.contactEmail.value.trim();
  const text = form.elements.contactText.value.trim();
  const date = String(new Date());
  const question = {
    email,
    text,
    date,
  };
  firebaseInsertToDB('questions', question).then(() => {
    notify('Дякуємо! Найближчим часом постараємося відповісти', 'green');
    form.reset();
  });
});

addMap();
