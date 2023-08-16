import focusManager from 'focus-manager'

export const closePreloader = () => {
	document.querySelector('.preloader').classList.add('loaded')
	document.body.classList.remove('lock')
}

export const initFocusManager = elClass => {
	const dialog = document.querySelector(elClass)
	return [()=>focusManager.capture(dialog), ()=>focusManager.release(dialog)]
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

// Burger show/hide
const ToggleBurger = focusFuncs => {
	const [openFocus, closeFocus] = focusFuncs()
	const burger__menu = document.querySelector('.menu--burger.nav__menu')
	if (burger__menu) {
		burger__menu.classList.toggle('open')
		burger__menu.classList.contains('open') ? openFocus() : closeFocus()
		document.body.classList.toggle('lock')
	}
}

// Navigation changing
export const switchBurger = () => {
	const current_width = window.innerWidth,
		burger__menu = document.querySelector('.menu.nav__menu'),
		burger__button = document.querySelector('.nav__menu .menu__button')
	if (current_width <= 840) {
		burger__menu.classList.remove('menu--default')
		burger__menu.classList.remove('open')
		burger__menu.classList.add('menu--burger')
		burger__button.ariaHidden = false
	} else {
		burger__menu.classList.remove('menu--burger')
		burger__menu.classList.remove('open')
		burger__menu.classList.add('menu--default')
		burger__button.ariaHidden = true
		document.body.classList.remove('lock')
	}
}

const showModal = () => {
	document.querySelector(this.target).classList.add('open')
	document.querySelector(this.target).ariaHidden = false
}
const closeModal = () => {
	document.querySelector(this.target).classList.remove('open')
	document.querySelector(this.target).ariaHidden = true
}

// Open order-now
export const orderNowDialog = burgerFocusCbs => {
	const orderDialog = '.order-now',
		orderDialogElem = document.querySelector(orderDialog),
		orderDialogOpenBtns = document.querySelectorAll('a.open-order-now'),
		orderDialogCloseBtn = document.querySelector(`.order-now__close`),
		[openModalFocus, closeModalFocus] = initFocusManager(`${orderDialog}`)

	let activateElem

	orderDialogOpenBtns.forEach(el => {
		el.addEventListener("click", e => {
			e.preventDefault()
			orderDialogElem.classList.add('open')
			orderDialogElem.ariaHidden = false
			openModalFocus()
			document.body.classList.add('lock')
			activateElem = el
		})
	})

	orderDialogCloseBtn.addEventListener("click", e => {
		e.preventDefault()
		closeModalFocus()
		orderDialogElem.classList.remove('open')
		orderDialogElem.ariaHidden = true
		document.body.classList.remove('lock')
		if(activateElem) activateElem.focus()
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
		document.querySelector(key).addEventListener('focus', e=>e.target.type = value)
		document.querySelector(key).addEventListener('blur', e=>e.target.type = 'text')
	}
}

// Burger initialization
export const burgerInit = burgerFocusFuncs => {
	switchBurger()
	const burger__button = document.querySelector('.menu--burger.nav__menu .menu__button')
	if (burger__button) burger__button.onclick = () => {
		ToggleBurger(burgerFocusFuncs)
	}

	// Burger links functionality
	for(let val of document.getElementsByClassName('menu__link')) {
		val.onclick = e => {
			document.querySelector('.menu__link.active').classList.remove('active')
			e.target.classList.add('active')
			ToggleBurger(burgerFocusFuncs)
		}
	}
}