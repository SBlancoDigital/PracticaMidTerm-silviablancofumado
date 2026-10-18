import { loadHistory } from "../stores/historyStore.js";
import { sortResults, getVisibleRows } from "../game/ranking.js";
import { renderRanking } from "./rankingView.js";

export function refreshRanking(highlightId = null) {
  renderRanking(getVisibleRows(sortResults(loadHistory()), highlightId));
}