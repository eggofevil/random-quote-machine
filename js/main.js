var apiURL = 'https://andruxnet-random-famous-quotes.p.mashape.com/';
var tweetBaseURL = 'https://twitter.com/intent/tweet'
var quoteBlock = document.querySelector('#quote-block');
var btnNewQuote = document.querySelector('#btn-new-quote');
var btnTweet = document.querySelector('#btn-tweet');
var btnFB = document.querySelector('.AGFBBtn2');
var tweetURL;
var msgFB;
var response;
var quote;
btnNewQuote.addEventListener('click', getQuote);
btnTweet.addEventListener('click', tweet);

// Load facebook SDK

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

window.fbAsyncInit = function() {
  FB.init({
    appId            : '891727367670223',
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v2.11'    
  });
  FB.AppEvents.logPageView();
  //setting my function for FB button;
  btnFB.addEventListener('click', function(){
    FB.login(function(){
    // Note: The call will only work if you accept the permission request
      FB.api('/me/feed', 'post', {message: msgFB});
    }, {scope: 'publish_actions'});
  });
    
};

function getQuote(){
  var content = quoteBlock.querySelectorAll('p');
  for(var i = 0; i < content.length; i++) {
    quoteBlock.removeChild(content[i]);
  }
  var request = new XMLHttpRequest();
  request.open('GET', apiURL);
  request.setRequestHeader('X-Mashape-Key', '97sapPs2WQmshtLkRQ7kYtjZrNacp1JVl8RjsnkAxBUA198s0h');
  request.setRequestHeader("Accept", "application/json");
  request.responseType = 'json';
  request.addEventListener('load', function() {
    response = request.response;
    if(typeof(response) === 'string') {
      response = JSON.parse(response);
    }
    var quotePara = document.createElement('p');
    quotePara.setAttribute('id', 'quote');
    quotePara.textContent = response.quote;
    quoteBlock.appendChild(quotePara);
    var quoteAuthor = document.createElement('p')
    quoteAuthor.setAttribute('id', 'author');
    quoteAuthor.textContent = response.author;
    quoteBlock.appendChild(quoteAuthor);
    setTwitterMsg(response.quote, response.author);
    setFBMsg(response.quote, response.author);
  });
  request.send();  
}

function setTwitterMsg(quote, author) {
  tweetURL = encodeURI(tweetBaseURL + '?text="' + quote + '"\n\n' + author);
}

function setFBMsg(quote, author) {
  msgFB = '"' + quote + '"\n\n' + author;
}

function tweet() {
  window.open(tweetURL, '_blank');
}

getQuote();

//https://developers.facebook.com/docs/sharing/reference/share-dialog#advancedtopics
