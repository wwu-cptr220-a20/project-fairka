'use strict';

// Test data for the testing tests
const EXAMPLE_SEARCH_RESULTS = {results:[{
    artistName: "Queen",
    trackName: "Bohemian Rhapsody",
    previewUrl: "https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/Music3/v4/41/cc/ae/41ccae59-697a-414c-43b5-51bd4d88d535/mzaf_3150742134610995145.plus.aac.p.m4a",
    artworkUrl100: "http://is3.mzstatic.com/image/thumb/Music1/v4/94/92/a3/9492a374-e6e3-8e92-0630-a5761070b0f7/source/100x100bb.jpg",
  }, {
    artistName: "David Bowie",
    trackName: "Starman (2012 Remastered Version)",
    previewUrl: "https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview71/v4/d2/68/ea/d268ea6a-9e8b-fc0b-f519-0e8b59fd9a18/mzaf_6387986799378989474.plus.aac.p.m4a",
    artworkUrl100: "http://is3.mzstatic.com/image/thumb/Music6/v4/ab/4e/d9/ab4ed977-4b96-4791-bcec-e02c94283332/source/100x100bb.jpg",
  }, {
    artistName: "Beyoncé",
    trackName: "Formation",
    previewUrl: "https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview122/v4/5f/d7/5f/5fd75fd8-d0a5-ccb2-7822-bcaedee070fc/mzaf_3356445145838692600.plus.aac.p.m4a",
    artworkUrl100: "http://is1.mzstatic.com/image/thumb/Music20/v4/23/c1/9e/23c19e53-783f-ae47-7212-03cc9998bd84/source/100x100bb.jpg",
}]};

var button = document.getElementById("playButton");
var skip = document.getElementById("skip");
var back = document.getElementById("back")
var audio = document.getElementById("player");
var tn = document.getElementById("thmbnail");

button.addEventListener("click", () => { 
  if (audio.paused) {
    audio.play();
    document.getElementById("playbtn").classList.toggle("fas fa-pause");
    document.getElementById("playbtn").classList.toggle("fas fa-play");
  } else {
    audio.pause();
    document.getElementById("playbtn").classList.toggle("fas fa-play");
    document.getElementById("playbtn").classList.toggle("fas fa-pause");
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


const URL_TEMPLATE = "https://itunes.apple.com/search?entity=song&limit=25&term=";

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

if(typeof module !== 'undefined' && module.exports){
  /* eslint-disable */
  module.exports.EXAMPLE_SEARCH_RESULTS = EXAMPLE_SEARCH_RESULTS;
  if(typeof renderTrack !== 'undefined') 
    module.exports.renderTrack = renderTrack;
  if(typeof renderSearchResults !== 'undefined') 
    module.exports.renderSearchResults = renderSearchResults;
  if(typeof fetchTrackList !== 'undefined') 
    module.exports.fetchTrackList = fetchTrackList;
  if(typeof toggleSpinner !== 'undefined') 
    module.exports.toggleSpinner = toggleSpinner;
  module.exports.playTrackPreview = playTrackPreview;    
}
