import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('form input[name="email"]'),
  message: document.querySelector('form textarea[name="message"]'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput), 500);

function onFormInput() {
  const formData = { email: refs.email.value, message: refs.message.value };
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log({ email: refs.email.value, message: refs.message.value });
  localStorage.removeItem('feedback-form-state');
  evt.currentTarget.reset();
}

const saveData = JSON.parse(localStorage.getItem('feedback-form-state'));

if (saveData) {
  refs.email.value = saveData.email;
  refs.message.value = saveData.message;
}
