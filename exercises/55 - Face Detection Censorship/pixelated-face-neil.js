const video = document.querySelector('.webcam');

const canvas = document.querySelector('.video');
const ctx = canvas.getContext('2d');

const faceCanvas = document.querySelector('.face');
const faceCtx = faceCanvas.getContext('2d');

const faceDetector = new window.FaceDetector();

function populateVideo() {
  const stream = navigator.mediaDevices.getUserMedia({
    video: { width: 1280, height: 720 },
  });
}

console.log(populateVideo());
