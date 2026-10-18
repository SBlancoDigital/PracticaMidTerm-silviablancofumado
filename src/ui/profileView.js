export function renderPokemonResults(listElement, pokemons) {
  listElement.replaceChildren();

  pokemons.forEach((pokemon) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.id = pokemon.id;
    button.textContent = pokemon.name;
    item.appendChild(button);
    listElement.appendChild(item);
  });
}