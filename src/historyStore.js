const STORE_KEY = "pokememory_history";

export function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) || [];
  } catch {
    return [];
  }
}

export function addResult(result) {
  const history = loadHistory();
  history.push(result);
  localStorage.setItem(STORE_KEY, JSON.stringify(history));
}
