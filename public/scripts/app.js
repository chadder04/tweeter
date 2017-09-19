/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

    function safeEncode(text, ...replacements) {
        // console.log(text, replacements);
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
                <a href="#">Link</a>
                <a href="#">Flag</a>
                <a href="#">Report</a>
            </div>
            </footer>
        </article>`;
    }

    // Fake data taken from tweets.json
    var data = [
        {
            "user": {
                "name": "Newton",
                "avatars": {
                    "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
                    "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
                    "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
                },
                "handle": "@SirIsaac"
            },
            "content": {
                "text": "If I have seen further it is by standing on the shoulders of giants"
            },
            "created_at": 1461116232227
        },
        {
            "user": {
                "name": "Descartes",
                "avatars": {
                    "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
                    "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
                    "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
                },
                "handle": "@rd"
            },
            "content": {
                "text": "Je pense , donc je suis"
            },
            "created_at": 1461113959088
        },
        {
            "user": {
                "name": "Johann von Goethe",
                "avatars": {
                    "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
                    "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
                    "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
                },
                "handle": "@johann49"
            },
            "content": {
                "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
            },
            "created_at": 1461113796368
        }
    ];

    function renderTweets(tweets) {
        var allTweets = tweets.map(createTweetElement);
        $('.tweets-container').append(allTweets);
    }

    renderTweets(data);
});