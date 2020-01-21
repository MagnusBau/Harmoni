let width = $(window).width();
let scrollHeight = width*0.44;
let frontpageTableHeight = width*0.46;

$(document).ready(function() {

    //Reload the page when using the browser back and forward button
    $(window).on('popstate', function () {
        location.reload(true);
    });

    $("#frontpage").css({top: frontpageTableHeight + 'px'});

    $(window).resize(function () {
        location.reload();
    });

    $(window).scroll(function() {
        // checks if window is scrolled more than 500px, adds/removes solid class
        if($(this).scrollTop() > scrollHeight) {
            $('.navbar').addClass('solid');
        } else {
            $('.navbar').removeClass('solid');
        }
    });

});
