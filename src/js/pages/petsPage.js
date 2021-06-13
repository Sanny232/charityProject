import '../../css/app.css';
import { PaginatedContent } from '../pagination/PaginatedContent';
import { addPagination } from '../pagination/paginate';
import petsOpenListener from '../openPetInfo';

function petsCard(id, { name, gender, photo }) {
  return `
            <div class="petCard animate__animated animate__fadeIn" data-id="${id}">
                <div class="petDesc">
                    <p class="petName">${name}</p>
                    <img src="../images/${gender}.svg" alt="">
                </div>
                <div class="petPhoto" style="background-image: url('${photo}'"></div>
            </div>
    `;
}
function applyFilters(array) {
  const form = document.querySelector('.filtersPanel');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });
  const type = form.elements.filtersPanelType.value;
  const gender = form.elements.filtersPanelGender.value;
  const search = form.elements.petSearch.value.toLowerCase().trim();
  return array.filter((item) => (item[1].type === type) || type === 'all')
    .filter((item) => (item[1].gender === gender) || gender === 'all').filter((item) => item[1].name.toLowerCase().includes(search));
}

const config = {
  path: 'pets',
  template: petsCard,
  outputSelector: '.pets',
  outputFilter: applyFilters,
};
const content = new PaginatedContent(config);
addPagination(content);
petsOpenListener(content);

document.querySelector('.filtersPanel').addEventListener('change', () => {
  content.page = 1;
  content.render();
});
