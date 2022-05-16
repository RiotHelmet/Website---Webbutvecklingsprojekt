let apiKey = "1a08c634ec1bc9d64558c15c3e88cdbf";
popularMovies = [];
actionMovies = [];
let allMovies = [];

let mediaBig = window.matchMedia("(max-width: 1200px)");
let mediaLaptop = window.matchMedia("(max-width: 1000px)");
let mediaTablet = window.matchMedia("(max-width: 800px)");
let mediaMobile = window.matchMedia("(max-width: 700px)");
let mediaSmall = window.matchMedia("(max-width: 450px)");

async function getMovies() {
  let resPop = await searchPopular();
  console.log(resPop.results);
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
  )}" onclick="moreInfo(this)" > <i class="fa-solid fa-circle-info"></i> More Info </div> 
  </div>
  </div>
  <img src="https://image.tmdb.org/t/p/original${
    resPop.results[0].backdrop_path
  }" class="slideFilm" alt="${resPop.results[0].title} backdrop">`;
  if (!mediaTablet.matches) {
    resPop.results.forEach((film) => {
      if (mediaMobile.matches) {
        if (resPop.results.indexOf(film) > 2) {
          return false;
        }
      } else if (mediaLaptop.matches) {
        if (resPop.results.indexOf(film) > 4) {
          return false;
        }
      } else if (mediaBig.matches) {
        if (resPop.results.indexOf(film) > 7) {
          return false;
        }
      } else {
        if (resPop.results.indexOf(film) > 9) {
          return false;
        }
      }

      document.getElementById(
        "popular"
      ).innerHTML += `<div class="filmDiv" onmouseover="loadVideo(this)" movieId="${allMovies.indexOf(
        film
      )}">
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
    <i class="fa-solid fa-circle-info" id="overlayInfo" onclick="moreInfo(this)" movieId="${allMovies.indexOf(
      film
    )}"></i>
    </div>
    </div>
    </div>
    <div class="frame-container" id="frame${allMovies.indexOf(film)}"></div>
    <img src="https://image.tmdb.org/t/p/original${film.backdrop_path}" alt="${
        film.title
      } backdrop">
    </div>
    <img src="https://image.tmdb.org/t/p/w500${film.poster_path}" alt="${
        film.title
      } poster">
    </div>`;
    });
  } else {
    resPop.results.forEach((film) => {
      if (mediaMobile.matches) {
        if (resPop.results.indexOf(film) > 2) {
          return false;
        }
      } else if (mediaLaptop.matches) {
        if (resPop.results.indexOf(film) > 4) {
          return false;
        }
      } else {
        if (resPop.results.indexOf(film) > 9) {
          return false;
        }
      }

      document.getElementById(
        "popular"
      ).innerHTML += `<div class="filmDivMobile" onclick="moreInfo(this)" movieId="${allMovies.indexOf(
        film
      )}">
    <img src="https://image.tmdb.org/t/p/w500${film.poster_path}" alt="${
        film.title
      } backdrop">
    </div>`;
    });
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

function moreInfo(Object) {
  let film = allMovies[Object.getAttribute("movieId")];
  closeInfo();
  let infoBackground = document.getElementById("infoBackground");
  let infoContainer = document.getElementById("infoContainer");
  let infoImage = document.getElementById("infoImage");
  let infoDescription = document.getElementById("infoDescription");
  infoBackground.style.display = "flex";
  infoImage.innerHTML = `
  <h1>${film.title}</h1>
  <img src="https://image.tmdb.org/t/p/original${film.backdrop_path}" alt="${film.title} backdrop"></img>`;

  infoDescription.innerHTML = `<p>${film.overview}</p>`;

  infoContainer.style.animation = "openInfo 0.2s ease-in-out";

  setTimeout(() => {
    let similarTitles = loadSimilar(film.genre_ids, film.title);
    console.log(similarTitles);
    similarTitles.forEach((Index) => {
      // console.log(Index);
      document.getElementById("infoSimilar").innerHTML += `
        <div class="similarMovieDiv" movieId="${allMovies.indexOf(
          Index
        )}" onclick="moreInfo(this)">
          <img src="https://image.tmdb.org/t/p/original${
            Index.poster_path
          }" alt="${film.title} poster">
        </div>`;
    });
  }, 200);
}

function closeInfo() {
  infoContainer.style.animation = "";
  let infoBackground = document.getElementById("infoBackground");
  infoBackground.style.display = "none";
  document.getElementById("infoSimilar").innerHTML = "";
}

function loadSimilar(genreIds, title) {
  let resultArray = [];
  let returnArray = [];

  allMovies.forEach((Movie) => {
    Movie.genre_ids.forEach((genre) => {
      if (genreIds.includes(genre) === true) {
        if (Movie.title !== title) {
          if (resultArray.includes(Movie) === false) {
            resultArray.push(Movie);
          }
        }
      }
    });
  });

  resultArray = shuffle(resultArray);
  if (mediaSmall.matches) {
    for (let i = 0; i < 3; i++) {
      returnArray.push(resultArray[i]);
    }
  } else {
    for (let i = 0; i < 4; i++) {
      returnArray.push(resultArray[i]);
    }
  }

  return returnArray;
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

async function searchVideo(movie) {
  let id = movie.id;

  let key;
  let response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`
  );
  let json = await response.json();
  if (json.results.length > 0) {
    key = json.results[0].key;
    return key;
  }
}

async function loadVideo(Object) {
  let key = await searchVideo(allMovies[Object.getAttribute("movieId")]);
  if (
    document
      .getElementById(`frame${Object.getAttribute("movieId")}`)
      .innerHTML.trim() == ""
  ) {
    if (key !== undefined) {
      document.getElementById(
        `frame${Object.getAttribute("movieId")}`
      ).innerHTML = `<iframe width="1280" height="720" src="https://www.youtube.com/embed/${key}?autoplay=1&mute=1&loop=1&playlist=${key}">`;
    } else {
      document.getElementById(
        `frame${Object.getAttribute("movieId")}`
      ).innerHTML = `<img src="https://image.tmdb.org/t/p/original${
        allMovies[Object.getAttribute("movieId")].backdrop_path
      }" alt="${film.title} poster">`;
    }
  }
}
