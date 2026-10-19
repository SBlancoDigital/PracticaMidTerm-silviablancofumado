const MIN_CARD_SIZE = 40;
const MAX_CARD_SIZE = 130;

export function getBoardShape(cardCount, width, height, gap) {
  let best = { columns: 1, rows: cardCount, cardSize: 0 };

  for (let rows = 1; rows <= cardCount; rows++) {
    if (cardCount % rows !== 0) continue;

    const columns = cardCount / rows;
    const cardSize = Math.min(
      (width - (columns - 1) * gap) / columns,
      (height - (rows - 1) * gap) / rows,
    );

    if (cardSize > best.cardSize) {
      best = { columns, rows, cardSize };
    }
  }

  const limitedSize = Math.min(Math.floor(best.cardSize), MAX_CARD_SIZE);

  return {
    columns: best.columns,
    rows: best.rows,
    cardSize: Math.max(limitedSize, MIN_CARD_SIZE),
  };
}