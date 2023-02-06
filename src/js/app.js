import * as webpfuncs from './modules/functions.js';
import { animOnScroll } from './modules/beauty_load.js';
import { ToggleBurger, switchBurger } from './modules/resposive_design.js';


// Called when DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
	webpfuncs.ibg();
	webpfuncs.testWebP(function () {});

	// Красивая загрузка елементов страницы
	setTimeout(animOnScroll, 300);
	window.addEventListener('scroll', animOnScroll);

	// Burger menu
	switchBurger();
	// ? Как получить ::before
	let burger__button = document.querySelector(".menu--burger.nav__menu .menu__button");
	if (burger__button) {burger__button.addEventListener('click', ToggleBurger);}
});

window.addEventListener('resize', () => {
	switchBurger();
	let burger__button = document.querySelector(".menu--burger.nav__menu .menu__button");
	if (burger__button) {burger__button.addEventListener('click', ToggleBurger);}
});