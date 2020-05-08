function Gallery(galleryElem) {
  if (!galleryElem) {
    throw new Error('No gallery passed in!');
  }

  this.galleryElem = galleryElem; // Adding a property to gallery instance

  this.modal = document.querySelector('.modal');
  this.modalInner = this.modal.querySelector('.modalInner');
  this.modalFigure = this.modalInner.querySelector('figure');

  this.images = Array.from(this.galleryElem.querySelectorAll('img'));
  this.previousButton = this.modal.querySelector('button.prev');
  this.nextButton = this.modal.querySelector('button.next');

  this.showNextImage = this.showNextImage.bind(this);
  this.showPreviousImage = this.showPreviousImage.bind(this);
  this.closeModal = this.closeModal.bind(this);
  this.closeModalIfOutside = this.closeModalIfOutside.bind(this);
  this.handleModalButtons = this.handleModalButtons.bind(this);

  // Attach listeners for selecting images to show in the gallery modal.
  // No need to detach these as they're on each individual image for this gallery.
  // Here the flow of control is from the gallery to the modal.
  this.images.forEach(image => {
    image.addEventListener('click', () => {
      this.showImage(image);
      this.openModal();
    });

    image.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        this.showImage(image);
        this.openModal();
      }
    });
  });
}

Gallery.prototype.showImage = function(element) {
  this.modalFigure.innerHTML = `
    <img src="${element.src}" alt="${element.alt}">
    <figcaption>
      <h2>${element.title}</h2>
      <p>${element.dataset.description}</p>
    </figcaption>
  `;

  this.currentImage = element;
};

Gallery.prototype.showNextImage = function() {
  if (this.currentImage.nextElementSibling)
    this.showImage(this.currentImage.nextElementSibling);
};

Gallery.prototype.showPreviousImage = function() {
  if (this.currentImage.previousElementSibling)
    this.showImage(this.currentImage.previousElementSibling);
};

Gallery.prototype.closeModalIfOutside = function(e) {
  const isOutside = !e.target.closest('.modalInner');

  if (isOutside) {
    this.closeModal();
  }
};

Gallery.prototype.handleModalButtons = function(e) {
  if (e.key === 'Escape') return this.closeModal();
  if (e.key === 'ArrowRight') return this.showNextImage();
  if (e.key === 'ArrowLeft') return this.showPreviousImage();
};

Gallery.prototype.openModal = function() {
  this.modal.classList.add('open');

  // Bind the modal controls to the current gallery.
  // Here the flow of control is from the modal to the current gallery.
  // When the current gallery is changed, we need to "reroute" the listeners to the other gallery.
  this.nextButton.addEventListener('click', this.showNextImage);
  this.previousButton.addEventListener('click', this.showPreviousImage);
  document.addEventListener('keyup', this.handleModalButtons);
  this.modal.addEventListener('click', this.closeModalIfOutside);
};

Gallery.prototype.closeModal = function() {
  this.modal.classList.remove('open');

  // Unbind the modal controls from the current gallery.
  this.nextButton.removeEventListener('click', this.showNextImage);
  this.previousButton.removeEventListener('click', this.showPreviousImage);
  document.removeEventListener('keyup', this.handleModalButtons);
  this.modal.removeEventListener('click', this.closeModalIfOutside);
};

const gallery1 = new Gallery(document.querySelector('.gallery1'));
const gallery2 = new Gallery(document.querySelector('.gallery2'));

console.log(gallery1, gallery2);
