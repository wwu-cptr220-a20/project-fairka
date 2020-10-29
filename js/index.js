'use strict';


var button = document.getElementById("button");
var skip = document.getElementById("skip");
var back = document.getElementById("back")
var audio = document.getElementById("player");
var tn = document.getElementById("thmbnail");

button.addEventListener("click", function () { 
  if (audio.paused) {
    audio.play();
    document.getElementById("playbtn").className = "fas fa-pause";
  } else {
    audio.pause();
    document.getElementById("playbtn").className = "fas fa-play";
  }
});

skip.addEventListener("click", function () {
  tn.src = "img/coffee.jpg";
  audio.pause();
  audio.src = 'music/coffee.mp3';
  audio.pause();
  audio.load();
  audio.play();
});
back.addEventListener("click", function () {
  tn.src = "img/flowers.jpg";
  audio.pause();
  audio.src = 'music/in love with a ghost.mp3';
  audio.pause();
  audio.load();
  audio.play();
});

var searchonly = document.getElementById("searchonly");

searchonly.addEventListener("click", function () {
  document.querySelector("h4").style.display = "none";
  document.querySelector("section").style.display = "none";
  document.querySelector("h5").style.display = "none";
  document.getElementById("App").style.display = "none";
});


//THIS IS THE START OF THE SEARCH BAR AND FUNCTIONALITY OF GYAXO
/////////////////////////////////
////////////////////////////////
var div100 = document.querySelector("#div100");
function renderTrack(song) {
  var track = document.createElement("img");//renders song img
  var grade = document.createElement("div");
  grade.className = "box";
  track.src = song.artworkUrl100;
  track.alt = song.trackName;
  track.title = song.trackName;
  track.addEventListener("click", function () {
    playTrackPreview(song, track)
  });
  grade.appendChild(track);
  div100.appendChild(grade);
 

}

function renderSearch(obj) {//renders search while clearing old and adding error check
  while (div100.firstChild) {
    div100.removeChild(div100.firstChild);
  }
  if (obj.results == "") {
    renderError(new Error("No results found"));
  } else {
    for (let i = 0; i < obj.results.length; i++) {
      renderTrack(obj.results[i]);

    }
  }
}


const URL_TEMPLATE = "https://itunes.apple.com/search?entity=song&limit=1000&term=";

function fetchTop100(search) {//gets 25 songs from search

  var promise = fetch(URL_TEMPLATE + search)
    .then((response => {
      return response.json()
    }))
    .then(renderSearch)
    .catch(renderError)

  return promise
}

var top100 = document.getElementById("top100") //adds an event listner for the button and gets rid of excess eye candy 
top100.addEventListener("click", function (event) {
  fetchTop100(document.querySelector('#searchQuery').value);
  
  document.querySelector("h3").style.display = "none";
  document.querySelector("h4").style.display = "none";
  document.querySelector("section").style.display = "none";
  document.querySelector("h5").style.display = "none";
  document.getElementById("App").style.display = "none";
  event.preventDefault();
});

function renderError(error) {//renders the error to the div100 div
  var object = document.createElement('p');
  object.classList.add("alert");
  object.classList.add("alert-danger");
  object.textContent = error.message;
  div100.append(object);
}

    

const state = { previewAudio: new Audio() };

//Plays the given track, spinning the given image.
function playTrackPreview(track, img) {
  if (state.previewAudio.src !== track.previewUrl) { //if a new track to play
    document.querySelectorAll('img').forEach(function (element) {
      element.classList.remove('fa-spin');
    }); //stop whoever else is spinning
    state.previewAudio.pause(); //pause current
    state.previewAudio = new Audio(track.previewUrl); //create new audio
    state.previewAudio.controls = true;
    state.previewAudio.play(); //play new
    img.classList.add('fa-spin'); //start the spinning
  }
  else {
    if (state.previewAudio.paused) {
      state.previewAudio.play();
      
    } else {
      state.previewAudio.pause();
    }
    img.classList.toggle('fa-spin'); //toggle the spinning
  }
}





