import DOMPurify from 'dompurify';

const textarea = document.querySelector('textarea[name="my-page"]');
const renderedDiv = document.querySelector('.rendered-page');

function handleInput(e) {
  const currentText = e.currentTarget.value;

  renderedDiv.innerHTML = DOMPurify.sanitize(currentText, {
    FORBID_TAGS: ['style'], // Prevent style tags
    FORBID_ATTR: ['style'], // Prevent inline styling
  });
}

textarea.addEventListener('input', handleInput);
