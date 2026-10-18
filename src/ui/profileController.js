import { saveProfile } from "../stores/sessionStore.js";
import { loadCatalog, getCatalog } from "../services/pokemonCatalog.js";
import { searchPokemon } from "../game/pokemonSearch.js";
import { renderPokemonResults } from "./profileView.js";
import { showScreen } from "./screenController.js";

const MIN_LENGTH = 3;
const MAX_LENGTH = 15;

const usernameInput = document.getElementById("username");
const usernameError = document.getElementById("username-error");

const pokemonSearchInput = document.getElementById("pokemon-search");
const pokemonResults = document.getElementById("pokemon-results");
const pokemonError = document.getElementById("pokemon-error");

const selectedPokemonName = document.getElementById("selected-pokemon-name");
const selectedPokemonImg = document.getElementById("selected-pokemon-img");
const selectedPokemonBlock = document.getElementById("pokemon-selected");

let selectedPokemon = null;

function usernameValidate() {
  const usernameCleaned = usernameInput.value.trim();
  if (
    usernameCleaned.length < MIN_LENGTH ||
    usernameCleaned.length > MAX_LENGTH
  ) {
    usernameInput.setCustomValidity(
      `El nombre de usuario debe tener entre ${MIN_LENGTH} y ${MAX_LENGTH} caracteres.`,
    );
    return false;
  }

  usernameInput.setCustomValidity("");
  return true;
}

async function loadPokemonList() {
  try {
    await loadCatalog();
  } catch {
    pokemonError.textContent =
      "Lo siento, no se han podido cargar los Pokémons. Vuelve a cargar la página.";
  }
}

export function initProfile() {
  loadPokemonList();

  usernameInput.addEventListener("input", () => {
    usernameError.hidden = usernameValidate();
  });

  pokemonSearchInput.addEventListener("input", () => {
    const matches = searchPokemon(getCatalog(), pokemonSearchInput.value);
    renderPokemonResults(pokemonResults, matches);
    pokemonError.textContent = "";
  });

  pokemonResults.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    selectedPokemon = getCatalog().find(
      (pokemon) => pokemon.id === button.dataset.id,
    );
    selectedPokemonName.textContent = selectedPokemon.name;
    selectedPokemonImg.src = selectedPokemon.img;
    selectedPokemonImg.alt = selectedPokemon.name;
    selectedPokemonBlock.hidden = false;
    renderPokemonResults(pokemonResults, []);
    pokemonError.textContent = "";
  });

  document.getElementById("change-pokemon").addEventListener("click", () => {
    selectedPokemon = null;
    selectedPokemonBlock.hidden = true;
    pokemonSearchInput.value = "";
    pokemonSearchInput.focus();
  });

  document.getElementById("profile-form").addEventListener("submit", (event) => {
    event.preventDefault();

    usernameError.hidden = usernameValidate();
    if (selectedPokemon === null) {
      pokemonError.textContent = "Elige un Pokémon para crear tu perfil.";
      return;
    }

    pokemonError.textContent = "";
    saveProfile({
      username: usernameInput.value.trim(),
      pokemon: selectedPokemon,
    });
    showScreen();
  });
}