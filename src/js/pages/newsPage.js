import '../../css/app.css';
import { signIn } from '../signIn';
import { PaginatedContent } from '../pagination/PaginatedContent';
import { addPagination } from '../pagination/paginate';

function newsTemplate(id, { date, title, photo }) {
  return `
            <div class="newsItem animate__animated animate__fadeIn">
                <div class="newsItemTitle">
                    <h3>${title}</h3>
                    <p class="newsDate">${date}</p>
                </div>
                <div class="newsItemImage">
                    <img src="${photo}" alt="">
                </div>
                <a href="newspage.html?id=${id}">Читати</a>
            </div>
    `;
}

function applyFilters(array) {
  const result = array.slice();
  return result.reverse();
}

const config = {
  path: 'news',
  template: newsTemplate,
  outputSelector: '.news',
  outputFilter: applyFilters,
};
const content = new PaginatedContent(config);
addPagination(content);
signIn('.headerItems img');
