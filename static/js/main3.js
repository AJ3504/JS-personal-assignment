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
//-----------여기까지 api 내려옴----------------------//

// 2.화면에 붙이기

//함수 showMovies
let showMovies = async () => {
  let movies = await fetchMovieData();

  movies.forEach((movie) => {
    let { poster_path, title, overview, vote_average, id } = movie;

    let movieCard = document.createElement("div");
    movieCard.className = "movie-card";

    let posterPathElement = document.createElement("img");
    posterPathElement.src = `https://image.tmdb.org/t/p/w500/${poster_path}`;

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

    cardList.append(movieCard);
  });
};

const searchMovies = async () => {
  // 1. movies 가져오기.
  // 1-1. movies를 전역 변수로 만들어서, 그냥 바로 사용하기.$
  // 1-2. 위에처럼, 그냥 다시 한번 fetchMovieData 실행하기
  // 2. movies 필러팅 하기 filter 함수 써서 하기
  // 3. filteredMovies를 화면에 그리기
  // 3-1. event.preventDefault 사용하기 (form 안에서 submit하는 버튼이 있으면, 새로고침됨;;)
  // 3-2 기존에 화면에 그려져 있는 무비 카드들 지우기
  // 3-3 이제 다시 위에서랑 똑같이 그려주기
};

// 첫 화면에 무비 리스트 보여주기
showMovies();
