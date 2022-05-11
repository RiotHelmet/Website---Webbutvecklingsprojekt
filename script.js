let apiKey = "1a08c634ec1bc9d64558c15c3e88cdbf";
popularMovies = [];
actionMovies = [];

async function getMovies() {
  let resPop = await searchPopular();
  console.log(resPop.results);
  let allMovies = [];
  resPop.results.forEach((Object) => {
    allMovies.push(Object);
  });

  document.getElementById("slideContainer").innerHTML += `
  <div class="slideText">
  <h2>${resPop.results[0].title}</h2>
  <div class="slideButtons"> 
  <div class="slidePlay" movieId="${allMovies.indexOf(
    resPop.results[0]
  )}" ><i class="fa-solid fa-circle-play"></i> Play Title </div> 
  <div class="slideInfo" movieId="${allMovies.indexOf(
    resPop.results[0]
  )}" onclick="moreInfo()" > <i class="fa-solid fa-circle-info"></i> More Info </div> 
  </div>
  </div>
  <img src="https://image.tmdb.org/t/p/original${
    resPop.results[0].backdrop_path
  }" class="slideFilm">`;

  resPop.results.forEach((film) => {
    if (resPop.results.indexOf(film) > 9) {
      return false;
    }
    document.getElementById("popular").innerHTML += `<div class="filmDiv">
    <div class="filmHover">
    <div class="overlayContainer">
    <div class="titleDiv">
    <h1>${film.title}</h1>
    </div>
    <div class="overlay">
    <div class="overlayButtons">
    <i class="fa-solid fa-circle-play" id="overlayPlay" movieId="${allMovies.indexOf(
      film
    )}" onclick="play(this)"></i>
    <i class="fa-solid fa-circle-info" id="overlayInfo" movieId="${allMovies.indexOf(
      film
    )}"></i>
    </div>
    </div>
    </div>

    <img src="https://image.tmdb.org/t/p/original${film.backdrop_path}">
    </div>
    <img src="https://image.tmdb.org/t/p/w500${film.poster_path}">
    </div>`;
  });
}
{
  {
    /* <div>${film.vote_average}</div> */
  }
}

async function searchPopular() {
  var url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}`;

  let response = await fetch(url);

  let json = await response.json();
  return json;
}

function play(Object) {
  console.log(Object.getAttribute("movieId"));
}

getMovies();

function moreInfo() {
  let infoBackground = document.getElementById("infoBackground");
  infoBackground.style.display = "flex";
  document.getElementById("infoContainer").style.animation =
    "openInfo 0.2s ease-in-out";
}

function closeInfo() {
  let infoBackground = document.getElementById("infoBackground");
  infoBackground.style.display = "none";
}

function shakeRow() {
  for (var i = 0 + 5 * currentRow, len = 5 + 5 * currentRow; i < len; i++) {
    document.getElementById(`${i}`).style.animation = "shake 0.5s ease-in";
  }
  setTimeout(function () {
    for (var i = 0 + 5 * currentRow, len = 5 + 5 * currentRow; i < len; i++) {
      document.getElementById(`${i}`).style.animation = null;
    }
  }, 1000);
}