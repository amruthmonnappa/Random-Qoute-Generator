const qouteContainer = document.getElementById("container");
const qouteText = document.getElementById("qoute");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const qouteBtn = document.getElementById("new-qoute");
const loader = document.getElementById("loader")
// Global Variable
let apiQoutes = [];

// Show Loading
function loading(){
  loader.hidden = false;
  qouteContainer.hidden = true;
}
// Hide Loading
function complete(){
  qouteContainer.hidden = false;
  loader.hidden = true;
}
// Show new Qoutes
function newQoute() {
  loading();
  //Pick a random Qoute
  const qoute = apiQoutes[Math.floor(Math.random() * apiQoutes.length)];
  // Check fro author is blank
  if (!qoute.author) {
    author.textContent = "Unknown";
  } else {
    authorText.textContent = qoute.author;
  }
  //Change the class if its lengthy
  if (qoute.text.length > 120) {
    qouteText.classList.add("long-qoute");
  } else {
    qouteText.classList.remove("long-qoute");
  }
  //Set Qoute, Hide Loader
  qouteText.textContent = qoute.text;
  complete()
}

// Creating a API request
async function getQoutes() {
  loading()
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQoutes = await response.json();
    newQoute();
  } catch (error) {
    //Get your error messsage
  }
}

//Tweet a  qoute
function tweetQoute(){
  const twitterUrl = `https://twitter.com/intent/tweet?text=${qouteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

//Adding Eventlistner

qouteBtn.addEventListener('click', newQoute)
twitterBtn.addEventListener('click',tweetQoute)

// on load
getQoutes();
