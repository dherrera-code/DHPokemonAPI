const saveFavoritePokemon = (pokemonName) => {
    let pokemonList = getFromLocalStorage();

    if(!pokemonList.includes(pokemonName)){
        if(pokemonList.length > 20){
            pokemonList.pop(); 
        }
        pokemonList.unshift(pokemonName)
    }
    localStorage.setItem("favoritePokemonList", JSON.stringify(pokemonList))
}

const getFromLocalStorage = () => {
    let pokemonNames = localStorage.getItem("favoritePokemonList");

    if(pokemonNames === null) return [];

    return JSON.parse(pokemonNames);
}

const removeFavoritePokemon = (pokemonName) => {
    let pokemonList = getFromLocalStorage();
    let pokemonNameIndex = pokemonList.indexOf(pokemonName);

    pokemonList.splice(pokemonNameIndex, 1);
    localStorage.setItem("favoritePokemonList", JSON.stringify(pokemonList))
}
export {saveFavoritePokemon, getFromLocalStorage, removeFavoritePokemon }