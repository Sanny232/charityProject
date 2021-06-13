export default function getQueryVariable(variable) {
  const search = window.location.search.substring(1);
  const vars = search.split('&');

  for (let i = 0; i < vars.length; i += 1) {
    const pair = vars[i].split('=');
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  return false;
}
