	let left = 0;
	let right = 0;

	sum =  parseInt(left) + parseInt(right);
	
	let min = 250;
	let max = 2500;
	let increment = max/100;
	let width = slider.offsetWidth / 100;
	
	thumbLeftNumber.innerHTML = 175 + 'грн';
	thumbRightNumber.innerHTML = max - 100 + 'грн';

	slider.addEventListener('mousedown', (event)=> {
		event.preventDefault();
		let target = event.target;
		if(target.className !== 'thumb') return;
		if( !slider.contains(target) ) return;
		
		if(target.dataset.thumb == 'left') {
			document.addEventListener('mousemove', onMouseMoveLeft);
			document.addEventListener('mouseup', onMouseUpLeft);
			
			function onMouseUpLeft() {
				document.removeEventListener('mouseup', onMouseUpLeft);
				document.removeEventListener('mousemove', onMouseMoveLeft);
			};
			
			function onMouseMoveLeft(event) {
				left = event.clientX - slider.getBoundingClientRect().left;
				if(left < 0) {
					left = 0;
					return;
				}
				sum = parseInt(left) + parseInt(right);
				
				if(sum > slider.offsetWidth - target.offsetWidth * 3) {
					left = left;
					return;
				}
				if(sum > 110) {
					thumbLeftNumber.style.top = '300%';
					thumbRightNumber.style.top = '';
				}
				if(sum < 110) {
					thumbLeftNumber.style.top = '';
				}
				let priceMin = Math.round( (event.clientX - slider.getBoundingClientRect().left) / width );
				thumbLeftNumber.innerHTML =  priceMin * increment + ' грн';
				
				target.style.left = left + 'px';
				price.style.left = left + 'px';
			}
		
		}
		if(target.dataset.thumb == 'right') {
			document.addEventListener('mousemove', onMouseMoveRight);
			document.addEventListener('mouseup', onMouseUpRight);
			
			function onMouseUpRight() {
				document.removeEventListener('mouseup', onMouseUpRight);
				document.removeEventListener('mousemove', onMouseMoveRight);
			};
			function onMouseMoveRight(event) {
				right = slider.getBoundingClientRect().right - event.clientX;
				if(right < 0) {
					right = 0;
					return;
				}
				
				sum = parseInt(left) + parseInt(right);
				if(sum > slider.offsetWidth - target.offsetWidth * 3) {
					right = right;
					return;
				}
				if(sum > 110) {
					thumbRightNumber.style.top = '300%';
					thumbLeftNumber.style.top = '';
				}
				if(sum < 110) {
					thumbRightNumber.style.top = '';
				}
				let priceMax = Math.round( (event.clientX - slider.getBoundingClientRect().left) / width );
				thumbRightNumber.innerHTML = priceMax * increment + ' грн';

				target.style.right = right + 'px';
				price.style.right = right + 'px';
			}
		}
		 slider.ondragstart = function() {
			return false;
		};
	});
	/*---------------- mobile ---------------*/
	slider.addEventListener('touchstart', (event)=> {
		event.preventDefault();
		let target = event.target;
		if(target.className !== 'thumb') return;
		if( !slider.contains(target) ) return;
		
		if(target.dataset.thumb == 'left') {
			document.addEventListener('touchmove', onMouseMoveLeft);
			document.addEventListener('touchend', onMouseUpLeft);
			
			function onMouseUpLeft() {
				document.removeEventListener('touchend', onMouseUpLeft);
				document.removeEventListener('touchmove', onMouseMoveLeft);
			};
			
			function onMouseMoveLeft(event) {
				left = event.targetTouches[0].clientX - slider.getBoundingClientRect().left;
				if(left < 0) {
					left = 0;
					return;
				}
				sum = parseInt(left) + parseInt(right);
				
				if(sum > slider.offsetWidth - target.offsetWidth * 3) {
					left = left;
					return;
				}
				if(sum > 110) {
					thumbLeftNumber.style.top = '300%';
					thumbRightNumber.style.top = '';
				}
				if(sum < 110) {
					thumbLeftNumber.style.top = '';
				}
				let priceMin = Math.round( (event.targetTouches[0].clientX - slider.getBoundingClientRect().left) / width );
				thumbLeftNumber.innerHTML =  priceMin * increment + ' грн';
				
				target.style.left = left + 'px';
				price.style.left = left + 'px';
			}
		
		}
		if(target.dataset.thumb == 'right') {
			document.addEventListener('touchmove', onMouseMoveRight);
			document.addEventListener('touchend', onMouseUpRight);
			
			function onMouseUpRight() {
				document.removeEventListener('touchend', onMouseUpRight);
				document.removeEventListener('touchmove', onMouseMoveRight);
			};
			function onMouseMoveRight(event) {
				right = slider.getBoundingClientRect().right - event.targetTouches[0].clientX;
				if(right < 0) {
					right = 0;
					return;
				}
				
				sum = parseInt(left) + parseInt(right);
				if(sum > slider.offsetWidth - target.offsetWidth * 3) {
					right = right;
					return;
				}
				if(sum > 110) {
					thumbRightNumber.style.top = '300%';
					thumbLeftNumber.style.top = '';
				}
				if(sum < 110) {
					thumbRightNumber.style.top = '';
				}
				let priceMax = Math.round( (event.targetTouches[0].clientX - slider.getBoundingClientRect().left) / width );
				thumbRightNumber.innerHTML = priceMax * increment + ' грн';

				target.style.right = right + 'px';
				price.style.right = right + 'px';
			}
		}
		 slider.ondragstart = function() {
			return false;
		};
	});