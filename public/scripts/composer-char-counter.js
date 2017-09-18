$(document).ready(function () {
    $('.new-tweet').on('keyup', 'textarea', function (e) {
        const charMax = 140;
        const charCounter = $(this).parent().find('.counter');
        const tweetLength = $(this).val().length;
        const charDiff = charMax - tweetLength;
        if (charDiff < 0) {
            charCounter.addClass('too-many-characters');
        } else {
            charCounter.removeClass('too-many-characters');
        }
        charCounter.text(charDiff);
    });
});