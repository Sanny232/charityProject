import '../../css/app.css';
import '../../../node_modules/animate.css/animate.min.css';
import { firebaseAddChangeListener, firebaseInsertToDB } from '../Firebase/firebase';
import notify from "../notification";

const form = document.querySelector('.donateForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const sum = parseInt(form.elements.donationAmount.value);
  const data = {
    name: form.elements.donationName.value || 'Анонімно',
  };
  pay(sum, data);
});

function pay(sum, data) {
  const widget = new cp.CloudPayments({ language: 'uk' });
  widget.pay('charge', // или 'charge'
    { // options
      publicId: 'test_api_00000000000000000000001', // id из личного кабинета
      description: 'Пожертвування Lorem Ipsum', // назначение
      amount: sum, // сумма
      currency: 'UAH', // валюта
      skin: 'modern', // дизайн виджета (необязательно)
      data,
    },
    {
      onSuccess(options) { // success
        form.reset();
        console.log(options);
        firebaseInsertToDB('donations', {
          amount: options.amount,
          description: options.description,
          date: String(new Date()),
          data: options.data,
        }).then((response) => {
          console.log(response);
        }).catch((error) => {
          console.log(error);
        });
      },
      onFail(reason, options) { // fail
        notify('Не вдалося здійснити пожертвування', 'red');
      },
      onComplete(paymentResult, options) { // Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.
        notify('Дякуємо!', 'green');
      },
    });
}

function showLastDonations(data) {
  data = Object.entries(data);
  let html = '';
  data.forEach((item) => {
    html += `<div class="lastDonationItem animate__animated animate__fadeIn"><b>${item[1].data.name}</b> ${item[1].amount} грн</div>`;
  });
  document.querySelector('.lastDonations').innerHTML = html;
}

firebaseAddChangeListener('donations', showLastDonations);
