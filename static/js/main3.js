// 1.api요청하는 함수 fetchMovieData()
const fetchMovieData = async () => {
  //
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzFhOWNiZmI5ZmQyYjM0Zjc5NDJhMDE3ZDQzNzk1NCIsInN1YiI6IjY0NzA4OTQ1MTNhMzIwMDEzMzg2MDdhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IRZX6ubYrGSryWyuwy-pz7rwGMOmnbvU9PitigtZTcM",
    },
  };

  const response = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=3",
    options
  );

  const data = await response.json();

  return data.results;
};
// fetchMovieData();
//--------------------------------------------------------------------//

// 2. 화면에 먼저 보여주기
//함수 showMovies
let showMovies = async () => {
  let movies = await fetchMovieData();

  //
  movies.forEach((movie) => {
    let { poster_path, title, overview, vote_average, id } = movie;

    let movieCard = document.createElement("div");
    movieCard.className = "movie-card";
    movieCard.onclick = function () {
      alert(`ID : ${id}`);
    };

    let posterPathElement = document.createElement("img");
    posterPathElement.src = `https://image.tmdb.org/t/p/w400/${poster_path}`;
    posterPathElement.style.marginLeft = "20px";
    posterPathElement.style.marginTop = "20px";

    let titleElement = document.createElement("h3");
    titleElement.textContent = title;
    titleElement.style.marginLeft = "10px";
    titleElement.style.fontSize = "20px";

    let overviewElement = document.createElement("p");
    overviewElement.textContent = overview;
    overviewElement.style.marginLeft = "10px";
    overviewElement.style.marginRight = "10px";
    overviewElement.style.textAlign = "justify";

    let voteAverageElement = document.createElement("p");
    voteAverageElement.textContent = `Rating: ${vote_average}`;
    voteAverageElement.style.marginLeft = "10px";
    voteAverageElement.style.marginRight = "10px";

    let idElement = document.createElement("p");
    idElement.textContent = `id: ${id}`;
    idElement.style.marginLeft = "10px";
    idElement.style.marginRight = "10px";

    movieCard.appendChild(posterPathElement);
    movieCard.appendChild(titleElement);
    movieCard.appendChild(overviewElement);
    movieCard.appendChild(voteAverageElement);
    movieCard.appendChild(idElement);

    let cardList = document.querySelector(".card-list");
    cardList.append(movieCard);
  });
};
showMovies();
//--------------------------------------------------------------------//

//3.검색 -> 필터링해서 보여주기
let sortMovies = async (event) => {
  event.preventDefault(); //🤔이게 있어야 페이지 새로고침이 안되는데... 왜 콘솔에는 에러로 표시될까요

  let movies = await fetchMovieData();

  //필터링
  let searchInput = document.querySelector("#searchInput").value;
  let filteredMovies = movies.filter((movie) => {
    return movie.title === searchInput;
  });

  //
  filteredMovies.forEach((movie) => {
    let { poster_path, title, overview, vote_average, id } = movie;

    let movieCard = document.createElement("div");
    movieCard.className = "movie-card";
    movieCard.onclick = function () {
      alert(`ID : ${id}`);
    };

    let posterPathElement = document.createElement("img");
    posterPathElement.src = `https://image.tmdb.org/t/p/w400/${poster_path}`;

    let titleElement = document.createElement("h3");
    titleElement.textContent = title;

    let overviewElement = document.createElement("p");
    overviewElement.textContent = overview;

    let voteAverageElement = document.createElement("p");
    voteAverageElement.textContent = `Rating: ${vote_average}`;

    let idElement = document.createElement("p");
    idElement.textContent = `id: ${id}`;

    movieCard.appendChild(posterPathElement);
    movieCard.appendChild(titleElement);
    movieCard.appendChild(overviewElement);
    movieCard.appendChild(voteAverageElement);
    movieCard.appendChild(idElement);

    let cardList = document.querySelector(".card-list");
    cardList.innerHTML = ""; //
    cardList.append(movieCard);
  });
};
sortMovies();
