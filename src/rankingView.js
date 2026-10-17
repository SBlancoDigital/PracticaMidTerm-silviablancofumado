import { formatTimer } from "./timer.js";

export function renderRanking(rows) {
  const emptyMessage = document.getElementById("ranking-empty");
  const table = document.getElementById("ranking-table");
  const body = document.getElementById("ranking-body");

  body.replaceChildren();
  emptyMessage.hidden = rows.length > 0;
  table.hidden = rows.length === 0;

  rows.forEach((row) => {
    const tr = document.createElement("tr");

    if (row.type === "gap") {
      const cell = document.createElement("td");
      cell.colSpan = 5;
      const word = row.hidden === 1 ? "posición oculta" : "posiciones ocultas";
      cell.textContent = `… ${row.hidden} ${word} …`;
      tr.appendChild(cell);
    } else {
      if (row.isHighlighted) {
        tr.classList.add("highlight");
      }
      const { position, result } = row;
      [
        position,
        result.username,
        result.pokemon,
        formatTimer(result.time),
        result.numberOfCards,
      ].forEach((value) => {
        const cell = document.createElement("td");
        cell.textContent = value;
        tr.appendChild(cell);
      });
    }

    body.appendChild(tr);
  });
}