import { init } from './init.js';

const app = document.querySelector('.wrapper');

app.addEventListener('mouseenter', init, { once: true });
