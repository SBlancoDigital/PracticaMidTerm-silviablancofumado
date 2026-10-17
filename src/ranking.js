export function sortResults(results) {
  return [...results].sort((a, b) => {
    // Ordenar por número de cartas (mayor a menor)
    if (a.numberOfCards !== b.numberOfCards) {
      return b.numberOfCards - a.numberOfCards;
    }

    // Ordenar por tiempo (menor a mayor)
    return a.time - b.time;
  });
}
