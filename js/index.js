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



////////////////Survey data

// const Rock = {results:[ {Name: "AC/DC", artworkUrl: "https://exclaim.ca/images/acdc-logo.jpg" }, {Name: "Led Zeppelin", artworkUrl: "https://cdn-7.famouslogos.us/images/led-zeppelin-logo.jpg"}, {Name: "Aerosmith", artworkUrl: "https://i.pinimg.com/originals/05/e7/f4/05e7f4a0c92241a307729edad4d903c4.jpg"}, {Name:" Nirvana", artworkUrl: "https://merchbar.imgix.net/product/105/6519/4176053698642/SiDI5S3a37side-1.png?w=1280&h=1280&quality=60&auto=compress%252Cformat"}, {Name: "Queen", artworkUrl: "https://imgs.smoothradio.com/images/26964?crop=16_9&width=660&relax=1&signature=NVCgtyi1KSEvzRoufqfsYlI01LY="}, {Name: "Guns N' Roses" artworkUrl: "https://logos-world.net/wp-content/uploads/2020/04/Guns-N-Roses-Logo.png"}]};
// const Rap =  {results:[ {Name: "Drake", artworkUrl: "https://cdn.vox-cdn.com/thumbor/NUX0Sfdb8V3xVviUIB3fgHM_ALw=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19858387/header_drake_red_carpet_DRAKEWATCH0120.jpg"}, {Name: "Kanye West", artworkUrl:"https://upload.wikimedia.org/wikipedia/commons/0/0f/Kanye_West_at_the_2009_Tribeca_Film_Festival-2_%28cropped%29.jpg"}, {Name: "lil uzi vert" , artworkUrl: "https://media.pitchfork.com/photos/5f3d4c25ffb741673557a615/16:9/w_1600,h_900,c_limit/Lil-Uzi-Vert.jpg"}, {Name: "Travis Scott", artworkUrl: "https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F200909094728-travis-scott-2019.jpg"}, 
// const Pop = {results:[ {Name: "Beyonce" }, {Name: "Billie Eilish"}, {Name: "LadyGaga"}, {Name: "Ariana Grande"}, {Name: "Taylor Swift"}, {Name: "Post Malone"}]};
// const Classical = {results:[ {Name: "Beethoven" , artworkUrl:}, {Name: "Bach", artworkUrl:}, {Name: "Debussy", artworkUrl:}, {Name: "Mozart", artworkUrl:}, {Name: "Brahms", artworkUrl:}, {Name: "Shubert", artworkUrl:}]};
// const Folk = {results:[ {Name: "Bob Dylan", artworkUrl: }, {Name: "Judy Collins", artworkUrl:}, {Name: "Pete Seeger", artworkUrl:}, {Name: "Joni Mitchell", artworkUrl:}, {Name: "Woody Guthrie", artworkUrl:}, {Name: "Gordon Lightfoot", artworkUrl:}]};


// function renderArtists(Genre) {
//   var img = document.createElement("img");
//   img.src = Genre.artworkUrl;
//   img.alt = Genre.Name;
//   img.title = Genre.Name;
//   document.querySelector("#GenreResults").appendChild(img);
// }


// function checkCheckboxes(){
// if(document.getElementById("pop").checked == true){
// getSurveyResults(Pop);
// } else if(document.getElementById("classic").checked == true){
//   getSurveyResults(Classical);
// } else if(document.getElementById("rock").checked == true){
//   getSurveyResults(Rock);
// } else if(document.getElementById("folk").checked == true){
//   getSurveyResults(Folk);
// } else if(document.getElementById("rap").checked == true){
//   getSurveyResults(Rap);
// } else {
//    return;
// }
// }


// var submitbtn = document.getElementsByClassName("#subbutton");
// submitbtn.addEventListener('click', function (event){
//   checkCheckboxes();
//   event.preventDefault;
// });


// function getSurveyResults(obj){
//   while (document.querySelector("#GenreResults").firstChild) {
//     document.querySelector("#GenreResults").removeChild(document.querySelector("#GenreResults").firstChild);
//   }
  
//   if (obj.results == "") {
//     renderError(new Error("No results found"));
//   } else {
//     for (let i = 0; i < obj.results.length; i++) {
//       renderArtists(obj.results[i]);
//     }
//   }
// }

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