import * as webpfuncs from './modules/functions.js'
import { animOnScroll } from './modules/beauty_load.js'
import { ToggleBurger, switchBurger } from './modules/resposive_design.js'


document.addEventListener('DOMContentLoaded', () => webpfuncs.ibg(), webpfuncs.testWebP(()=>{}) )

window.onload = () => {
	// Красивая загрузка елементов страницы
	setTimeout(animOnScroll, 300);
	window.addEventListener('scroll', animOnScroll);

	switchBurger();
	let burger__button = document.querySelector(".menu--burger.nav__menu .menu__button");
	if (burger__button) {burger__button.addEventListener('click', ToggleBurger);}
}

window.onresize = () => {
	switchBurger()
	let burger__button = document.querySelector(".menu--burger.nav__menu .menu__button")
	if (burger__button) {burger__button.addEventListener('click', ()=> {
		ToggleBurger()
		if (burger__button.getAttribute('aria-roledescription').includes('open')) console.log(1)
		else console.log(2)
	})}
}

