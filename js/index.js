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


//THIS IS THE START OF THE SEARCH BAR AND FUNCTIONALITY OF GYAXO
/////////////////////////////////
////////////////////////////////
function renderTrack(song) {
  let track = document.createElement('img');
  let caption = document.createElement('div');
  caption.classList.add('carousel-caption');
  let trackName = document.createElement('h3');
  let artistName = document.createElement('p');
  trackName.classList.add('app');
  artistName.classList.add('app');
  let div = document.querySelector('.carousel-inner');
  let newDiv = document.createElement('div');
  newDiv.classList.add('carousel-item');
  trackName.textContent = song.trackName;
  artistName.textContent = song.artistName;
  track.src = song.artworkUrl100;
  track.alt = song.trackName;
  track.classList.add('d-block');
  track.classList.add('w-70');
  track.addEventListener("click", function () {
    playTrackPreview(song, track)
  });
  caption.appendChild(trackName);
  caption.appendChild(artistName);
  newDiv.appendChild(track);
  newDiv.appendChild(caption);
  div.appendChild(newDiv);
}

function renderTrack2(song) {
  let track = document.createElement('img');
  let caption = document.createElement('div');
  caption.classList.add('carousel-caption');
  let trackName = document.createElement('h3');
  let artistName = document.createElement('p');
  trackName.classList.add('app');
  artistName.classList.add('app');
  let div = document.querySelector('.carousel-inner');
  let newDiv = document.createElement('div');
  newDiv.classList.add('carousel-item');
  newDiv.classList.add('active');
  trackName.textContent = song.trackName;
  artistName.textContent = song.artistName;
  track.src = song.artworkUrl100;
  track.alt = song.trackName;
  track.classList.add('d-block');
  track.classList.add('w-70');
  track.addEventListener("click", function () {
    playTrackPreview(song, track)
  });
  caption.appendChild(trackName);
  caption.appendChild(artistName);
  newDiv.appendChild(track);
  newDiv.appendChild(caption);
  div.appendChild(newDiv);
}


function renderSearchResults(listOfSongs) {
  let records = document.querySelector('.carousel-inner');
  while (records.firstChild) {
    records.removeChild(records.firstChild);
  }
  if (listOfSongs.results == '') {
    renderError(new Error("No results found"));
  } 
  else {
    for (let i=0; i < listOfSongs.results.length; i++) {
      if (i == 0) {
        renderTrack2(listOfSongs.results[0]);
      } else {
      renderTrack(listOfSongs.results[i]);
      }
    }
  }
}



function fetchTrackList(searchTerm) {
  let URL_TEMPLATE = 'https://itunes.apple.com/search?entity=song&limit=25&term=' + searchTerm;
  fetch(URL_TEMPLATE)  //start the download
    .then(function(response) {  //when done downloading
        let dataPromise = response.json();  //start encoding into an object
        return dataPromise;  //hand this Promise up
    })
    .then(function(data) {  //when done encoding
        //do something with the data!!
        renderSearchResults(data); //will now be encoded as a JavaScript object!
    })
    .catch(renderError);
} 

let searchButton = document.querySelector('button');

searchButton.addEventListener('click', function(event) {
  event.preventDefault();
  let search = document.querySelector('#searchQuery');
  fetchTrackList(search.value);
  document.querySelector("h3").style.display = "none";
  document.querySelector("section").style.display = "none";
  document.querySelector("h5").style.display = "none";
  document.querySelector("h2").style.display ="none";
  event.preventDefault();
});

function renderError(errorObj) {
  let p = document.createElement('p');
  let records = document.querySelector('#records');
  p.classList.add('alert');
  p.classList.add('alert-danger');
  p.textContent = errorObj.message;
  records.appendChild(p);
}

    

const state = { previewAudio: new Audio() };

//Plays the given track, spinning the given image.
function playTrackPreview(track) {
  if (state.previewAudio.src !== track.previewUrl) { //if a new track to play
    document.querySelectorAll('img').forEach(function (element) {
      element.classList.remove('fa-spin');
    }); //stop whoever else is spinning
    state.previewAudio.pause(); //pause current
    state.previewAudio = new Audio(track.previewUrl); //create new audio
    state.previewAudio.controls;
    state.previewAudio.play(); //play new
    
  }
  else {
    if (state.previewAudio.paused) {
      state.previewAudio.play();
      
    } else {
      state.previewAudio.pause();
    }
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

