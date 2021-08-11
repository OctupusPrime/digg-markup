function Slider(params){

    this.el        = params.el;
    this.button    = params.button;
    var actirator  = params.actirator || 30;

    var $menuWrapper  = document.querySelector(this.el);
    var $menuBar      = document.querySelector(this.el + ' .menu-bar');
    var $overlay      = document.querySelector(this.el + ' .overlay');
    var $menu         = document.querySelectorAll('.menu .menu-li');

    var $button       = document.querySelector(this.button);
    
    var $body = document.body;
    
    var menuWidth = $menuBar.offsetWidth;
    var distance = 0;
    
    var action = false;
    var supportsTouch = false;
    
    var x1 = 0;
    var x2 = 0;
    var savedposition = 0;
    
    //----button----//
    $button.addEventListener('click', function () {
        menuController(menuWidth);
        $menuWrapper.classList.add('animation');
        $menuWrapper.classList.add('active'); 
        savedposition = 300;
        distance = 300;
    });
    
    $overlay.addEventListener('click', function () {
        menuController(0);
        $menuWrapper.classList.add('animation');
        $menuWrapper.classList.remove('active');
        savedposition = 0;
        distance = 0;
    });
    
    //----Controller----//
    function menuController(value) {
        $menuBar.style.transform = 'translateX(' + value + 'px)';
        $menuWrapper.style.opacity = (1 / menuWidth) * value;
        $menuWrapper.classList.add('overflow');
    
        $body.style.cssText = 'overflow : hidden;';
    
        if (value == 0){
            $menuWrapper.classList.remove('overflow');  
    
            $body.style.cssText = 'overflow : visible;';
        }
    }
    
    ///----touch----//
    window.addEventListener("touchstart", function (e) {
        var touch1 = e.changedTouches[0];
        x1 = touch1.clientX;
        if (x1 > actirator) return;
        action = true;
        $menuWrapper.classList.remove('animation');
    });
    $menuWrapper.addEventListener("touchstart", function (e) {
        var touch1 = e.changedTouches[0];
        x1 = touch1.clientX;
        action = true;
        $menuWrapper.classList.remove('animation');
    });
    window.addEventListener("touchend", function (e) {
        action = false;
        savedposition = distance;
        if (distance >= (menuWidth / 2)) {
            menuController(menuWidth);
            savedposition = 300;
        } else {
            menuController(0);
            savedposition = 0;
        }
        $menuWrapper.classList.add('animation');
    });
    window.addEventListener("touchmove", function (e) {
        if (action) {
            var touch2 = e.changedTouches[0];
            x2 = touch2.clientX;
            distance = savedposition + (x2 - x1);
            if (distance >= menuWidth) distance = menuWidth;
            if (distance <= 0) distance = 0;	
            menuController(distance);
            // console.log(distance);
        }
    });
    
        ///----click----///
            window.addEventListener("mousedown", function (e) {
                x1 = e.pageX;
                if (x1 > actirator) return;
                action = true;
                $menuWrapper.classList.remove('animation');
            });
            $menuWrapper.addEventListener("mousedown", function (e) {
                x1 = e.pageX;
                action = true;
                $menuWrapper.classList.remove('animation');
            });
            window.addEventListener("mouseup", function (e) {
                action = false;
                if (distance >= (menuWidth / 2)) {
                    menuController(menuWidth);
                    savedposition = 300;
                    distance = 300;
                } else {
                    menuController(0);
                    savedposition = 0;
                    distance = 0;
                }
                $menuWrapper.classList.add('animation');
            });
        
            window.addEventListener("mousemove", function (e) {
                if (action) {
                    x2 = e.pageX;
                    distance = savedposition + (x2 - x1);
                    if (distance >= menuWidth) distance = menuWidth;
                    if (distance <= 0) distance = 0;	
                    menuController(distance);
                    // console.log(distance);
                }
            });
            
    $menu.forEach(function(e){
        e.addEventListener('click', function(){
            var target = e.getAttribute('data-target');
            var Jqtop =  document.querySelector('[data-scroll="' + target + '"]').parentNode.offsetTop;
            $("html, body").animate({scrollTop : Jqtop}, 1000);
            menuController(0);
            $menuWrapper.classList.add('animation');
            $menuWrapper.classList.remove('active');
            savedposition = 0;
            distance = 0;
        });
    });
}