import 'normalize.css';
import './styles/style.scss';
import './styles/index.css';
import { loadStage } from './js/stage.js';

document.getElementById("start").addEventListener("click", () => {
    loadStage();
});