function Slider(sliderSelector) {
  this.sliderSelector = sliderSelector;
  this.sliderElem = document.querySelector(this.sliderSelector);

  if (!this.sliderElem) {
    throw new Error(`No slider found for ${sliderSelector}`);
  }

  this.slides = this.sliderElem.querySelector('.slides');

  if (this.slides.length <= 1) {
    throw new Error(`Sliders require two or more slides`);
  }

  this.nextButton = this.sliderElem.querySelector('.controls .goToNext');
  this.prevButton = this.sliderElem.querySelector('.controls .goToPrev');

  this.startSlider();
  this.applyClasses();

  // Bind prototype methods which are supplied to event listeners to the instance.
  // Otherwise, they are bound to the target object dispatching any event of the specified type
  this.handleKeys = this.handleKeys.bind(this);

  this.nextButton.addEventListener('click', () => this.scrollSlide('forward'));
  this.prevButton.addEventListener('click', () => this.scrollSlide('back'));
  window.addEventListener('keydown', this.handleKeys);
}

Slider.prototype.applyClasses = function() {
  this.previousSlide.classList.add('prev');
  this.currentSlide.classList.add('current');
  this.nextSlide.classList.add('next');
};

Slider.prototype.scrollSlide = function(direction) {
  const classesToRemove = ['prev', 'current', 'next'];

  this.previousSlide.classList.remove(...classesToRemove);
  this.currentSlide.classList.remove(...classesToRemove);
  this.nextSlide.classList.remove(...classesToRemove);

  if (direction === 'back') {
    [this.previousSlide, this.currentSlide, this.nextSlide] = [
      this.previousSlide.previousElementSibling || this.slides.lastElementChild,
      this.previousSlide,
      this.currentSlide,
    ];
  } else {
    [this.previousSlide, this.currentSlide, this.nextSlide] = [
      this.currentSlide,
      this.nextSlide,
      this.nextSlide.nextElementSibling || this.slides.firstElementChild,
    ];
  }

  this.applyClasses();
};

Slider.prototype.handleKeys = function(e) {
  console.dir(this);

  console.log(this.sliderSelector);

  if (e.target.closest(this.sliderSelector)) {
    if (e.key === 'ArrowRight') return this.scrollSlide('forward');
    if (e.key === 'ArrowLeft') return this.scrollSlide('back');
  }
};

Slider.prototype.startSlider = function() {
  this.currentSlide =
    this.sliderElem.querySelector('.current') || this.slides.firstElementChild;

  this.nextSlide =
    this.currentSlide.nextElementSibling || this.slides.lastElementChild;
  this.previousSlide =
    this.currentSlide.previousElementSibling || this.slides.firstElementChild;
};

const slider = new Slider('.slider');
const dogSlider = new Slider('.dog-slider');
