import { fetchAllPokemon } from "./pokemonService.js";

let catalog = [];

export async function loadCatalog() {
  catalog = await fetchAllPokemon();
}

export function getCatalog() {
  return catalog;
}