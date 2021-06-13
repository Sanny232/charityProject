import setModalValues from './setModalValues';

export default function petsOpenListener(object) {
  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.modalOverlay');
  const petsList = document.querySelector('.pets');
  const takeInfo = document.querySelector('.takeInfo');

  petsList.addEventListener('click', (e) => {
    const card = e.target.closest('.petCard');
    if (card) {
      const { data } = object;
      const currentPet = data.find((item) => item[0] === card.dataset.id);
      if (currentPet) {
        const textValues = [
          { selector: '.modalPetDesc', value: currentPet[1].description || '' },
          { selector: '.modalPetTitle', value: currentPet[1].name || '' },
          { selector: '.modalPetAge', value: currentPet[1].age || '' },
          { selector: '.modalPetType', value: currentPet[1].type || '' },
        ];
        const images = [
          { selector: '.modalPetImage img', value: currentPet[1].photo },
        ];
        setModalValues(textValues, images);
        modal.style.display = 'block';
        overlay.style.display = 'block';
        document.body.style.overflowY = 'hidden';
        document.querySelectorAll('.container').forEach((cont) => {
          cont.style.paddingRight = '12px';
        });
      }
    }
  });
  overlay.addEventListener('click', () => {
    modal.style.display = 'none';
    overlay.style.display = 'none';
    document.body.style.overflowY = 'auto';
    document.querySelectorAll('.container').forEach((cont) => {
      cont.style.paddingRight = '0px';
    });
    if (!takeInfo.classList.contains('noDisplay')) {
      takeInfo.classList.add('noDisplay');
    }
  });
  document.querySelector('.modalTake').addEventListener('click', (e) => {
    e.preventDefault();
    takeInfo.classList.toggle('noDisplay');
  });
}
