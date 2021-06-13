import '../../css/app.css';

const bigImage = document.querySelector('.galleryBigImage .galleryImage img');
const bigImageContainer = document.querySelector('.galleryBigImage');
const gallery = document.querySelector('.gallery');
const overlay = document.querySelector('.modalOverlay');

gallery.addEventListener('click', (e) => {
  if (window.screen.width < 400) return;
  overlay.style.display = 'block';
  bigImage.src = e.target.closest('img').src;
  bigImageContainer.style.display = 'block';
});
overlay.addEventListener('click', () => {
  overlay.style.display = 'none';
  bigImageContainer.style.display = 'none';
});
