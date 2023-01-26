import * as webpfuncs from './modules/functions.js';
import Swiper, { Navigation, Pegination} from 'swiper';
import { animOnScroll } from './modules/beauty_load.js'

const swiper = new Swiper();

// Красивая загрузка елементов страницы
document.addEventListener('DOMContentLoaded', function() {
	webpfuncs.ibg();
	webpfuncs.testWebP(function () {});

	setTimeout(animOnScroll, 300);
	window.addEventListener('scroll', animOnScroll);
});
