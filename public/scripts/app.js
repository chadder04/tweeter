/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

    function safeEncode(text, ...replacements) {
        var ret = "";
        for (var i = 0; i < text.length; i++) {
            ret += text[i];
            ret += $('<span>').text(replacements[i] || "").html();
        }
        return $(ret);
    }

    function createTweetElement(tweetObj) {
        return safeEncode`
        <article class="tweet">
            <header class="tweet-header">
            <a href="#"><img src="${tweetObj.user.avatars.small}" alt="Avatar" class="user-avatar"></a>
            <a href="#" class="user-fullname">${tweetObj.user.name}</a>
            <a href="#" class="user-username">${tweetObj.user.handle}</a>
            </header>
            <main class="tweet-body">
                <p>${tweetObj.content.text}</p>
            </main>
            <footer class="tweet-footer">
            <span>${tweetObj.created_at} days ago</span>
            <div class="tweet-actions">
                <a href="#"><i class="fa fa-thumbs-up" aria-hidden="true"></i></a>
                <a href="#"><i class="fa fa-flag" aria-hidden="true"></i></a>
                <a href="#"><i class="fa fa-retweet" aria-hidden="true"></i>
                </a>
            </div>
            </footer>
        </article>`;
    }

    function renderTweets(tweets) {
        var allTweets = tweets.map(createTweetElement);
        $('.tweets-container').html(allTweets);
    }

    function loadTweets() {
        $.get("/tweets", function (data) {
            renderTweets(data);
        });
    }

    function formValidation() {
        let tweet = $('.tweet-text');

        if (tweet.val().length > 140) {
            $('#tweet-form').prepend($('<div></div>').addClass('tweet-error').text('Error! Too many characters!').fadeIn(500).fadeOut(5000));
            return false;
        }

        if (tweet.val().length == 0) {
            $('#tweet-form').prepend($('<div></div>').addClass('tweet-error').text('Error! Must tweet something!').fadeIn(500).fadeOut(5000));
            return false;
        }

        if (tweet.val() == " " || tweet.val() == "  ") {
            $('#tweet-form').prepend($('<div></div>').addClass('tweet-error').text('Error! Must add more than spaces!').fadeIn(500).fadeOut(5000));
            return false;
        }

        return true;
    }

    // Attach a submit handler to the form
    $("#tweet-form").submit(function (event) {
        if (!formValidation()) { return false; }

        event.preventDefault();

        var $form = $(this),
            term = $form.find("input[name='s']").val(),
            url = $form.attr("action");


        // Send the data using post
        var posting = $.post(url, $form.serialize());

        posting.done(function (data) {
            // rerun the loadTweets() function to show new tweets
            loadTweets();
            // Set the textarea back to having no value after posting is complete
            $('.tweet-text').val('');
            let counter = $('.counter');
            counter.text(140);
        });

    });

    $('.tweet-compose').on('click', function(e) {
        $('.new-tweet').slideToggle();
        $('.tweet-text').focus();
    });

    loadTweets();

});