'use strict';



const Rock = { results: [{ Name: "AC/DC", artworkUrl: "img/acdc-logo.jpg" }, { Name: "Led Zeppelin", artworkUrl: "img/led-zeppelin-logo.jpg" }, { Name: "Aerosmith", artworkUrl: "https://i.pinimg.com/originals/05/e7/f4/05e7f4a0c92241a307729edad4d903c4.jpg" }, { Name: " Nirvana", artworkUrl: "https://merchbar.imgix.net/product/105/6519/4176053698642/SiDI5S3a37side-1.png?w=1280&h=1280&quality=60&auto=compress%252Cformat" }, { Name: "Queen", artworkUrl: "https://imgs.smoothradio.com/images/26964?crop=16_9&width=660&relax=1&signature=NVCgtyi1KSEvzRoufqfsYlI01LY=" }, { Name: "Guns N' Roses", artworkUrl: "https://logos-world.net/wp-content/uploads/2020/04/Guns-N-Roses-Logo.png" }] };
const Rap = { results: [{ Name: "Drake", artworkUrl: "https://cdn.vox-cdn.com/thumbor/NUX0Sfdb8V3xVviUIB3fgHM_ALw=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19858387/header_drake_red_carpet_DRAKEWATCH0120.jpg" }, { Name: "Kanye West", artworkUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Kanye_West_at_the_2009_Tribeca_Film_Festival-2_%28cropped%29.jpg" }, { Name: "lil uzi vert", artworkUrl: "https://media.pitchfork.com/photos/5f3d4c25ffb741673557a615/16:9/w_1600,h_900,c_limit/Lil-Uzi-Vert.jpg" }, { Name: "Travis Scott", artworkUrl: "https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F200909094728-travis-scott-2019.jpg" }, { Name: "Lil Wayne", artworkUrl: "https://i.guim.co.uk/img/media/282ad68589d12c94a9439aad73181466d75c54eb/0_150_3600_2160/master/3600.jpg?width=445&quality=85&auto=format&fit=max&s=58b8d3545063ee6808efe26627013d00" }] };
const Pop = { results: [{ Name: "Beyonce", artworkUrl: "https://c.files.bbci.co.uk/791C/production/_114240013_gettyimages-1253172998.jpg" }, { Name: "Billie Eilish", artworkUrl: "https://i.insider.com/5e4592eb96eee61745467405?width=1200&format=jpeg" }, { Name: "LadyGaga", artworkUrl: "https://pbs.twimg.com/profile_images/1313511963754811393/bxXDjWqp.jpg" }, { Name: "Ariana Grande", artworkUrl: "https://www.biography.com/.image/t_share/MTQ3MzM3MTcxNjA5NTkzNjQ3/ariana_grande_photo_jon_kopaloff_getty_images_465687098.jpg" }, { Name: "Taylor Swift", artworkUrl: "https://static01.nyt.com/images/2020/11/18/arts/16taylor-masters/merlin_179096598_efc4232d-7251-4c29-b1c3-b4c4fb4d22fb-mobileMasterAt3x.jpg" }, { Name: "Post Malone", artworkUrl: "https://static.highsnobiety.com/thumbor/4ch_KyH7KHgg7Y_J1saA26VbDUI=/1600x1067/static.highsnobiety.com/wp-content/uploads/2020/02/14154336/post-malone-new-record.jpg" }] };
const Classical = { results: [{ Name: "Beethoven", artworkUrl: "https://www.biography.com/.image/c_fill%2Ccs_srgb%2Cfl_progressive%2Ch_400%2Cq_auto:good%2Cw_620/MTI2NTgyMzIxOTcyMjU5NDU5/beethoven-600x600jpg.jpg" }, { Name: "Bach", artworkUrl: "https://media.wnyc.org/i/800/0/l/85/1/bach.png" }, { Name: "Debussy", artworkUrl: "https://static.dw.com/image/16181720_304.jpg" }, { Name: "Mozart", artworkUrl: "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTY1NjYxNDYyNDc4NDY0Mjg3/wolfgang-amadeus-mozart-circa-1780-painted-by2-johann-nepomuk-della-croce-wolfgang-amadeus-mozart-27-january-1756---5-december-1791-prolific-and-influential-austrian-composer-of-the-classical-era-phot.jpg" }, { Name: "Brahms", artworkUrl: "https://upload.wikimedia.org/wikipedia/commons/1/15/JohannesBrahms.jpg" }, { Name: "Shubert", artworkUrl: "https://i.ytimg.com/vi/mchezMY3AK0/maxresdefault.jpg" }] };
const Folk = { results: [{ Name: "Bob Dylan", artworkUrl: "https://media.newyorker.com/photos/59097443ebe912338a3777a8/4:3/w_1703,h_1277,c_limit/641024_r27604.jpg" }, { Name: "Judy Collins", artworkUrl: "https://talbotspy.org/files/2020/03/judy-collins-2019-cr-brad-Trent-billboard-1548.jpg"}, { Name: "Pete Seeger", artworkUrl: "https://static01.nyt.com/images/2014/01/31/arts/20140131seeger-adv-obit-slide-9WAT/20140131seeger-adv-obit-slide-9WAT-superJumbo.jpg" }, { Name: "Joni Mitchell", artworkUrl: "https://i.guim.co.uk/img/media/fac5a42ffff614a5eaa958c02eee13d7547f656e/327_1036_5116_3068/master/5116.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=6e2ed149a786011651b49dfe131b5f2a" }, { Name: "Woody Guthrie", artworkUrl: "https://upload.wikimedia.org/wikipedia/commons/0/09/Woody_Guthrie_2.jpg" }, { Name: "Gordon Lightfoot", artworkUrl: "https://www.rollingstone.com/wp-content/uploads/2019/03/shutterstock_8012348f.jpg" }] };

var GenRe = document.querySelector("#GenreResults");
function renderArtists(Genre) {
    var genre = document.createElement("img");
    genre.src = Genre.artworkUrl;
    genre.alt = Genre.Name;
    genre.title = Genre.Name;
    GenRe.appendChild(genre);
    genre.addEventListener("click", function(){
        fetchArtist(genre.title);
    });

}

let btnTest = document.getElementById("submit")
btnTest.addEventListener("click", function () {
    checkCheckboxes();
})

function checkCheckboxes() {
    if (document.getElementById("pop").checked) {
        getSurveyResults(Pop);
    } else if (document.getElementById("rock").checked) {
        getSurveyResults(Rock);
    } else if (document.getElementById("classic").checked) {
        getSurveyResults(Classical);
    } else if (document.getElementById("folk").checked) {
        getSurveyResults(Folk);
    } else if (document.getElementById("rap").checked) {
        getSurveyResults(Rap);
    } else {
        return;
    }
}

function getSurveyResults(obj) {
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
function renderError(error) {//renders the error to the GenreResults div
    var object = document.createElement('p');
    object.classList.add("alert");
    object.classList.add("alert-danger");
    object.textContent = error.message;
    document.getElementById("GenreResults").append(object);
}



function renderSearch(obj) {//renders search while clearing old and adding error check
    while (GenRe.firstChild) {
      GenRe.removeChild(GenRe.firstChild);
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

function fetchArtist(search) {//gets 25 songs from search

  var promise = fetch(URL_TEMPLATE + search)
    .then((response => {
      return response.json()
    }))
    .then(renderSearch)
    .catch(renderError)
  return promise
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

function renderTrack(song) {
    var track = document.createElement("img");//renders song img
    track.src = song.artworkUrl100;
    track.alt = song.trackName;
    track.title = song.trackName;
    track.addEventListener("click", function () {
      playTrackPreview(song, track)
    });
    GenRe.appendChild(track);
  }