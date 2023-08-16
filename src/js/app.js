import testWebP from './modules/testWebp.js'
import {
	closePreloader,
	burgerInit,
	orderNowDialog,
	getDataFromForm,
	formTransform,
	initFocusManager,
	switchBurger
} from './modules/design.js'
import { beautyLoadInit, VanillaLazyLoadInit } from './modules/beauty_load.js'

document.addEventListener('DOMContentLoaded', () => {
	// Testing browser for supports webp
	testWebP().then(supportWebp => supportWebp ? document.body.classList.add('webp') : document.body.classList.add('no-webp'))
})

// On page load event
window.onload = () => {
	VanillaLazyLoadInit()

	// Beauty load
	beautyLoadInit()

	closePreloader()

	const burgerFocusFuncs = () => initFocusManager('.menu--burger.nav__menu')

	// Burger
	burgerInit(burgerFocusFuncs)

	// Order Now dialog function
	orderNowDialog(burgerFocusFuncs)

	// Getting data from order now form
	getDataFromForm()

	// Form transform
	formTransform()
}

// Dev function
window.onresize = () =>	switchBurger()