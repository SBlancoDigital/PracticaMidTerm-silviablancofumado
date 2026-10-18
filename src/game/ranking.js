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

export const RANKING_TOP_LIMIT = 5;

export function getVisibleRows(sortedResults, highlightId) {
  const rows = sortedResults.map((result, index) => ({
    type: "result",
    position: index + 1,
    result,
    isHighlighted: result.id === highlightId,
  }));

  if (rows.length <= RANKING_TOP_LIMIT) {
    return rows;
  }

  const visible = rows.slice(0, RANKING_TOP_LIMIT);
  const highlighted = rows.find(
    (row) => row.isHighlighted && row.position > RANKING_TOP_LIMIT,
  );

  if (highlighted === undefined) {
    visible.push({ type: "gap", hidden: rows.length - RANKING_TOP_LIMIT });
    return visible;
  }

  const hiddenBefore = highlighted.position - RANKING_TOP_LIMIT - 1;
  const hiddenAfter = rows.length - highlighted.position;
  if (hiddenBefore > 0) {
    visible.push({ type: "gap", hidden: hiddenBefore });
  } 
  visible.push(highlighted);    
  if (hiddenAfter > 0) {
    visible.push({ type: "gap", hidden: hiddenAfter });
  }
   
  return visible;
}

export function getPosition(results, id) {
  return sortResults(results).findIndex((result) => result.id === id) + 1;
}