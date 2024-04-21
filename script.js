const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const form = document.querySelector("form");
const error = document.querySelector(".error");
const display = document.querySelector(".display");

error.style.display = "none";

function createCard(inputID, inputTitle, inputImg) {
  const container = document.createElement("div");
  container.className = "pokemon";
  container.id = inputID;

  const title = document.createElement("h4");
  title.classList.add("pokemon__title-name");
  title.innerText = inputTitle;

  const img = document.createElement("img");
  img.classList.add("pokemon__img");
  img.setAttribute("src", inputImg);
  img.setAttribute("alt", `Image of ${title}`);

  container.appendChild(title);
  container.appendChild(img);

  display.appendChild(container);
}

function getPokemonByID(input) {
  fetch(`${BASE_URL}/${input}/`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((pokemon) => {
      createCard(pokemon.id, pokemon.name, pokemon.sprites.front_default);
      error.style.display = "none";
    })
    .catch(() => {
      error.style.display = "block";
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const input = document.getElementById("pokemon-id").value;
  getPokemonByID(input);

  form.reset();
});
