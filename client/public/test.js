let width = $(window).width();
let height = width*0.44;
console.log(height + 'px');

$(document).ready(function() {

    $(window).resize(function () {
        location.reload();
        $('.container').css({'top': height + 'px'});
    });

    $(window).scroll(function() {
        // checks if window is scrolled more than 500px, adds/removes solid class
        if($(this).scrollTop() > height) {
            $('.navbar').addClass('solid');
        } else {
            $('.navbar').removeClass('solid');
        }
    });

});
