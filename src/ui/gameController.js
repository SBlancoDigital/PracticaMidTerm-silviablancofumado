import { loadProfile } from "../stores/sessionStore.js";
import { addResult, loadHistory } from "../stores/historyStore.js";
import { getCatalog } from "../services/pokemonCatalog.js";
import {
  cardCountValidate,
  MIN_CARDS,
  MAX_CARDS,
} from "../game/cardCountValidation.js";
import {
  formatTimer,
  startTimer,
  resetTimer,
  stopTimer,
  getElapsedSeconds,
} from "../game/timer.js";
import { createDeck } from "../game/deck.js";
import { getPosition } from "../game/ranking.js";
import { renderBoard, fitBoard } from "./board.js";
import { refreshRanking } from "./rankingController.js";

const HIDE_DELAY_MS = 1000;

const timerElement = document.getElementById("timer");
const boardElement = document.getElementById("board");
const cardCountInput = document.getElementById("personalized-numberCards");
const cardCountError = document.getElementById("card-count-error");
const gameMessage = document.getElementById("game-message");
const endOverlay = document.getElementById("end-overlay");
const endDetails = document.getElementById("end-details");

let firstCard = null;
let isChecking = false;
let hideTimeoutId = null;
let matchedPairs = 0;
let totalPairs = 0;
let hasStarted = false;
let lastCardCount = null;
let lastResultId = null;

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

export function clearGame() {
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
  endOverlay.hidden = true;
}

function startGame(cardCount) {
  if (!cardCountValidate(cardCount)) {
    cardCountError.hidden = false;
    gameMessage.textContent = "";
    return;
  }
  cardCountError.hidden = true;

  if (getCatalog().length === 0) {
    gameMessage.textContent =
      "Los Pokémons aún no se han cargado. Espera un momento y vuelvelo a intentar.";
    return;
  }

  lastCardCount = cardCount;
  endOverlay.hidden = true;
  lastResultId = null;
  refreshRanking();

  gameMessage.textContent = `La partida empieza! Has elegido: ${cardCount} cartas`;

  resetTimer();
  showTime(formatTimer(0));

  const deck = createDeck(getCatalog(), Number(cardCount));
  matchedPairs = 0;
  totalPairs = deck.length / 2;
  hasStarted = false;
  resetTurn();
  renderBoard(boardElement, deck);

  document.getElementById("game-controls").scrollIntoView({ block: "start" });
  fitBoard(boardElement, deck.length);
}

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

  const position = getPosition(loadHistory(), result.id);
  endDetails.textContent = `Posición ${position} · ${formatTimer(result.time)} · ${result.numberOfCards} cartas`;
  endOverlay.hidden = false;
}
function handleCardClick(event) {
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
}
export function initGame() {
  cardCountError.textContent = `El número de cartas debe ser un numero entero y par entre ${MIN_CARDS} y ${MAX_CARDS}.`;

  cardCountInput.addEventListener("input", () => {
    cardCountError.hidden = cardCountValidate(cardCountInput.value);
  });

  document.querySelectorAll(".number-cards-option").forEach((button) => {
    button.addEventListener("click", () => {
      startGame(button.dataset.cards);
    });
  });

  document.getElementById("start-game").addEventListener("click", () => {
    startGame(cardCountInput.value);
  });

  boardElement.addEventListener("click", handleCardClick);

  document.getElementById("reset-game").addEventListener("click", () => {
    if (lastCardCount !== null) {
      startGame(lastCardCount);
    } else {
      gameMessage.textContent =
        "¡No hay ninguna partida para reiniciar! Selecciona el número de cartas con las que quieres jugar.";
    }
  });

  window.addEventListener("resize", () => {
    const cardCount = boardElement.children.length;
    if (cardCount > 0) fitBoard(boardElement, cardCount);
  });

    document.getElementById("end-close").addEventListener("click", () => {
    endOverlay.hidden = true;
  });
  
}
