import * as webpfuncs from './modules/functions.js'
import { animOnScroll } from './modules/beauty_load.js'
import { ToggleBurger, switchBurger } from './modules/resposive_design.js'

// Testing browser for supports and some static funcs
document.addEventListener('DOMContentLoaded', () => webpfuncs.ibg(), webpfuncs.testWebP(()=>{}) )

window.onload = () => {
	// Красивая загрузка елементов страницы
	setTimeout(animOnScroll, 300);
	window.addEventListener('scroll', animOnScroll);

	// Burger open/close
	switchBurger();
	let burger__button = document.querySelector(".menu--burger.nav__menu .menu__button");
	if (burger__button) {burger__button.addEventListener('click', ToggleBurger);}

	// Form transform
	document.querySelector('#date').addEventListener('focus', ()=>event.target.type = 'date')
	document.querySelector('#date').addEventListener('blur', ()=>event.target.type = 'text')

	document.querySelector('#time').addEventListener('focus', ()=>event.target.type = 'time')
	document.querySelector('#time').addEventListener('blur', ()=>event.target.type = 'text')

	document.querySelector('#start').addEventListener('focus', ()=>event.target.type = 'time')
	document.querySelector('#start').addEventListener('blur', ()=>event.target.type = 'text')

	document.querySelector('#end').addEventListener('focus', ()=>event.target.type = 'time')
	document.querySelector('#end').addEventListener('blur', ()=>event.target.type = 'text')

	// Open OrderNow
	document.querySelectorAll('a.open-order-now').forEach(el => {
		el.addEventListener('click', (event) => {
			event.preventDefault()
			document.querySelector('dialog.order-now').showModal()
			document.querySelector('body').classList.add('lock')
		})
	})

}

window.onresize = () => {
	switchBurger()
	let burger__button = document.querySelector(".menu--burger.nav__menu .menu__button")
	if (burger__button) {burger__button.addEventListener('click', ToggleBurger)}
}