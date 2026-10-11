export const MIN_CARDS = 4;
export const MAX_CARDS = 48;

export function cardCountValidate(cardCount) {
  const cardCountCleaned = cardCount.trim();
  if (cardCountCleaned === "") {
    return false;
  }

  const cardCountNumber = Number(cardCountCleaned);
  if (
    !Number.isInteger(cardCountNumber) ||
    cardCountNumber < MIN_CARDS ||
    cardCountNumber > MAX_CARDS ||
    cardCountNumber % 2 !== 0
  ) {
    return false;
  }

  return true;
}
