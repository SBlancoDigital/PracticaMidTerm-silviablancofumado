import { clearProfile } from "./stores/sessionStore.js";
import { showScreen } from "./ui/screenController.js";
import { refreshRanking } from "./ui/rankingController.js";
import { initProfile } from "./ui/profileController.js";
import { initGame, clearGame } from "./ui/gameController.js";

initProfile();
initGame();

document.getElementById("logout").addEventListener("click", () => {
  clearProfile();
  clearGame();
  showScreen();
});

showScreen();
refreshRanking();