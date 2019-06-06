function scrape() {
    
    
    try {document.getElementById("legit_tweets").innerHTML = "";}
    catch {}
    var profile;
    var response;

    !function doStuff() {

        profile = prompt("Please enter your twitter handle", "lakers").toLowerCase();
        setTimeout(continueExecution, 4000) // wait four seconds before continuing
        $.getJSON('http://www.whateverorigin.org/get?url=' + 
            encodeURIComponent('https://twitter.com/' + profile) + '&callback=?', function(data) {
            // console.log(data.contents);
            response = data.contents; })
        }();

    function continueExecution() {

        var tag_start_index = response.search(/img class="ProfileAvatar-image/g);

        var tagEstimate =  response.slice(tag_start_index, tag_start_index + 200);
        
        if (tagEstimate.indexOf(".jpg") !== -1) {
            var pic_url_end = tagEstimate.indexOf(".jpg") + 4;
        }

        else if (tagEstimate.indexOf(".jpeg") !== -1) {
            var pic_url_end = tagEstimate.indexOf(".jpeg") + 5;
        }

        else if (tagEstimate.indexOf(".png") !== -1) {
            var pic_url_end = tagEstimate.indexOf(".png") + 4;
        }

        else if (tagEstimate.indexOf(".gif") !== -1) {
            var pic_url_end = tagEstimate.indexOf(".gif") + 4;
        }

        var imgTag = tagEstimate.slice(0, pic_url_end);
        
        var pic_url_start = imgTag.lastIndexOf('"') + 1;

        var img = imgTag.slice(pic_url_start);

        // console.log(img);

            if (profile != null) {
                document.getElementById("legitimize").innerHTML = '<button onclick="legitimize(' + "'" + profile + "'" + ')">Legitimize</button>';
                document.getElementById("tweets").innerHTML = "";
                document.getElementById("pic").innerHTML = "<img src=" + img + "> <br> <a href='https://twitter.com/" + profile + "' target='_blank'>Twitter</a>";
            }

           var tweets = $(response).find('p.TweetTextSize.TweetTextSize--normal.js-tweet-text.tweet-text').get();

           tweets.forEach((t, index) => {
                var li = document.createElement("li");                       // Create a <li> node
                var tweet = document.createTextNode(tweets[index].innerText.replace("http", ' http').replace("pic", " pic"));   // Create a text node
                li.appendChild(tweet);                                       // Append the text to <li>
                document.getElementById("tweets").appendChild(li);           // Append <li> to <ul> with id="tweets"
           })
    }
  }


  function legitimize(profile) {
        document.getElementById("tweets").innerHTML = '';
        document.getElementById("legit_tweets").innerHTML = '<a class="twitter-timeline" data-height="500" data-theme="dark" data-link-color="#F5F8FA" href="https://twitter.com/' + profile + '?ref_src=twsrc%5Etfw">Tweets by ' + profile + '</a>';
        var script= document.createElement('script');
        script.setAttribute("async", "");
        script.src= "https://platform.twitter.com/widgets.js";
        script.charset= "utf-8";
        legit_tweets.appendChild(script);
  }