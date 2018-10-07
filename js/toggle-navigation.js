	let nav_item_1 = document.getElementById("nav_center__item-1");
    let nav_item_2 = document.getElementById("nav_center__item-2");
	let nav_item_3 = document.getElementById("nav_center__item-3");

    let inner_nav_1 = document.getElementById("nav_center__inner_nav_1");
    let inner_nav_2 = document.getElementById("nav_center__inner_nav_2");
	let inner_nav_3 = document.getElementById("nav_center__inner_nav_3");

    let span_1 = document.getElementById("nav_center__span-1");
    let span_2 = document.getElementById("nav_center__span-2");
	let span_3 = document.getElementById("nav_center__span-3");

    nav_item_1.onclick = function() {
        inner_nav_1.classList.add('active');
        span_1.classList.add("active");

        inner_nav_2.classList.remove('active');
        span_2.classList.remove('active');
		
		inner_nav_3.classList.remove('active');
        span_3.classList.remove('active');
    }

    nav_item_2.onclick = function() {
        inner_nav_2.classList.add('active');
        span_2.classList.add("active");

        inner_nav_1.classList.remove('active');
        span_1.classList.remove('active');
		
		inner_nav_3.classList.remove('active');
        span_3.classList.remove('active');
    }
	nav_item_3.onclick = function() {
        inner_nav_3.classList.add('active');
        span_3.classList.add("active");
		
		inner_nav_2.classList.remove('active');
        span_2.classList.remove('active');

        inner_nav_1.classList.remove('active');
        span_1.classList.remove('active');
    }