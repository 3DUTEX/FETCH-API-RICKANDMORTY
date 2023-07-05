const url = "https://rickandmortyapi.com/api/character";

const btn = document.querySelector("#btn");

//cria elemento html
function create(elemento) {
  return document.createElement(elemento);
}

//inclui elemento
function include(onde, oque) {
  return onde.appendChild(oque);
}

async function getAllCharacters() {
  const response = await fetch(url);

  console.log(response);

  const data = await response.json();

  console.log(data);

  data.results.map((character) => {
    const div = create("div");
    const divDesc = create("div");
    const img = create("img");
    const name = create("h1");
    const specie = create("p");
    const status = create("p");
    const location = create("h2");

    div.classList.add("character");
    divDesc.classList.add("characterDesc");

    img.src = character.image;
    name.innerText = character.name;
    specie.innerText = character.species;
    status.innerText = character.status;
    location.innerText = `Local: ${character.location.name}`;

    include(div, img);
    include(div, divDesc);
    include(divDesc, name);
    include(divDesc, specie);
    include(divDesc, status);
    include(divDesc, location);

    if (character.status === "Alive") {
      status.style.color = "chartreuse";
    } else if (character.status === "unknown") {
      status.style.color = "#fff";
    } else {
      status.style.color = "red";
    }

    document.querySelector("#characters-container").appendChild(div);

    //CharactersDetails
    let checked = false;

    function charactersDetailsOn() {
      charactersDetails.style.display = "block";
      charactersDetails.appendChild(name);
    }

    div.addEventListener("click", function () {
      const charactersDetails = document.querySelector("#charactersDetails");

      checked = !checked;

      if (checked) {
        charactersDetailsOn();
      } else {
        charactersDetails.style.display = "none";
      }
    });
  });
}

getAllCharacters();
