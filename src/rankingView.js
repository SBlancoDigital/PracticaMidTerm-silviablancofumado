import { formatTimer } from "./timer.js";

export function renderRanking(results) {
  const emptyMessage = document.getElementById("ranking-empty");
  const table = document.getElementById("ranking-table");
  const body = document.getElementById("ranking-body");

  body.replaceChildren();
  emptyMessage.hidden = results.length > 0;
  table.hidden = results.length === 0;

  results.forEach((result, index) => {
    const row = document.createElement("tr");
    const values = [
      index + 1,
      result.username,
      result.pokemon,
      formatTimer(result.time),
      result.numberOfCards,
    ];

    values.forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;   // Siempre se trata como texto, si pusieramos innerHTML podrían poner código HTML en su nombre y se ejecutaría
      row.appendChild(cell);
    });

    body.appendChild(row);
  });
}