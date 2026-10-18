import { loadProfile, clearProfile } from "./stores/sessionStore.js";

import { getCatalog } from "./services/pokemonCatalog.js";

import { addResult } from "./stores/historyStore.js";

import {
  cardCountValidate,
  MIN_CARDS,
  MAX_CARDS,
} from "./game/cardCountValidation.js";

import {
  formatTimer,
  startTimer,
  resetTimer,
  stopTimer,
  getElapsedSeconds,
} from "./game/timer.js";

import { renderBoard } from "./ui/board.js";
import { createDeck } from "./game/deck.js";

import { showScreen } from "./ui/screenController.js";

import { refreshRanking } from "./ui/rankingController.js";

import { initProfile } from "./ui/profileController.js";

initProfile();

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











showScreen();

function showTime(text) {
  timerElement.textContent = text;
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

function clearGame() {
  resetTimer();
  showTime(formatTimer(0));
  resetTurn();
  boardElement.replaceChildren();
  gameMessage.textContent = "";
  hasStarted = false;
  matchedPairs = 0;
  totalPairs = 0;
  lastCardCount = null;
  lastResultId = null;
  refreshRanking();
}

function startGame(cardCount) {
  if (!cardCountValidate(cardCount)) {
    cardCountError.hidden = false;
    gameMessage.textContent = ""; // Hace que cuando el usuario introduce un número de cartas incorrecto, el mensaje de "La partida empieza..." desaparezca
    return;
  }
  cardCountError.hidden = true;

    if (getCatalog().length === 0) {
    gameMessage.textContent =
      "Los Pokémons aún no se han cargado. Espera un momento y vuelvelo a intentar.";
    return;
  }

  lastCardCount = cardCount;

  lastResultId = null; // para reiniciar el ID del último resultado al iniciar un nuevo juego
  refreshRanking(); // volvemos a actualiza el ranking al iniciar un nuevo juego

  gameMessage.textContent = `La partida empieza! Has elegido: ${cardCount} cartas`;

  // El temporizador arranca al girar la primera carta
  resetTimer();
  showTime(formatTimer(0));

  const deck = createDeck(getCatalog(), Number(cardCount));
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



document.getElementById("logout").addEventListener("click", () => {
  clearProfile();
  clearGame();
  showScreen();
});







boardElement.addEventListener("click", (event) => {
  const card = event.target.closest(".card");
  if (!card) return;
  if (isChecking) return;
  if (card.classList.contains("flipped")) return;

  card.classList.add("flipped");
  const image = document.createElement("img");
  image.src = card.dataset.img;
  image.alt = card.dataset.name;
  card.replaceChildren(image);
  if (!hasStarted) {
    hasStarted = true;
    startTimer(showTime);
  }

  if (firstCard === null) {
    firstCard = card;
    return;
  }

  const secondCard = card;

  if (firstCard.dataset.id === secondCard.dataset.id) {
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





document.getElementById("reset-game").addEventListener("click", () => {
  if (lastCardCount !== null) {
    startGame(lastCardCount);
  } else {
    gameMessage.textContent =
      "¡No hay ninguna partida para reiniciar! Selecciona el número de cartas con las que quieres jugar.";
  }
});



function endGame() {
  const profile = loadProfile();
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
  refreshRanking(lastResultId);

  gameMessage.textContent = `¡Partida terminada! Tu tiempo: ${formatTimer(getElapsedSeconds())}`;
}
refreshRanking();
