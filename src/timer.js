export function formatTimer(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString()}m ${seconds.toString()}s`;
}

let elapsedSeconds = 0;
let timerId = null;

export function startTimer(onTick) {
  stopTimer();                     

  timerId = setInterval(() => {
    elapsedSeconds++;
    onTick(formatTimer(elapsedSeconds));
  }, 1000);
  
}

export function stopTimer() {
  clearInterval(timerId);
  timerId = null;
}

export function resetTimer() {
  stopTimer();
  elapsedSeconds = 0;
}