const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const form = document.querySelector("form");
const errorBlock = document.querySelector(".error");
const display = document.querySelector(".pokemon");

errorBlock.style.display = "none";

const capitalize = (input) => input.charAt(0).toUpperCase() + input.slice(1);

const pokedex = {};

function createCard(id, name, img, prefix = "") {
  const container = document.createElement("article");
  container.id = id;
  container.innerHTML = `
    <img src="${img}" alt="Image of ${name}" />
    <h2>${prefix}${capitalize(name)}</h2>
  `;
  display.appendChild(container);
}

function getPokemonByID(input, type) {
  const url = `${BASE_URL}/${input}/`;
  
  fetch(url)
    .then((response) => response.json())
    .then((pokemon) => {
      if (!pokedex[type + input]) {
        const imgSrc = type === "regular" ? pokemon.sprites.front_default : pokemon.sprites.front_shiny;
        const prefix = type === "regular" ? "" : "Shiny ";
        createCard(pokemon.id, pokemon.name, imgSrc, prefix);
        pokedex[type + input] = true;
        errorBlock.style.display = "none";
      } else {
        errorBlock.innerHTML = `
          <p>There was an error!</p>
          <p class="message">You already found this pokemon</p>
        `;
        errorBlock.style.display = "block";
      }
    })
    .catch((error) => {
      console.error("Error fetching Pokemon:", error);
      errorBlock.style.display = "block";
      errorBlock.innerHTML = `
        <p>There was an error!</p>
        <p class="message">${error}</p>
      `;
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getPokemonByID(e.target.id.value, e.target.pokemonType.value);
  console.log(pokedex);
  e.target.reset();
});
