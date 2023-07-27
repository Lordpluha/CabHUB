import focusManager from 'focus-manager'

export const closePreloader = () => {
	document.querySelector('.preloader').classList.add('loaded')
	document.querySelector('body').classList.remove('lock')
}

// Getting data from order now form
export const getDataFromForm = () => {
	document.forms.order_now
		.addEventListener('submit', (e) => {
			const res = {}
			e.preventDefault()
			for(const [key, val] of Object.entries(e.target.elements)) {
				res[key] = val.value
			}
			alert(JSON.stringify(res))
		})
}

const initFocusManager = (elClass) => {
	const dialog = document.querySelector(elClass)

	// Listen for clicks on the open button
	const openFocus = () => {
		focusManager.capture(dialog)
	}

	// Listen for clicks on the close button
	const closeFocus = () => {
		focusManager.release(dialog)
	}

	return [openFocus, closeFocus]
}

// Burger show/hide
const ToggleBurger = (openFocus, closeFocus) => {
	let burger__menu = document.querySelector('.menu--burger.nav__menu')
	if (burger__menu) {
		burger__menu.classList.toggle('open')
		burger__menu.classList.contains('open') ? openFocus() : closeFocus()
		document.querySelector('body').classList.toggle('lock')
	}
}

// Navigation changing
const switchBurger = () => {
	const current_height = window.innerHeight,
		current_width = window.innerWidth,
		burger__menu = document.querySelector('.menu.nav__menu'),
		burger__button = document.querySelector('.nav__menu .menu__button')


	if (current_width <= 840) {
		burger__menu.classList.remove('menu--default')
		burger__menu.classList.add('menu--burger')
		burger__button.ariaHidden = false


		burger__menu.classList.remove('open')
	} else {
		burger__menu.classList.remove('menu--burger')
		burger__menu.classList.add('menu--default')
		burger__button.ariaHidden = true

		burger__menu.classList.remove('open')
		document.querySelector('body').classList.remove('lock')

	}
}

// Open order-now
export const openOrderNow = () => {
	document.querySelectorAll('a.open-order-now').forEach(el => {
		el.addEventListener('click', (event) => {
			event.preventDefault()
			document.querySelector('dialog.order-now').showModal()
			document.querySelector('body').classList.add('lock')
		})
	})
}

// Form transform
export const formTransform = () => {
	const formInputs = {
		'#date': 'date',
		'#time': 'time',
		'#start': 'time',
		'#end': 'time'
	}

	for(const [key, value] of Object.entries(formInputs)) {
		document.querySelector(key).addEventListener('focus', (e)=> e.target.type = value)
		document.querySelector(key).addEventListener('blur', (e)=> e.target.type = 'text')
	}
}

// Burger initialization
export const burgerInit = () => {
	const [openBurgerFocus, closeBurgerFocus] = initFocusManager('.menu--burger.nav__menu')

	switchBurger()
	const burger__button = document.querySelector('.menu--burger.nav__menu .menu__button')
	if (burger__button) burger__button.addEventListener('click', () => {ToggleBurger(openBurgerFocus, closeBurgerFocus)})

	// Burger links functionality
	for(const [_, val] of Object.entries(document.getElementsByClassName('menu__link'))) {
		val.addEventListener('click', ()=>{
			document.querySelector('.menu__link.active').classList.remove('active')
			val.classList.add('active')
			ToggleBurger(openBurgerFocus, closeBurgerFocus)
		})
	}
}