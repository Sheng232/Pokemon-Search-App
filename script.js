const inputField = document.querySelector(".pokemon-search");
const inputButton = document.querySelector(".search-btn");
const pokeAPI = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const pokeName = document.querySelector(".pokemon-name");
const weightHeight = document.querySelector(".weight-height");
const pokeImage = document.querySelector(".pokemon-image");
const pokeElement = document.querySelector(".pokemon-element");
const pokeStat = document.querySelectorAll(".stat");
inputButton.addEventListener("click", ()=>{
    fetchPokemon(inputField.value);
})
inputField.addEventListener("keypress", (e)=>{
    if(e.key === "Enter"){
        fetchPokemon(inputField.value);
    }
})
async function fetchPokemon(id){
    try{
        const res = await fetch(getURL(id.trim().toLowerCase()));
        const pokemonData = await res.json();
        displayPokemonInfo(pokemonData);
    } catch{
        alert("pokemon not found")
    }
}
function getURL(input){
    const pokeURL = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${input}`;
    return pokeURL;
}

function displayPokemonInfo(pokeData){
    const {base_experience, height, id, name, order, sprites, stats, types, weight} = pokeData;
    pokeName.innerText = `${name.toUpperCase()} #${id}`;
    weightHeight.innerText = `Weight: ${weight} Height: ${height}`;
    pokeImage.src = sprites.front_default;
    pokeElement.innerHTML = ``;
    types.forEach(element => {
        pokeElement.innerHTML += `
        <span class="flexbox ${element.type.name}">${element.type.name}</span>
        `
    });
    stats.forEach((element, index)=>{
        pokeStat[index].innerText = `${element.stat.name}: ${element.base_stat}`
    });
}
