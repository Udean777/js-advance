// simplified
const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async () => {
  try {
    const inputKeyword = document.querySelector(".input-keyword");
    const movies = await getMovies(inputKeyword.value);
    updateUI(movies);
  } catch (error) {
    alert(error);
  }
});

const getMovies = (keyword) => {
  return fetch(`http://www.omdbapi.com/?apikey=ac137c29&s=${keyword}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      if (response.Response === "False") {
        throw new Error(response.Error);
      }
      return response.Search;
      //   console.log(response);
    });
};

const updateUI = (movies) => {
  let cards = "";
  movies.forEach((m) => (cards += showCards(m)));
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = cards;
};

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("modal-detail-button")) {
    try {
      const imdbid = e.target.dataset.imdbid;
      const movieDetail = await getMovieDetail(imdbid);
      updateUIDetail(movieDetail);
    } catch (error) {
      alert(error);
    }
  }
});

// show modal
const getMovieDetail = (imdbid) => {
  return fetch(`http://www.omdbapi.com/?apikey=ac137c29&i=${imdbid}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((m) => {
      if (m.Response === "False") {
        throw new Error(m.Error);
      }
      return m;
    });
};

const updateUIDetail = (m) => {
  const movieDetail = showMovieDetails(m);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = movieDetail;
};

const showCards = (m) => {
  return `<div class="col-md-4 my-5">
    <div class="card">
      <img src="${m.Poster}" class="card-img-top" alt="" />
      <div class="card-body">
        <h5 class="card-title">${m.Title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
        <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal"
        data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
      </div>
    </div>
  </div>`;
};

// modal body
const showMovieDetails = (m) => {
  return `<div class="container-fluid">
  <div class="row">
    <div class="col-md-3">
      <img src="${m.Poster}" class="img-fluid" />
    </div>
    <div class="col-md">
      <ul class="list-group">
        <li class="list-group-item"><h4>${m.Title} ${m.Year}</h4></li>
        <li class="list-group-item">
          <strong>Director : </strong> ${m.Director}
        </li>
        <li class="list-group-item">
          <strong>Actors : </strong> ${m.Actors}
        </li>
        <li class="list-group-item">
          <strong>Writer : </strong> ${m.Writer}
        </li>
        <li class="list-group-item">
          <strong>Plot : </strong><br /> ${m.Plot}
        </li>
      </ul>
    </div>
  </div>
</div>`;
};

// versi ribet
// const searchButton = document.querySelector(".search-button");
// searchButton.addEventListener("click", () => {
//   const inputKeyword = document.querySelector(".input-keyword");
//   fetch(`http://www.omdbapi.com/?apikey=ac137c29&s=${inputKeyword.value}`)
//     .then((response) => response.json())
//     .then((response) => {
//       const movies = response.Search;
//       let cards = "";
//       movies.forEach((m) => (cards += showCards(m)));
//       const movieContainer = document.querySelector(".movie-container");
//       movieContainer.innerHTML = cards;

//       const modalDetailButton = document.querySelectorAll(
//         ".modal-detail-button"
//       );
//       modalDetailButton.forEach((btn) => {
//         btn.addEventListener("click", function () {
//           const imdbid = this.dataset.imdbid;
//           fetch(`http://www.omdbapi.com/?apikey=ac137c29&i=${imdbid}`)
//             .then((response) => response.json())
//             .then((m) => {
//               const movieDetail = showMovieDetails(m);
//               const modalBody = document.querySelector(".modal-body");
//               modalBody.innerHTML = movieDetail;
//             });
//         });
//       });
//     })
//     .catch((e) => {
//       console.log(e.responseText);
//     });
// });
