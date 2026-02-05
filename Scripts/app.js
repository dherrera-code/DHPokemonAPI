// alert("please work")

const toggleFavSidebarBtn = document.getElementById("toggleFavSidebarBtn")
const favoritesSidebar = document.getElementById("favoritesSidebar")
const hideFavSidebarBtn = document.getElementById("hideFavSidebarBtn");

const pokemonCries = document.getElementById("pokemonCries")
const pokemonCriesBtn = document.getElementById("pokemonCriesBtn")
const favPokemonStar = document.getElementById("favPokemonStar")

let pokemon = "eevee";
let isFav = false;
const getPokemon = async (pokemon) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/eevee`);
    const data = await response.json();
    console.log(data);
    return data;
}
getPokemon()

toggleFavSidebarBtn.addEventListener("click", () => {
    console.log("Fav btn clicked!")
    favoritesSidebar.classList.remove("hidden")
})
hideFavSidebarBtn.addEventListener("click", () =>{
    favoritesSidebar.classList.add("hidden")
})
pokemonCriesBtn.addEventListener("click", () => {
    pokemonCries.play()
})
favPokemonStar.addEventListener("click", () => {
    //If not in favorite list then add to fav list and toggle fav star!
    //else remove from fav and toggle nonFav star!
    isFav = !isFav;
    if(isFav) favPokemonStar.src = "./Assets/Star-Yellow.png"
    else favPokemonStar.src = "./Assets/Star 1.png"

})