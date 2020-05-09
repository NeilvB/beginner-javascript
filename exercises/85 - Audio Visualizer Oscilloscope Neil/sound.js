import { hslToRgb } from './utils';

const WIDTH = 1500;
const HEIGHT = 1500;

const canvas = document.querySelector('canvas');

const canvasContext = canvas.getContext('2d');

canvas.width = WIDTH;
canvas.height = HEIGHT;

let analyzer;
let bufferLength;

// Get the audio data
async function getAudio() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  // Similar to a canvas, we need to create a context for audio.
  const audioContext = new AudioContext();
  analyzer = audioContext.createAnalyser();
  analyzer.fftSize = 2 ** 10;

  const source = audioContext.createMediaStreamSource(stream);
  source.connect(analyzer);

  bufferLength = analyzer.frequencyBinCount;

  // Array for working with large data sets. Tradeoff is that each element in the array can only be e.g. 8 bits
  // This just creates the array with a certain length. It's not filled yet.
  const timeData = new Uint8Array(bufferLength);
  const frequencyData = new Uint8Array(bufferLength);
  drawTimeData(timeData);
  drawFrequency(frequencyData);
}

function drawTimeData(timeData) {
  // Ask the analyzer to populate our array with time data
  analyzer.getByteTimeDomainData(timeData);

  canvasContext.clearRect(0, 0, WIDTH, HEIGHT);

  canvasContext.lineWidth = 10;
  canvasContext.strokeStyle = '#ffc600';
  canvasContext.beginPath();

  // Calculate the width divisions of the screen. Each line will cover this distance horizontally.
  const sliceWidth = WIDTH / bufferLength;

  let x = 0;

  timeData.forEach((data, i) => {
    const v = data / 128;
    const y = (v * HEIGHT) / 2;
    // draw our lines
    if (i === 0) {
      canvasContext.moveTo(x, y);
    } else {
      canvasContext.lineTo(x, y);
    }
    x += sliceWidth;
  });

  canvasContext.stroke();

  // call itself again as soon as possible, collecting more audio data and drawing it
  requestAnimationFrame(() => drawTimeData(timeData));
}

// Draw frequency bars
function drawFrequency(frequencyData) {
  // Ask our analyzer to populate our array with frequency data
  analyzer.getByteFrequencyData(frequencyData);

  const barWidth = (WIDTH / bufferLength) * 2.5;

  let x = 0;

  frequencyData.forEach(amount => {
    const percent = amount / 255;
    const barHeight = (HEIGHT / 2) * percent;

    // calculate a hue based on how high the bar is, which is is turn based on the frequency at this position in the array.
    const [h, s, l] = [360 / (percent * 360), 0.8, 0.75];

    const [r, g, b] = hslToRgb(h, s, l);

    canvasContext.fillStyle = `rgb(${r},${g},${b})`;
    canvasContext.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
    x += barWidth + 1;
  });

  // call itself again as soon as possible, collecting more audio data and drawing it
  requestAnimationFrame(() => drawFrequency(frequencyData));
}

// Draw time data

// getAudio();
