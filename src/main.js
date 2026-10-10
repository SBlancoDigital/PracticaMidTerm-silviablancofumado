const usernameInput = document.getElementById("username");
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
  console.log(usernameValidate());
  // usernameValidate();   TODO:está ok, cuando quite console.log(usernameValidate());
});
