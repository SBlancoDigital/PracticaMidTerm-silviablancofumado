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

function startGame(cardCount) {
  if (!cardCountValidate(cardCount)) {
    cardCountError.hidden = false;
    gameMessage.textContent = ""; // Hace que cuando el usuario introduce un número de cartas incorrecto, el mensaje de "La partida empieza..." desaparezca
    return;
  }
  cardCountError.hidden = true;

  lastCardCount = cardCount;

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

document.getElementById("reset-game").addEventListener("click", () => {
  if (lastCardCount !== null) {
    startGame(lastCardCount);
  }
  else {
    gameMessage.textContent = "¡No hay ninguna partida para reiniciar! Selecciona el número de cartas con las que quieres jugar.";
  }
});

function endGame() {
  stopTimer();
  gameMessage.textContent = `¡Partida terminada! Tu tiempo: ${formatTimer(getElapsedSeconds())}`;
}
