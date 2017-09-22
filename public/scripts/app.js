/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function () {

    function safeEncode(text, ...replacements) {
        var ret = "";
        for (var i = 0; i < text.length; i++) {
            ret += text[i];
            ret += $('<span>').text(replacements[i]).html();
        }
        return $(ret);
    }

    function createTweetElement(tweetObj) {
        let tweetDate = moment(tweetObj.created_at).fromNow();
        return safeEncode`
        <article class="tweet" data-tweet-id="${tweetObj._id}" data-tweet-liked="false">
            <header class="tweet-header">
                <a href="#"><img src="${tweetObj.user.avatars.small}" alt="Avatar" class="user-avatar"></a>
                <a href="#" class="user-fullname">${tweetObj.user.name}</a>
                <a href="#" class="user-username">${tweetObj.user.handle}</a>
            </header>
            <main class="tweet-body">
                <p>${tweetObj.content.text}</p>
            </main>
            <footer class="tweet-footer">
                <span>${tweetDate}</span>
                <div class="tweet-actions">
                    <button class="tweet-flag"><i class="fa fa-flag" aria-hidden="true"></i></button>
                    <button class="tweet-retweet"><i class="fa fa-retweet" aria-hidden="true"></i></button>
                    <button class="tweet-like"><i class="fa fa-thumbs-up" aria-hidden="true"></i><span class="tweet-like-number">${tweetObj.likes}</span></button>
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
        let tweet = $('.new-tweet-text');

        if (tweet.val().length > 140) {
            $('#new-tweet-form').prepend($('<div></div>').addClass('tweet-error').text('Error! Too many characters!').fadeIn(500).fadeOut(5000));
            return false;
        }

        if (tweet.val().length == 0) {
            $('#new-tweet-form').prepend($('<div></div>').addClass('tweet-error').text('Error! Must tweet something!').fadeIn(500).fadeOut(5000));
            return false;
        }

        if (tweet.val() == " " || tweet.val() == "  ") {
            $('#new-tweet-form').prepend($('<div></div>').addClass('tweet-error').text('Error! Must add more than spaces!').fadeIn(500).fadeOut(5000));
            return false;
        }

        return true;
    }

    // Attach a submit handler to the form
    $("#new-tweet-form").submit(function (event) {
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
            $('.new-tweet-text').val('');
            let counter = $('.new-tweet-counter');
            counter.text(140);
        });

    });

    $('.tweet-compose').on('click', function (e) {
        $('.new-tweet').slideToggle();
        $('.new-tweet-text').focus();
    });

    loadTweets();

    $('.tweets-container').on('click', '.tweet-like', function(e) {
        let $tweetData = $(this).closest('.tweet');
        let tweetID = $tweetData.data('tweet-id');
        let tweetLiked = $tweetData.attr('data-tweet-liked') === 'true';
        var update = $.ajax({
            url: "/tweets",
            method: "PUT",
            data: { tweetID: tweetID, liked: tweetLiked },
            dataType: "json",
            success(data) {
                $tweetData.attr('data-tweet-liked', !tweetLiked);
                console.log(tweetLiked + ' // ' + $tweetData.attr('data-tweet-liked'));;
            }
          });
          $tweetData.attr('data-tweet-liked', !tweetLiked);
          console.log(tweetLiked + ' // ' + $tweetData.attr('data-tweet-liked'));;
        $(this).toggleClass('too-many-characters');
    });

    $('.tweet-login').on('click', function(e) {
        $('.login-container').slideToggle();
    });

    $('#login-user-form').on('submit', function(e) {
        e.preventDefault();
        
        let $form = $(this);
        let userHandle = $form.find("input[name='userHandle']").val();
        let userPassword = $form.find("input[name='userPassword']").val();
        
        var login = $.ajax({
            url: "/login",
            method: "POST",
            data: { userHandle: userHandle, userPassword: userPassword },
            dataType: "json",
            success(data) {
                showLoggedIn();
                $('.login-container').slideToggle();
            },
            error(data) {
                showLoggedOut();
            }
          });
    });

    $('.tweet-register').on('click', function(e) {
        $('.registration-container').slideToggle();
    });

    function showLoggedIn() {
        $('.tweet-login').addClass('hidden');
        $('.tweet-register').addClass('hidden');
        $('.tweet-compose').removeClass('hidden');
    }

    function showLoggedOut() {
        $('.tweet-login').removeClass('hidden');
        $('.tweet-register').removeClass('hidden');
        $('.tweet-compose').addClass('hidden');
    }

    function validateUser() {
        let validate = $.ajax({
            url: "/login",
            method: "GET",
            dataType: "json",
            success(data) {
                showLoggedIn();
            },
            error(data) {
                showLoggedOut();
            }
          });
    }

    validateUser();

});