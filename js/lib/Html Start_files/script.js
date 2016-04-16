var app = {};
app.main = function(){
    $('.sticky').Stickyfill();
    $(window).scroll(app.scrollAction);
    $('a[href^="#"]').on('click',app.smothScroll);
};
app.scrollAction = function(){
    if($(this).scrollTop()>50){ 
        $('.header').addClass('header-minifier');
        $('.header > .logo').addClass('hide');
    }
    else{
        $('.header').removeClass('header-minifier');
        $('.header > .logo').removeClass('hide');
    }
}
app.smothScroll = function(e){
    e.preventDefault();
    var target = this.hash;
    console.log(target);
    var $target = $(target);
    $('html, body').stop().animate({
        'scrollTop': $target.offset().top - 100
    }, 300, 'swing', function () {
        window.location.hash = target;
    });
}

var mascot = {};
mascot.id = "mascot";
mascot.show = function(){
    $('#'+mascot.id).show();
}
mascot.hide = function(){
    $('#'+mascot.id).hide();
}
mascot.resize = function(height){
    $('#'+mascot.id).height(height);
}

$(document).ready(app.main);
