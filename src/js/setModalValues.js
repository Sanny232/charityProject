export default function setModalValues(values, images = []) {
  values.forEach((item) => {
    document.querySelectorAll(item.selector).forEach((field) => {
      field.innerText = item.value;
    });
  });
  images.forEach((item) => {
    document.querySelector(item.selector).src = item.value;
  });
}
