const signupForm = document.querySelector('[name="signup"]');

const submitButton = signupForm.querySelector('[type="submit"]');

signupForm.addEventListener('submit', function(e) {
  console.log('submitted');
  console.log(e.currentTarget);
  e.preventDefault();
});
