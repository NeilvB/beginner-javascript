const video = document.querySelector('.webcam');

const canvas = document.querySelector('.video');
const ctx = canvas.getContext('2d');

const faceCanvas = document.querySelector('.face');
const faceCtx = faceCanvas.getContext('2d');

faceCtx.strokeStyle = 'yellow';
faceCtx.lineWidth = 5;

const options = {
  size: 29,
  scale: 1.1,
};

const faceDetector = new FaceDetector({ fastMode: true });

const sliders = document.querySelectorAll('.controls input[type="range"]');

function changeFaceParameters(e) {
  const { value, name } = e.target;

  options[name.toLowerCase()] = value;
}

sliders.forEach(slider =>
  slider.addEventListener('change', changeFaceParameters)
);

async function populateVideo() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 1280, height: 720 },
  });
  video.srcObject = stream;
  await video.play();

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  faceCanvas.width = video.videoWidth;
  faceCanvas.height = video.videoHeight;
}

async function detect() {
  const faces = await faceDetector.detect(video); // will work when there are multiple faces on the screen
  faces.forEach(drawFace);
  faces.forEach(censor);

  requestAnimationFrame(detect); // recursive call
}

function censor({ boundingBox: face }) {
  // draw a mini Neil in a known location
  faceCtx.imageSmoothingEnabled = false;
  faceCtx.clearRect(0, 0, faceCanvas.width, faceCanvas.height);
  faceCtx.drawImage(
    // defining the source of the image to be drawn - like a screenshot for a particular area
    video,
    face.x,
    face.y,
    face.width,
    face.height,
    // actually drawing onto the context
    face.x,
    face.y,
    options.size,
    options.size
  );

  const width = face.width * options.scale;
  const height = face.height * options.scale;

  // draw a blown up version of the mini Neil on top of the existing face
  faceCtx.drawImage(
    faceCanvas,
    face.x,
    face.y,
    options.size,
    options.size,
    face.x - (width - face.width) / 2,
    face.y - (height - face.height) / 2,
    width,
    height
  );
}

function drawFace(face) {
  const { width, height, top, left } = face.boundingBox;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.strokeStyle = 'yellow';
  // ctx.lineWidth = 5;
  // ctx.strokeRect(left, top, width, height);
}

populateVideo().then(detect);
