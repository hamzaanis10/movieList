// Define UI Vars
const form = document.querySelector("#movie-form");
const movieList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const movieInput = document.querySelector("#movie");

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener("DOMContentLoaded", getMovies);
  // Add task event
  form.addEventListener("submit", addMovie);
  // Remove task event
  movieList.addEventListener("click", removeMovie);
  // Clear task event
  clearBtn.addEventListener("click", clearMovies);
  // Filter tasks event
  filter.addEventListener("keyup", filterMovies);
}

// Get Tasks from LS
function getMovies() {
  let movies;
  if (localStorage.getItem("movies") === null) {
    movies = [];
  } else {
    movies = JSON.parse(localStorage.getItem("movies"));
  }

  movies.forEach(function (movie) {
    // Create li element
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(movie));
    // Create new link element
    const link = document.createElement("a");
    // Add class
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    movieList.appendChild(li);
  });
}

// Add Movie to the UI
function addMovie(e) {
  e.preventDefault();
  // Create li element
  const li = document.createElement("li");
  // Add class
  li.className = "collection-item";
  // Create text node and append to li
  li.appendChild(document.createTextNode(movieInput.value));
  // Create new link element
  const link = document.createElement("a");
  // Add class
  link.className = "delete-item secondary-content";
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  movieList.appendChild(li);

  // Store in LS
  storeMovieInLocalStorage(movieInput.value);

  // Clear input
  movieInput.value = "";
}

// Store Movie in LS
function storeMovieInLocalStorage(movie) {
  let movies;
  if (localStorage.getItem("movies") === null) {
    movies = [];
  } else {
    movies = JSON.parse(localStorage.getItem("movies"));
  }

  movies.push(movie);

  localStorage.setItem("movies", JSON.stringify(movies));
}

// Remove Movie from the UI
function removeMovie(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    e.target.parentElement.parentElement.remove();

    // Remove from LS
    removeMovieFromLocalStorage(e.target.parentElement.parentElement);
  }
}

// Remove Movie from LS
function removeMovieFromLocalStorage(movieItem) {
  let movies;
  if (localStorage.getItem("movies") === null) {
    movies = [];
  } else {
    movies = JSON.parse(localStorage.getItem("movies"));
  }

  movies.filter((rmovie, index) => {
    if (movieItem.textContent === rmovie) {
      movies.splice(index, 1);
    }
  });

  localStorage.setItem("movies", JSON.stringify(movies));
}

// Clear Tasks from the UI
function clearMovies() {
  movieList.innerHTML = "";

  // Clear from LS
  clearMoviesFromLocalStorage();
}

// Clear Tasks from LS
function clearMoviesFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks
function filterMovies(e) {
  const searchValue = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (movie) {
    const li = movie.firstChild.textContent;
    if (li.toLowerCase().indexOf(searchValue) === -1) {
      movie.style.display = "none";
    } else {
      movie.style.display = "block";
    }
  });
}
