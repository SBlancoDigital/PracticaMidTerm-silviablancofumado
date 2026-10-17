export const MAX_SEARCH_RESULTS = 8;

export function searchPokemon(pokemonList, query) {
  const cleanQuery = query.trim().toLowerCase();

  if (cleanQuery === "") {
    return [];
  }
return pokemonList
.filter ((pokemon) => pokemon.name.toLowerCase().includes(cleanQuery))
.slice(0, MAX_SEARCH_RESULTS);
}