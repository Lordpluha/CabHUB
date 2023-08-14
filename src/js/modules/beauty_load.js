// Content upploading effect
// import LazyLoad from "vanilla-lazyload"

const offset = el => {
	const rect = el.getBoundingClientRect()
	return { top: rect.top + window.scrollX }
}

const animOnScroll = ([...AnimItems]) => {
	// Часть страницы, при которой срабатывает еффект
	const animStart = 4
	const windowInnerHeight = window.innerHeight
	AnimItems.forEach(el => {
		const AnimItemHeight = el.offsetHeight
		const AnimItemOffset = offset(el).top

		// Точка налача анимации
		let animItemPoint = windowInnerHeight - AnimItemHeight / animStart
		if (AnimItemHeight > windowInnerHeight) animItemPoint = windowInnerHeight - windowInnerHeight / animStart
		if ((window.scrollY > AnimItemOffset - animItemPoint) &&
			window.scrollY < (AnimItemOffset + AnimItemHeight)) {
			el.classList.add('_active-fx')
		}
	})
}

export const beautyLoadInit = () => {
	const AnimElemOnScroll = () => animOnScroll(document.getElementsByClassName('_anim-elem'))
	AnimElemOnScroll()
	window.addEventListener('scroll', AnimElemOnScroll)
}