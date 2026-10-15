import {
  cardCountValidate,
  MIN_CARDS,
  MAX_CARDS,
} from "./cardCountValidation.js";

import { formatTimer } from "./timer.js";
import { startTimer } from "./timer.js";
import { resetTimer } from "./timer.js";
import { renderBoard } from "./board.js";
import { createDeck } from "./deck.js";

// Temporizador
const timerElement = document.getElementById("timer");

console.log(createDeck(8)); // Muestra en la consola 4 pares de cartas

// Validación del número de cartas

const cardCountInput = document.getElementById("personalized-numberCards");
const cardCountError = document.getElementById("card-count-error");

cardCountError.textContent = `El número de cartas debe ser un numero entero y par entre ${MIN_CARDS} y ${MAX_CARDS}.`;

cardCountInput.addEventListener("input", () => {
  const isCorrect = cardCountValidate(cardCountInput.value);
  cardCountError.hidden = isCorrect;
});

const gameMessage = document.getElementById("game-message");

function startGame(cardCount) {

  if (!cardCountValidate(cardCount)) {
    cardCountError.hidden = false;
    gameMessage.textContent = ""; // Hace que cuando el usuario introduce un número de cartas incorrecto, el mensaje de "La partida empieza..." desaparezca
    return;
  }
  cardCountError.hidden = true;

  gameMessage.textContent = `La partida empieza! Has elegido: ${cardCount} cartas`; // `con ${..} me deja mostrar el valor de la variable selectNumberCards en el mensaje

  // TODO: el temporizador debe arrancar al girar la primera carta, no aquí
  resetTimer();
  timerElement.textContent = formatTimer(0);
  startTimer((text) => {
    timerElement.textContent = text;
  });


  const boardElement = document.getElementById("board");
  renderBoard(boardElement, Number(cardCount));
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
