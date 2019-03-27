var tweetButton = document.getElementsByClassName("tweet-button")[0];
var tweetInput = document.getElementsByClassName("tweet-input")[0];
var tweetForm = document.getElementsByClassName("tweet-form")[0];
var charCounter = document.getElementsByClassName("character-counter")[0];

// Habilitar e desabilitar botão
tweetInput.addEventListener("keydown", enableButton);
tweetInput.addEventListener("keyup", enableButton);

function enableButton() {
  tweetButton.disabled = false;
  tweetButton.style.cursor = "pointer";
  tweetButton.style.opacity = "1";
  tweetInput.addEventListener("keydown", startCounting);
  tweetInput.addEventListener("keyup", startCounting);
}

function disableButton () {
  tweetButton.style.opacity = "0.3";
  tweetButton.style.cursor = "not-allowed";
  tweetButton.disabled = true;  
}

// Contar caracteres
function startCounting() {
  var charAllowed = 140;
  var typedChar = tweetInput.value.length;
  var remainingChar = charAllowed - typedChar;
  charCounter.textContent = remainingChar;
  if (typedChar >= 120 && typedChar < 130) { 
    charCounter.style.color = "blue";
  } else if (typedChar >= 130 && typedChar <= 140) {
    charCounter.style.color = "red";
  } else if (typedChar > 140 || typedChar === 0 || !tweetInput.value.trim()) { 
    charCounter.style.color = "lightgrey";
    disableButton();
  } else {
    charCounter.style.color = "black";  
  }
}

// Redimensionar área de texto
tweetInput.addEventListener("keyup", resize);

function resize() {
  if (tweetInput.scrollHeight > tweetInput.offsetHeight) {
    tweetInput.rows += 1;
  }
  if (tweetInput.rows > 10) {
    tweetInput.style.overflow = "auto";
  }
}

// Publicar tweet no feed
tweetButton.addEventListener("click", submitTweet);

function submitTweet(event) {
  var tweetBox = document.createElement("div");
   var publishedTweet = document.createElement("p");
  var insertFeed = document.getElementsByClassName("feed")[0];
  publishedTweet.textContent = tweetInput.value;
  tweetBox.classList.add("tweet-box");
  publishedTweet.classList.add("published-tweet");
  tweetBox.appendChild(publishedTweet);
  insertFeed.appendChild(tweetBox);
  charCounter.textContent = 140;
  tweetForm.reset();
  event.preventDefault();
  disableButton();
}