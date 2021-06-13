import { firebaseAddFileToStorage, firebaseInsertToDB } from '../Firebase/firebase';

const fileUploader = document.querySelector('#petPhotoUploader');
const form = document.querySelector('.petForm');

function progressBarUpdater(percentage) {
  document.querySelector('.petUploaderBar').value = percentage;
}

export function addPetHandler(e) {
  e.preventDefault();
  if (fileUploader.files.length < 1) {
    alert('No file!');
    return;
  }
  const file = fileUploader.files[0];
  firebaseAddFileToStorage(`pets/${file.name}`, file, progressBarUpdater, (url) => {
    const pet = {
      name: form.elements.petNameInput.value,
      age: form.elements.petAgeInput.value,
      gender: form.elements.petGenderSelect.value,
      description: form.elements.petDescInput.value,
      type: form.elements.petTypeSelect.value,
      photo: url,
    };
    firebaseInsertToDB('pets', pet).then(() => {
      form.reset();
      window.location.href = 'pets.html';
    }).catch((error) => alert('error'));
  });
}
