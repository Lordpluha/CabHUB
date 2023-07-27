// Content upploading effect
var AnimItems = document.getElementsByClassName('_anim-elem');

function offset(element) {
	var rect = element.getBoundingClientRect();
	return { top: rect.top + window.pageYOffset, left: rect.left + window.pageXOffset};
}

function animOnScroll () {
	for (var i = 0; i < AnimItems.length; i++) {
		// Текущие параметры елемента
		const AnimItem = AnimItems[i];
		const AnimItemHeight = AnimItem.offsetHeight;
		const AnimItemOffset = offset(AnimItem).top;
		// Часть страницы, при которой срабатывает еффект
		const animStart = 4;
		// Точка налача анимации
		let animItemPoint = window.innerHeight - AnimItemHeight / animStart;
		if (AnimItemHeight > window.innerHeight) {
			animItemPoint = window.innerHeight - window.innerHeight / animStart;
		}
		if ((window.pageYOffset > AnimItemOffset - animItemPoint) && window.pageYOffset < (AnimItemOffset + AnimItemHeight))
		{
			AnimItem.classList.add('_active-fx');
		}
	}
}

export const beautyLoadInit = () => {
	setTimeout(animOnScroll, 300)
	window.addEventListener('scroll', animOnScroll)
}