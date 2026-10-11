// Validación del número de cartas
import {
  cardCountValidate,
  MIN_CARDS,
  MAX_CARDS,
} from "./cardCountValidation.js";

const cardCountInput = document.getElementById("personalized-numberCards");
const cardCountError = document.getElementById("card-count-error");

cardCountError.textContent = `El número de cartas debe ser un numero entero y par entre ${MIN_CARDS} y ${MAX_CARDS}.`;

cardCountInput.addEventListener("input", () => {
  const isCorrect = cardCountValidate(cardCountInput.value);
  cardCountError.hidden = isCorrect;
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
