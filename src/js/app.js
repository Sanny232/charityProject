import '../css/app.css';
import '../../node_modules/@splidejs/splide/dist/css/splide.min.css';
import Splide from '@splidejs/splide';
import '../../node_modules/animate.css/animate.min.css';
import { firebaseAuthUser } from './Firebase/firebase';

document.addEventListener('DOMContentLoaded', () => {
  const splide = new Splide('.splide', {
    type: 'loop',
    perPage: 1,
    height: '36rem',
    cover: true,
    breakpoints: {

    },
  }).mount();
});
