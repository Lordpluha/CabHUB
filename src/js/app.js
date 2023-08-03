import {
	closePreloader,
	burgerInit,
	orderNowDialog,
	getDataFromForm,
	formTransform,
	initFocusManager,
	switchBurger
} from './modules/design.js'
import { beautyLoadInit } from './modules/beauty_load.js'

// On page load event
window.onload = () => {
	closePreloader()

	const burgerFocusFuncs = () => initFocusManager('.menu--burger.nav__menu')

	// Beauty load
	beautyLoadInit()

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