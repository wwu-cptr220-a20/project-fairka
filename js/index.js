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


const URL_TEMPLATE = "https://itunes.apple.com/search?entity=song&limit=20&term=";

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

const Rock = {results:[ {Name: "AC/DC", artworkUrl: "https://exclaim.ca/images/acdc-logo.jpg" }, {Name: "Led Zeppelin", artworkUrl: "https://cdn-7.famouslogos.us/images/led-zeppelin-logo.jpg"}, {Name: "Aerosmith", artworkUrl: "https://i.pinimg.com/originals/05/e7/f4/05e7f4a0c92241a307729edad4d903c4.jpg"}, {Name:" Nirvana", artworkUrl: "https://merchbar.imgix.net/product/105/6519/4176053698642/SiDI5S3a37side-1.png?w=1280&h=1280&quality=60&auto=compress%252Cformat"}, {Name: "Queen", artworkUrl: "https://imgs.smoothradio.com/images/26964?crop=16_9&width=660&relax=1&signature=NVCgtyi1KSEvzRoufqfsYlI01LY="}, {Name: "Guns N' Roses" artworkUrl: "https://logos-world.net/wp-content/uploads/2020/04/Guns-N-Roses-Logo.png"}]};
const Rap =  {results:[ {Name: "Drake", artworkUrl: "https://cdn.vox-cdn.com/thumbor/NUX0Sfdb8V3xVviUIB3fgHM_ALw=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19858387/header_drake_red_carpet_DRAKEWATCH0120.jpg"}, {Name: "Kanye West", artworkUrl:"https://upload.wikimedia.org/wikipedia/commons/0/0f/Kanye_West_at_the_2009_Tribeca_Film_Festival-2_%28cropped%29.jpg"}, {Name: "lil uzi vert" , artworkUrl: "https://media.pitchfork.com/photos/5f3d4c25ffb741673557a615/16:9/w_1600,h_900,c_limit/Lil-Uzi-Vert.jpg"}, {Name: "Travis Scott", artworkUrl: "https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F200909094728-travis-scott-2019.jpg"}, {Name: "JCole", artworkUrl: "data:image/jpeg;base64,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"}, {Name: "Juice WRLD", artworkUrl: "https://i.guim.co.uk/img/media/cd59a408307ade77175cbef95d736687c971baf6/0_1869_5792_3473/master/5792.jpg?width=1200&quality=85&auto=format&fit=max&s=031d3d3727943978557d83e9f55a38cc" }]};
// const Pop = {results:[ {Name: "Beyonce" }, {Name: "Billie Eilish"}, {Name: "LadyGaga"}, {Name: "Ariana Grande"}, {Name: "Taylor Swift"}, {Name: "Post Malone"}]};
// const Classical = {results:[ {Name: "Beethoven" , artworkUrl:}, {Name: "Bach", artworkUrl:}, {Name: "Debussy", artworkUrl:}, {Name: "Mozart", artworkUrl:}, {Name: "Brahms", artworkUrl:}, {Name: "Shubert", artworkUrl:}]};
// const Folk = {results:[ {Name: "Bob Dylan", artworkUrl: }, {Name: "Judy Collins", artworkUrl:}, {Name: "Pete Seeger", artworkUrl:}, {Name: "Joni Mitchell", artworkUrl:}, {Name: "Woody Guthrie", artworkUrl:}, {Name: "Gordon Lightfoot", artworkUrl:}]};


function renderArtists(Genre) {
  var img = document.createElement("img");
  img.src = Genre.artworkUrl;
  img.alt = Genre.Name;
  img.title = Genre.Name;
  document.querySelector("#GenreResults").appendChild(img);
}


function checkCheckboxes(){
if(document.getElementById("pop").checked == true){
getSurveyResults(Pop);
} else if(document.getElementById("classic").checked == true){
  getSurveyResults(Classical);
} else if(document.getElementById("rock").checked == true){
  getSurveyResults(Rock);;
} else if(document.getElementById("folk").checked == true){
  getSurveyResults(Folk);
} else if(document.getElementById("rap").checked == true){
  getSurveyResults(Rap);;
} else {
   return;
}
}


var submitbtn = document.getElementsByClassName("#subbutton");
submitbtn.addEventListener('click', function (event){
  checkCheckboxes();
  event.preventDefault;
});


function getSurveyResults(obj){
  while (document.querySelector("#GenreResults").firstChild) {
    document.querySelector("#GenreResults").removeChild(document.querySelector("#GenreResults").firstChild);
  }
  
  if (obj.results == "") {
    renderError(new Error("No results found"));
  } else {
    for (let i = 0; i < obj.results.length; i++) {
      renderArtists(obj.results[i]);
    }
  }
}
