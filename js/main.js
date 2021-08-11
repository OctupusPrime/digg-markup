var Slider = new Slider({
	el: '.mobilemenu',
	button: '.mobmenu',
	actirator: 50
});

var $rotation   = document.querySelectorAll('.rotation');
var $i          = document.querySelectorAll('.txt i');
var $itemRotate = document.querySelectorAll('.itemRotate');

var $header     = document.querySelector('.mobmenu');

var $cont       = document.querySelector('.header .wrapper .cont');

var time = 30;
var cc = true;

$(window).scroll(function(){
	$('.change').each(function () {
		var num = $(this).attr('data-num');
		var i =  num%10;
		var step = 1000 * time / num;
		var that = $(this);

		var top = $('.activator').offset().top;
		var windowtop = $(window).scrollTop();
			if(top < windowtop && cc){
				$('.change').addClass('active');
				int = setInterval(function(){
					if (i <= num)
						that.html(i);
					else
						clearInterval(int);
					cc = false;
					i = i + 10;
				}, step);	
			}
	});
});


$rotation.forEach(function(item){
	item.addEventListener('click', function(e){
		e.target.parentNode.parentNode.parentNode.classList.add('active');
	});
});

$i.forEach(function(item){
	item.addEventListener('click', function(e){
		e.target.parentNode.parentNode.parentNode.classList.remove('active');
	});
});

$(document).on('click',function (e) {
	if ($(e.target).closest('.itemRotate').length) return;
		$('.itemRotate').removeClass('active');
});

window.addEventListener('scroll', function() {
	var top = $cont.offsetTop;
	var windowtop = window.pageYOffset;
	if(top - $header.offsetHeight < windowtop)
		$header.classList.add('active');
	else
		$header.classList.remove('active');
});