import { fetchAllPokemon } from "./pokemonService.js";

import { searchPokemon } from "./pokemonSearch.js";

import { renderPokemonResults } from "./profileView.js";

import { renderRanking } from "./rankingView.js";

import { sortResults, getVisibleRows } from "./ranking.js";

import { addResult, loadHistory } from "./historyStore.js";

import {
  cardCountValidate,
  MIN_CARDS,
  MAX_CARDS,
} from "./cardCountValidation.js";

import {
  formatTimer,
  startTimer,
  resetTimer,
  stopTimer,
  getElapsedSeconds,
} from "./timer.js";
import { renderBoard } from "./board.js";
import { createDeck } from "./deck.js";


// Rankings
function refreshRanking() {
  renderRanking(getVisibleRows(sortResults(loadHistory()), lastResultId));
}

// Temporizador
const timerElement = document.getElementById("timer");
const boardElement = document.getElementById("board");

// Validación del número de cartas

const cardCountInput = document.getElementById("personalized-numberCards");
const cardCountError = document.getElementById("card-count-error");

cardCountError.textContent = `El número de cartas debe ser un numero entero y par entre ${MIN_CARDS} y ${MAX_CARDS}.`;

cardCountInput.addEventListener("input", () => {
  const isCorrect = cardCountValidate(cardCountInput.value);
  cardCountError.hidden = isCorrect;
});

const gameMessage = document.getElementById("game-message");

const HIDE_DELAY_MS = 1000;

let firstCard = null;
let isChecking = false;
let hideTimeoutId = null;
let matchedPairs = 0;
let totalPairs = 0;
let hasStarted = false;
let lastCardCount = null;
let lastResultId = null;


const pokemonSearchInput = document.getElementById("pokemon-search");
const pokemonResults = document.getElementById("pokemon-results");
const pokemonError = document.getElementById("pokemon-error");

let allPokemon = [];
const selectedPokemonName = document.getElementById("selected-pokemon-name");
const selectedPokemonImg = document.getElementById("selected-pokemon-img");

let selectedPokemon = null;

async function loadPokemonList() {
  try {
    allPokemon = await fetchAllPokemon();
  
  } catch {
    pokemonError.textContent =
      "No se han podido cargar los Pokémons. Recarga la página.";
  }
}
loadPokemonList();

function showTime(text) {
  timerElement.textContent = text;
}

function getCurrentProfile() {
  return { username: "Jugador", pokemon: { id: 25, name: "pikachu", img: "" } }; // TODO: sustituir por el perfil de sessionStorage cuando exista
}

function hideCard(card) {
  card.classList.remove("flipped");
  card.textContent = "?";
}

function resetTurn() {
  clearTimeout(hideTimeoutId);
  firstCard = null;
  isChecking = false;
  hideTimeoutId = null;
}

function startGame(cardCount) {
  if (!cardCountValidate(cardCount)) {
    cardCountError.hidden = false;
    gameMessage.textContent = ""; // Hace que cuando el usuario introduce un número de cartas incorrecto, el mensaje de "La partida empieza..." desaparezca
    return;
  }
  cardCountError.hidden = true;

  lastCardCount = cardCount;
  
  lastResultId = null; // para reiniciar el ID del último resultado al iniciar un nuevo juego
  refreshRanking(); // volvemos a actualiza el ranking al iniciar un nuevo juego

  gameMessage.textContent = `La partida empieza! Has elegido: ${cardCount} cartas`;

  // El temporizador arranca al girar la primera carta
  resetTimer();
  showTime(formatTimer(0));

  const deck = createDeck(Number(cardCount));
  matchedPairs = 0;
  totalPairs = deck.length / 2;
  hasStarted = false;
  resetTurn();
  renderBoard(boardElement, deck);
}

document.querySelectorAll(".number-cards-option").forEach((button) => {
  button.addEventListener("click", () => {
    startGame(button.dataset.cards);
  });
});

document.getElementById("start-game").addEventListener("click", () => {
  startGame(cardCountInput.value);
});

// Validación del nombre de usuario
const usernameInput = document.getElementById("username");
const usernameError = document.getElementById("username-error");
const MIN_LENGTH = 3;
const MAX_LENGTH = 15;

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

usernameInput.addEventListener("input", () => {
  const isCorrect = usernameValidate();
  usernameError.hidden = isCorrect;
});

boardElement.addEventListener("click", (event) => {
  const card = event.target.closest(".card");
  if (!card) return;
  if (isChecking) return;
  if (card.classList.contains("flipped")) return;

  card.classList.add("flipped");
  card.textContent = card.dataset.value;
  if (!hasStarted) {
    hasStarted = true;
    startTimer(showTime);
  }

  if (firstCard === null) {
    firstCard = card;
    return;
  }

  const secondCard = card;

  if (firstCard.dataset.value === secondCard.dataset.value) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    firstCard = null;
    matchedPairs++;
    if (matchedPairs === totalPairs) {
      endGame();
    }
  } else {
    isChecking = true;
    hideTimeoutId = setTimeout(() => {
      hideCard(firstCard);
      hideCard(secondCard);
      firstCard = null;
      isChecking = false;
    }, HIDE_DELAY_MS);
  }
});

pokemonSearchInput.addEventListener("input", () => {
  const matches = searchPokemon(allPokemon, pokemonSearchInput.value);
  renderPokemonResults(pokemonResults, matches);
});

pokemonResults.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  selectedPokemon = allPokemon.find((pokemon) => pokemon.id === button.dataset.id);
  selectedPokemonName.textContent = selectedPokemon.name;
  selectedPokemonImg.src = selectedPokemon.img;
  selectedPokemonImg.alt = selectedPokemon.name;
});

document.getElementById("reset-game").addEventListener("click", () => {
  if (lastCardCount !== null) {
    startGame(lastCardCount);
  } else {
    gameMessage.textContent =
      "¡No hay ninguna partida para reiniciar! Selecciona el número de cartas con las que quieres jugar.";
  }
});

function endGame() {
  const profile = getCurrentProfile();
  const result = {
    id: Date.now().toString(36),
    username: profile.username,
    pokemon: profile.pokemon.name,
    time: getElapsedSeconds(),
    numberOfCards: Number(lastCardCount),
  };
  stopTimer();
  addResult(result);
  lastResultId = result.id;
  refreshRanking();

  gameMessage.textContent = `¡Partida terminada! Tu tiempo: ${formatTimer(getElapsedSeconds())}`;
}
refreshRanking();