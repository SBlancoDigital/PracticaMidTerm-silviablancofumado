export function createDeck(cardCount) {
  const deck = [];
  const pairCount = cardCount / 2;

  for (let value = 1; value <= pairCount; value++) {
    deck.push(value, value); // push admite varios valores a la vez
  }

  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // posición al azar entre 0 e i
    [deck[i], deck[j]] = [deck[j], deck[i]]; // intercambio
  }

  return deck;
}
