// Content upploading effect
import LazyLoad from "vanilla-lazyload"

const fallbackImage = "https://watchdiana.fail/blog/wp-content/themes/koji/assets/images/default-fallback-image.png"

const offset = el => {
	const rect = el.getBoundingClientRect()
	return { top: rect.top + window.scrollX }
}

export const VanillaLazyLoadInit = () => {
	window.lazyFunctions = {
		pseudo: el => {
			el.classList.add('pseudo-lz-bg')
			console.log("[ LL ] - " + el.classList)
		}
	}
	const lazyLoadInstance = new LazyLoad({
		// Your custom settings go here
		unobserve_entered: true,
		// use_native: true,
		// threshold: 1,
		// container: document.querySelector("#wrapper"),
		callback_error: img => {
			// Use the following line only if your images have the `srcset` attribute
			img.setAttribute("srcset", fallbackImage)
				.setAttribute("src", fallbackImage)
		},
		callback_enter: element => {
			const lazyFunctionName = element.getAttribute("data-lazy-function"),
				lazyFunction = window.lazyFunctions[lazyFunctionName]
			if (!lazyFunction) return
			lazyFunction(element)
		}
	})
}

// Часть страницы, при которой срабатывает еффект
const animStart = 4,
	windowInnerHeight = window.innerHeight

const animOnScroll = ([...AnimItems]) => {
	AnimItems.forEach(el => {
		const AnimItemHeight = el.offsetHeight,
			AnimItemOffset = offset(el).top

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