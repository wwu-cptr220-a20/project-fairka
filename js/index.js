'use strict';

var button = document.getElementById("button");
var skip = document.getElementById("skip");
var back = document.getElementById("back")
var audio = document.getElementById("player");
var tn = document.getElementById("thmbnail");

button.addEventListener("click", function(){
  if(audio.paused){
    audio.play();
    document.getElementById("playbtn").className = "fas fa-pause";
  } else {
    audio.pause();
    document.getElementById("playbtn").className = "fas fa-play";
  } 
});

skip.addEventListener("click", function(){
    tn.src = "img/coffee.jpg";
    audio.pause();
    audio.src = 'music/coffee.mp3';
    audio.pause();
    audio.load();
    audio.play();
});
back.addEventListener("click", function(){
    tn.src = "img/flowers.jpg";
    audio.pause();
    audio.src = 'music/in love with a ghost.mp3';
    audio.pause();
    audio.load();
    audio.play();
});

var searchonly = document.getElementById("searchonly");

searchonly.addEventListener("click", function(){
    document.querySelector("h4").style.display = "none";
    document.querySelector("section").style.display = "none";
    document.querySelector("h5").style.display = "none";
    document.getElementById("App").style.display = "none";
});


const background = document.querySelector("body");

background.addEventListener("mousemove", (p) => {
    background.style.backgroundPositionX = -p.offsetX + "px";
});