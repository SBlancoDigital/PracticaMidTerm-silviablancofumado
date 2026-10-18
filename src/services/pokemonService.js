const POKEMON_LIST_URL = "https://pokeapi.co/api/v2/pokemon?limit=20000";
const SPRITE_BASE_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";

export async function fetchAllPokemon() {
  const response = await fetch(POKEMON_LIST_URL);

  if (!response.ok) {
    throw new Error("No se ha podido cargar la lista de Pokémon");
  }

  const data = await response.json();

  return data.results
    .map((pokemon) => {
    const id = pokemon.url.split("/").filter(Boolean).pop(); // Para extrae el ID del Pokémon
    return {
      id,
      name: pokemon.name,
      img: `${SPRITE_BASE_URL}/${id}.png`,
    };
  })
  .filter((pokemon) => Number(pokemon.id) <= 10000); // Necesario filtrar los Pokémon con ID mayor a 10000, ya que algunos no tienen imagen en la API
}
