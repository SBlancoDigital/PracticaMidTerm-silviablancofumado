import { loadProfile } from "../stores/sessionStore.js";

const loginSection = document.getElementById("login-section");
const gameSection = document.getElementById("game-section");

const userNameElement = document.getElementById("user-name");
const userPokemonImg = document.getElementById("user-pokemon-img");
const userPokemonName = document.getElementById("user-pokemon-name");

export function showScreen() {
  const profile = loadProfile();
  loginSection.hidden = profile !== null;
  gameSection.hidden = profile === null;

  if (profile === null) return;

  userNameElement.textContent = profile.username;
  userPokemonImg.src = profile.pokemon.img;
  userPokemonImg.alt = profile.pokemon.name;
  userPokemonName.textContent = profile.pokemon.name;
}
