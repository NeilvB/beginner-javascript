function Slider(sliderSelector) {
  const sliderElem = document.querySelector(sliderSelector);

  if (!sliderElem) {
    throw new Error(`No slider found for ${sliderSelector}`);
  }

  const slides = sliderElem.querySelector('.slides');

  if (slides.length <= 1) {
    throw new Error(`Sliders require two or more slides`);
  }

  const nextButton = sliderElem.querySelector('.controls .goToNext');
  const prevButton = sliderElem.querySelector('.controls .goToPrev');

  let previousSlide;
  let currentSlide;
  let nextSlide;

  function applyClasses() {
    previousSlide.classList.add('prev');
    currentSlide.classList.add('current');
    nextSlide.classList.add('next');
  }

  function scrollSlide(direction) {
    const classesToRemove = ['prev', 'current', 'next'];

    previousSlide.classList.remove(...classesToRemove);
    currentSlide.classList.remove(...classesToRemove);
    nextSlide.classList.remove(...classesToRemove);

    if (direction === 'back') {
      [previousSlide, currentSlide, nextSlide] = [
        previousSlide.previousElementSibling || slides.lastElementChild,
        previousSlide,
        currentSlide,
      ];
    } else {
      [previousSlide, currentSlide, nextSlide] = [
        currentSlide,
        nextSlide,
        nextSlide.nextElementSibling || slides.firstElementChild,
      ];
    }

    applyClasses();
  }

  function startSlider() {
    currentSlide =
      sliderElem.querySelector('.current') || slides.firstElementChild;

    nextSlide = currentSlide.nextElementSibling || slides.lastElementChild;
    previousSlide =
      currentSlide.previousElementSibling || slides.firstElementChild;

    window.addEventListener('keydown', e => {
      if (e.target.closest(sliderSelector)) {
        if (e.key === 'ArrowRight') return scrollSlide('forward');
        if (e.key === 'ArrowLeft') return scrollSlide('back');
      }
    });
  }

  startSlider();
  applyClasses();

  nextButton.addEventListener('click', () => scrollSlide('forward'));
  prevButton.addEventListener('click', () => scrollSlide('back'));
}

const slider = Slider('.slider');
const dogSlider = Slider('.dog-slider');
