import * as webpfuncs from './modules/functions.js'
import { animOnScroll } from './modules/beauty_load.js'
import { ToggleBurger, switchBurger } from './modules/resposive_design.js'
import { getDataFromForm } from './modules/forms.js'

// Testing browser for supports and some static funcs
document.addEventListener('DOMContentLoaded', () => {
	webpfuncs.ibg()
	webpfuncs.testWebP(()=>{})

	// getting data from form
	document.forms.order_now
		.addEventListener('submit', (e) => {
			e.preventDefault()
			// window.history.back();
			const data = getDataFromForm(e.target)
			alert(data)
		})
})

window.onload = () => {
	// Beauty load
	setTimeout(animOnScroll, 300);
	window.addEventListener('scroll', animOnScroll);

	// Burger open/close
	switchBurger();
	let burger__button = document.querySelector(".menu--burger.nav__menu .menu__button");
	if (burger__button) {burger__button.addEventListener('click', ToggleBurger);}

	// Form transform
	const formTransform = {
		'#date': 'date',
		'#time': 'time',
		'#start': 'time',
		'#end': 'time'
	}

	for(const [key, value] of Object.entries(formTransform)) {
		document.querySelector(key).addEventListener('focus', (e)=> e.target.type = value)
		document.querySelector(key).addEventListener('blur', (e)=> e.target.type = 'text')
	}

	// Open order-now
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