import {
	closePreloader,
	burgerInit,
	openOrderNow,
	getDataFromForm,
	formTransform
} from './modules/design.js'
import { beautyLoadInit } from './modules/beauty_load.js'

// Testing browser for supports and some static funcs
document.addEventListener('DOMContentLoaded', () => {
	// webpfuncs.testWebP(()=>{})
})

// On page load event
window.onload = () => {
	closePreloader()

	// Burger
	burgerInit()

	// Beauty load
	beautyLoadInit()

	// Order Now dialog function
	openOrderNow()

	// Getting data from order now form
	getDataFromForm()

	// Form transform
	formTransform()
}

// Dev function
window.onresize = () =>	burgerInit()
