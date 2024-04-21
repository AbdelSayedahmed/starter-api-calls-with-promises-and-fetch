const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const form = document.querySelector("form");
const error = document.querySelector(".error");
const display = document.querySelector(".pokemon");

error.style.display = "none";

function createCard(inputID, inputTitle, inputImg) {
  const container = document.createElement("article");
  container.id = inputID;

  const title = document.createElement("h2");
  title.innerText = inputTitle;

  const img = document.createElement("img");
  img.setAttribute("src", inputImg);
  img.setAttribute("alt", `Image of ${title}`);

  container.appendChild(title);
  container.appendChild(img);

  display.appendChild(container);

  error.style.display = "none"; 
}

function getPokemonByID(input) {
  fetch(`${BASE_URL}/${input}/`)
    .then((response) => response.json())
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
