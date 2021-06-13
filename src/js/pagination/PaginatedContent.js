import { firebaseAddChangeListener } from '../Firebase/firebase';
import 'animate.css/animate.min.css';

export class PaginatedContent {
  constructor({
    path, template, outputSelector, outputFilter,
  }) {
    this.data = [];
    this.page = 1;
    this.html = '';
    this.outputSelector = outputSelector;
    this.setTemplate = template;
    this.outputFilter = outputFilter;
    firebaseAddChangeListener(path, this.updateData.bind(this));
  }

  updateData(updatedData) {
    this.data = Object.entries(updatedData);
    this.render();
  }

  render() {
    this.html = '';
    let shownData = this.data;
    shownData = this.outputFilter(shownData);
    shownData = this.getPage(this.page, shownData);
    shownData.forEach((item) => {
      this.html += this.setTemplate(item[0], item[1]);
    });
    document.querySelector(this.outputSelector).innerHTML = this.html;
  }

  getPage(page, array) {
    const start = (page - 1) * 6;
    const end = page * 6;
    let result = [];
    for (let i = start; i < end; i += 1) {
      if (i < array.length) {
        result.push(array[i]);
      }
    }
    if (result.length < 1 && page > 1) {
      result = this.getPage(page - 1, array);
      this.page -= 1;
    }
    return result;
  }
}
