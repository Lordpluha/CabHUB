// Content upploading effect
var AnimItems = document.getElementsByClassName('_anim-elem');

function offset(element) {
	var rect = element.getBoundingClientRect(),
		scrollLeft = window.pageXOffset,
		scrollTop = window.pageYOffset;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft};
}

function animOnScroll () {
	for (var i = 0; i < AnimItems.length; i++) {
		// Текущие параметры елемента
		var AnimItem = AnimItems[i];
		var AnimItemHeight = AnimItem.offsetHeight;
		var AnimItemOffset = offset(AnimItem).top;
		// Часть страницы, при которой срабатывает еффект
		var animStart = 4;
		// Точка налача анимации
		var animItemPoint = window.innerHeight - AnimItemHeight / animStart;
		if (AnimItemHeight > window.innerHeight) {
			animItemPoint = window.innerHeight - window.innerHeight / animStart;
		}
		if ((window.pageYOffset > AnimItemOffset - animItemPoint) && window.pageYOffset < (AnimItemOffset + AnimItemHeight))
		{
			AnimItem.classList.add('_active-fx');
		}
	}
}

export { animOnScroll }
