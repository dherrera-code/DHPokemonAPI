// alert("please work")

const toggleFavSidebarBtn = document.getElementById("toggleFavSidebarBtn")
const favoritesSidebar = document.getElementById("favoritesSidebar")
const hideFavSidebarBtn = document.getElementById("hideFavSidebarBtn");

const pokemonCries = document.getElementById("pokemonCries")
const pokemonCriesBtn = document.getElementById("pokemonCriesBtn")
const favPokemonStar = document.getElementById("favPokemonStar")

const inputPokemon = document.getElementById("inputPokemon")

// DOM elements for outputs here
const pokemonName = document.getElementById("pokemonName")
const pkmonImg = document.getElementById("pkmonImg")
const pkmonShiny = document.getElementById("pkmonShiny");
const pkmonTypings = document.getElementById("pkmonTypings");
const displayAllMoves = document.getElementById("displayAllMoves");
const hp = document.getElementById("outputHP")
const attack = document.getElementById("outputAttack")
const defense = document.getElementById("outputDefense")
const spAttack = document.getElementById("outputSpAttack")
const spDefense = document.getElementById("outputSpDefense")
const speed = document.getElementById("outputSpeed")
const totalPkStat = document.getElementById("totalPkStat")
const pkmonAbilities = document.getElementById("abilities")
const displayLocations = document.getElementById("displayLocations");

let pokemon = "eevee";
let isFav = false;
const getPokemon = async (pokemon) => {
    console.log("function evoked")
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await response.json();
    // console.log(data);
    return data;
}
const getMorePkData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data)
    return data;
}
// getPokemon("eevee")

const displayPokemon = async (data) => {
    console.log(data);
    // console.log(data.species.name);
    pokemonName.textContent = data.species.name;
    pkmonImg.src = data.sprites.other["official-artwork"].front_default;
    pkmonShiny.src = data.sprites.other["official-artwork"].front_shiny;

    // display types if two exist!
    pkmonTypings.innerHTML = "";
    for (let i = 0; i < data.types.length; i++) {
        const element = document.createElement("img");
        let elementSprite = await getMorePkData(data.types[i].type.url);
        element.src = elementSprite.sprites["generation-ix"]["scarlet-violet"]["name_icon"];
        element.alt = elementSprite.name; 
        pkmonTypings.appendChild(element);
    }
    pokemonCries.src = data.cries.latest;
    // Display all moves
    let movesString = data.moves[0].move.name;
    for(let i = 1; i < data.moves.length; i++)
    {
        movesString += ", " + data.moves[i].move.name ;
    }
    displayAllMoves.textContent = movesString;
    // Display the base stats
    let statTotal = 0;
    hp.textContent = data.stats[0].base_stat;
    attack.textContent = data.stats[1].base_stat;
    defense.textContent = data.stats[2].base_stat;
    spAttack.textContent = data.stats[3].base_stat;
    spDefense.textContent = data.stats[4].base_stat;
    speed.textContent = data.stats[5].base_stat;

    for(let i = 0; i < data.stats.length; i++)
    {
        statTotal += data.stats[i].base_stat;
    }
    totalPkStat.textContent = `Total Stats: ${statTotal}`;

    // Display pokemon's abilities
    let abilitieString = "";
    for(let i = 0; i < data.abilities.length; i++){
        if(data.abilities[i].is_hidden) 
            abilitieString += `Hidden Ability: ${data.abilities[i].ability.name}, `
        else 
            abilitieString += data.abilities[i].ability.name +", ";
    }
    pkmonAbilities.textContent = abilitieString;

    //display location needs to call another endpoint
    console.log()
    let locationData = await getMorePkData(data.location_area_encounters)
    console.log(locationData)
    let locationString = locationData[0].location_area.name;
    for(let i = 1; i < locationData.length; i++){
        locationString += ", " + locationData[i].location_area.name;
    }
    displayLocations.textContent = locationString;


    //display evolution line needs to call another endpoint!


}





inputPokemon.addEventListener("keydown", async (event) => {
    
    if (event.key === "Enter") {
        console.log("Enter key is pressed!")
        let newPokemon = await getPokemon(inputPokemon.value);
        displayPokemon(newPokemon);
    }
})


toggleFavSidebarBtn.addEventListener("click", () => {
    console.log("Fav btn clicked!")
    favoritesSidebar.classList.remove("hidden")
})
hideFavSidebarBtn.addEventListener("click", () => {
    favoritesSidebar.classList.add("hidden")
})
pokemonCriesBtn.addEventListener("click", () => {
    pokemonCries.play()
})
favPokemonStar.addEventListener("click", () => {
    //If not in favorite list then add to fav list and toggle fav star!
    //else remove from fav and toggle nonFav star!
    isFav = !isFav;
    if (isFav) favPokemonStar.src = "./Assets/Star-Yellow.png"
    else favPokemonStar.src = "./Assets/Star 1.png"

})