export default function notify(text, color) {
  const notification = document.createElement('div');
  notification.style.position = 'fixed';
  notification.style.width = '200px';
  notification.style.height = '100px';
  notification.style.backgroundColor = color;
  notification.style.bottom = '20px';
  notification.style.right = '20px';
  notification.style.color = 'white';
  notification.style.display = 'flex';
  notification.style.padding = '10px';
  notification.style.alignItems = 'center';
  notification.style.justifyContent = 'center';
  notification.style.zIndex = '9999';
  notification.innerText = text;
  document.body.append(notification);
  setTimeout(() => {
    document.body.removeChild(notification);
  }, 2000);
}
