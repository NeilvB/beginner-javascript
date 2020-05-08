const timerButton = document.querySelector('.timer-button');

function toggleActive() {
  if (timerButton.classList.contains('active')) {
    return;
  }

  timerButton.classList.add('active');
  setTimeout(() => timerButton.classList.remove('active'), 4000);
}

timerButton.addEventListener('click', toggleActive);
