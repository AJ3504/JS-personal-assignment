//1.TMDB API
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzFhOWNiZmI5ZmQyYjM0Zjc5NDJhMDE3ZDQzNzk1NCIsInN1YiI6IjY0NzA4OTQ1MTNhMzIwMDEzMzg2MDdhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IRZX6ubYrGSryWyuwy-pz7rwGMOmnbvU9PitigtZTcM",
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

//2.
//❶로딩 완료
$(document).ready(function () {
  listing();
});

//❷포스팅 : 클라이언트가 요청한 영화들만 접수를 올림
function posting() {
  let title = $("#title").val();
  let overview = $("#overview").val();
  let poster_path = $("#poster_path").val();
  let vote_average = $("#vote_average").val();

  let formData = new FormData();
  formData.append("title_give", title);
  formData.append("overview_give", overview);
  formData.append("poster_path", poster_path);
  formData.append("vote_average", vote_average);

  fetch("/configuration", { method: "POST", body: formData })
    .then((res) => res.json())
    .then((data) => {
      alert(data["msg"]);
      window.location.reload();
    });
}

//❸리스팅 : 카드로 붙임
function listing() {
  fetch("/configuration")
    .then((res) => res.json())
    .then((data) => {
      let rows = data["result"]; //데이터에 result값을 가지고 와라
      $("#cards-box").empty();
      rows.forEach((a) => {
        let title = a["title"];
        let overview = a["overview"];
        let poster_path = a["poster_path"];
        let vote_average = a["vote_average"];

        let temp_html = `<div class="col">
                                        <div class="card h-100">
                                            <img src="${poster_path}"
                                                class="card-img-top">
                                            <div class="card-body">
                                                <h5 class="card-title">${title}</h5>
                                                <p class="card-text">${overview}</p>
                                                <p class="mycomment">${vote_average}</p>
                                            </div>
                                        </div>
                                    </div>`;
        $("#cards-box").append(temp_html);
      });
    });
}
