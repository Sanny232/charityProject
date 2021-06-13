export function addPagination(object) {
  document.querySelector('.next').addEventListener('click', () => {
    const elementsCount = Object.keys(object.data).length;
    if (elementsCount > object.page * 6) {
      object.page += 1;
      object.render();
    }
  });

  document.querySelector('.back').addEventListener('click', () => {
    if (object.page > 1) {
      object.page -= 1;
      object.render();
    }
  });
}
