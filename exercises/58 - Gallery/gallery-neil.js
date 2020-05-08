const modal = document.querySelector('.modal');
const modalInner = modal.querySelector('.modalInner');
const modalFigure = modalInner.querySelector('figure');

function Gallery(gallery) {
  if (!gallery) {
    throw new Error('No gallery passed in!');
  }

  const images = Array.from(gallery.querySelectorAll('img'));
  const previousButton = modal.querySelector('button.prev');
  const nextButton = modal.querySelector('button.next');

  // Keep track of which image is currently being shown in the modal
  let currentImage;

  function showImage(element) {
    modalFigure.innerHTML = `
      <img src="${element.src}" alt="${element.alt}">
      <figcaption>
        <h2>${element.title}</h2>
        <p>${element.dataset.description}</p>
      </figcaption>
    `;

    currentImage = element;
  }

  function showNextImage() {
    if (currentImage.nextElementSibling)
      showImage(currentImage.nextElementSibling);
  }

  function showPreviousImage() {
    if (currentImage.previousElementSibling)
      showImage(currentImage.previousElementSibling);
  }

  function closeModalIfOutside(e) {
    const isOutside = !e.target.closest('.modalInner');

    if (isOutside) {
      closeModal();
    }
  }

  function handleModalButtons(e) {
    if (e.key === 'Escape') return closeModal();
    if (e.key === 'ArrowRight') return showNextImage();
    if (e.key === 'ArrowLeft') return showPreviousImage();
  }

  function openModal() {
    modal.classList.add('open');

    // Bind the modal controls to the current gallery.
    // Here the flow of control is from the modal to the current gallery.
    // When the current gallery is changed, we need to "reroute" the listeners to the other gallery.
    nextButton.addEventListener('click', showNextImage);
    previousButton.addEventListener('click', showPreviousImage);
    document.addEventListener('keyup', handleModalButtons);
    modal.addEventListener('click', closeModalIfOutside);
  }

  function closeModal() {
    modal.classList.remove('open');

    // Unbind the modal controls from the current gallery.
    nextButton.removeEventListener('click', showNextImage);
    previousButton.removeEventListener('click', showPreviousImage);
    document.removeEventListener('keyup', handleModalButtons);
    modal.removeEventListener('click', closeModalIfOutside);
  }

  // Attach listeners for selecting images to show in the gallery modal.
  // No need to detach these as they're on each individual image for this gallery.
  // Here the flow of control is from the gallery to the modal.
  images.forEach(image => {
    image.addEventListener('click', () => {
      showImage(image);
      openModal();
    });

    image.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        showImage(image);
        openModal();
      }
    });
  });
}

const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
