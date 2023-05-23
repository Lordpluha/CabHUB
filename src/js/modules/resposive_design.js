export const ToggleBurger = () => {
	let burger__menu = document.querySelector('.menu--burger.nav__menu')
	burger__menu.classList.toggle('open')
	document.querySelector('html').classList.toggle('lock')
};

export const switchBurger = () => {
	let current_height = window.innerHeight,
		current_width = window.innerWidth,
		burger__menu = document.querySelector('.menu.nav__menu')

	if (current_width <= 840) {
		burger__menu.classList.remove('menu--default')
		burger__menu.classList.add('menu--burger')

		burger__menu.classList.add('closed')
	} else {
		burger__menu.classList.remove('menu--burger')
		burger__menu.classList.remove('open')
		burger__menu.classList.remove('closed')
		document.querySelector('html').classList.remove('lock')

		burger__menu.classList.add('menu--default')
	}
}