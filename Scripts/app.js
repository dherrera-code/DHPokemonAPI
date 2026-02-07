import { saveFavoritePokemon, getFromLocalStorage, removeFavoritePokemon } from "./localStorage.js";

const toggleFavSidebarBtn = document.getElementById("toggleFavSidebarBtn")
const favoritesSidebar = document.getElementById("favoritesSidebar")
const hideFavSidebarBtn = document.getElementById("hideFavSidebarBtn");
const searchPokeBtn = document.getElementById("searchPokeBtn");
const randomPokeBtn = document.getElementById("randomPokeBtn");

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
const displayFirstEvol = document.getElementById("firstEvol")
const displaySecondEvol = document.getElementById("secondEvol");
const displayThirdEvol = document.getElementById("thirdEvol");
const firstEvolArrow = document.getElementById("firstArrow")
const secondEvolArrow = document.getElementById("secondArrow");
const displayFavPokemon = document.getElementById("displayFavPokemon")

const getPokemon = async (pokemon) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await response.json();
    return data;
}
const getMorePkData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const getPokemonEvolution = async (pokemon) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`);
    const data = await response.json();
    return data.evolution_chain.url;
}

const displayPokemon = async (data) => {

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
    for (let i = 1; i < data.moves.length; i++) {
        movesString += ", " + data.moves[i].move.name;
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

    for (let i = 0; i < data.stats.length; i++) {
        statTotal += data.stats[i].base_stat;
    }
    totalPkStat.textContent = `Total Stats: ${statTotal}`;

    // Display pokemon's abilities
    let abilitieString = "";
    for (let i = 0; i < data.abilities.length; i++) {
        if (data.abilities[i].is_hidden)
            abilitieString += `Hidden Ability: ${data.abilities[i].ability.name}, `
        else
            abilitieString += data.abilities[i].ability.name + ", ";
    }
    pkmonAbilities.textContent = abilitieString;

    //display location needs to call another endpoint

    let locationData = await getMorePkData(data.location_area_encounters)

    let locationString = "";
    for (let i = 0; i < locationData.length; i++) {
        locationString += locationData[i].location_area.name + ", " ;
    }
    displayLocations.textContent = locationString;
}
const displayEvolutionChain = async (evolUrl) => {
    displayFirstEvol.innerHTML = "";
    displaySecondEvol.innerHTML = "";
    displayThirdEvol.innerHTML = "";

    let evolData = await getMorePkData(evolUrl);

    const pkmonDiv = document.createElement("div");
    const firstEvolImg = document.createElement("img")
    firstEvolImg.style = "width: 100px; height: 100px"
    firstEvolImg.className = "mx-auto"
    firstEvolImg.alt = evolData.chain.species.name;
    let newEvolData = await getPokemon(evolData.chain.species.name)

    firstEvolImg.src = newEvolData.sprites.other["official-artwork"].front_default; //Add function to return the image url!

    const firstEvolName = document.createElement('p');
    firstEvolName.className = "text-center"
    firstEvolName.textContent = evolData.chain.species.name;
    pkmonDiv.appendChild(firstEvolImg);
    pkmonDiv.appendChild(firstEvolName);
    displayFirstEvol.appendChild(pkmonDiv);

    //create a for loop for second evolutions AND for loop for third evolutions!
    if (evolData.chain.evolves_to.length >= 1)
        firstEvolArrow.className = "";
    else {
        firstEvolArrow.className = "hidden";
        return;
    }

    for (let i = 0; i < evolData.chain.evolves_to.length; i++) {
        const pkmonDiv = document.createElement("div");
        const secondEvolImg = document.createElement("img")
        secondEvolImg.style = "width: 100px; height: 100px"
        secondEvolImg.className = "mx-auto"
        secondEvolImg.alt = evolData.chain.evolves_to[i].species.name

        let newEvolData = await getPokemon(evolData.chain.evolves_to[i].species.name)

        secondEvolImg.src = newEvolData.sprites.other["official-artwork"].front_default;
        const secondEvolName = document.createElement('p');
        secondEvolName.className = "text-center"
        secondEvolName.textContent = evolData.chain.evolves_to[i].species.name;
        pkmonDiv.appendChild(secondEvolImg);
        pkmonDiv.appendChild(secondEvolName);
        displaySecondEvol.appendChild(pkmonDiv);
    }

    if (evolData.chain.evolves_to[0].evolves_to.length >= 1)
        secondEvolArrow.className = "";
    else
        secondEvolArrow.className = "hidden";

    for (let i = 0; i < evolData.chain.evolves_to[0].evolves_to.length; i++) {
        const pkmonDiv = document.createElement("div");
        const thirdEvolImg = document.createElement("img")
        thirdEvolImg.style = "width: 100px; height: 100px"
        thirdEvolImg.className = "mx-auto"
        thirdEvolImg.alt = evolData.chain.evolves_to[0].evolves_to[i].species.name;
        let newEvolData = await getPokemon(evolData.chain.evolves_to[0].evolves_to[i].species.name)
        // console.log(newEvolData)

        thirdEvolImg.src = newEvolData.sprites.other["official-artwork"].front_default;
        const thirdEvolName = document.createElement('p');
        thirdEvolName.className = "text-center"
        thirdEvolName.textContent = evolData.chain.evolves_to[0].evolves_to[i].species.name;
        pkmonDiv.appendChild(thirdEvolImg);
        pkmonDiv.appendChild(thirdEvolName);
        displayThirdEvol.appendChild(pkmonDiv);
    }
}
let isFav = false;

const displayFavList = (favPkmonList) => {
    displayFavPokemon.innerHTML = "";
    console.log(favPkmonList)

    const uList = document.createElement("ul");

    for (let i = 0; i < favPkmonList.length; i++) {
        const li = document.createElement("li");
        const aTag = document.createElement("a");
        aTag.textContent = favPkmonList[i];
        aTag.id = "displayFavPkmon";
        li.appendChild(aTag);
        uList.appendChild(li);
    }
    displayFavPokemon.appendChild(uList);
}
const isCurrentFav = (pokemon) => {
    let favList = getFromLocalStorage();
    console.log("Displaying pkmon: " + favList)
    console.log(pokemon + " " + favList[1])
    for (let i = 0; i < favList.length; i++)
        if (pokemon === favList[i]) {
            console.log("Yes its fav")
            favPokemonStar.src = "./Assets/Star-Yellow.png"
            return;
        } else {
            console.log("No its not fav yet")
            favPokemonStar.src = "./Assets/Star 1.png"
        }
}

inputPokemon.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        // console.log("Enter key is pressed!")
        let newPokemon = await getPokemon(inputPokemon.value);
        let newPokemonEvolution = await getPokemonEvolution(inputPokemon.value)
        displayPokemon(newPokemon);
        displayEvolutionChain(newPokemonEvolution)
        inputPokemon.value = "";
        isCurrentFav(newPokemon.species.name);
    }
})
searchPokeBtn.addEventListener("click", async () => {
    let newPokemon = await getPokemon(inputPokemon.value);
    let newPokemonEvolution = await getPokemonEvolution(inputPokemon.value)
    displayPokemon(newPokemon);
    displayEvolutionChain(newPokemonEvolution)
    inputPokemon.value = "";
})
randomPokeBtn.addEventListener("click", async () => {
    let randomNum = (Math.floor(Math.random() * 649) + 1);
    console.log(randomNum)
    let newPokemon = await getPokemon(randomNum);
    let newPokemonEvolution = await getPokemonEvolution(randomNum)
    displayPokemon(newPokemon);
    displayEvolutionChain(newPokemonEvolution)
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

window.addEventListener("load", async () => {
    let pkmon = await getPokemon("bulbasaur")
    displayPokemon(pkmon)
    let evolChain = await getPokemonEvolution("bulbasaur");
    displayEvolutionChain(evolChain)

    let favPokemonList = getFromLocalStorage();
    console.log(favPokemonList)
    displayFavList(favPokemonList);

    isCurrentFav("bulbasaur");

})
// displayFavPkmon.addEventListener("click", () => {
// console.log("function envoked ")

// })
favPokemonStar.addEventListener("click", () => {
    //If not in favorite list then add to fav list and toggle fav star!
    //else remove from fav and toggle nonFav star!
    console.log("Fav btn evoked!")

    let favList = getFromLocalStorage();
    console.log(favList);
    //This test the list if pokemon is already listed
    isFav = true;
    for (let i = 0; i < favList.length; i++) {
        if (favList[i] === pokemonName.textContent) {
            isFav = false;
        }
    }

    if (isFav) {
        saveFavoritePokemon(pokemonName.textContent)
        favPokemonStar.src = "./Assets/Star-Yellow.png"

    }
    else {
        removeFavoritePokemon(pokemonName.textContent);
        favPokemonStar.src = "./Assets/Star 1.png"
    }
    favList = getFromLocalStorage();
    displayFavList(favList)

})