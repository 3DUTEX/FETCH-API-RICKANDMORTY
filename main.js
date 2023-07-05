const url = "https://rickandmortyapi.com/api/character";
let checked = false;

//cria elemento html
function create(elemento) {
  return document.createElement(elemento);
}

//inclui elemento
function include(oque, onde) {
  return onde.appendChild(oque);
}

async function getAllCharacters() {
  const response = await fetch(url);

  console.log(response);

  const data = await response.json();

  console.log(data);

  data.results.map((character) => {
    //criando elementos
    const div = create("div");
    const img = create("img");
    const name = create("h1");
    const divDetails = create("div");
    const divFlex = create("div");
    const divDetailsDesc = create("div");
    const titleDesc = create("h1");
    const nameDetails = create("h1");
    const imgDetails = create("img");
    const specie = create("li");
    const status = create("li");
    const location = create("li");

    div.classList.add("character");

    //definindo valors aos elementos
    img.src = character.image;
    name.innerText = character.name;

    //incluindo os elementos em uma div
    include(img, div);
    include(name, div);

    //colocando a div geral em uma div do html
    document.querySelector("#characters-container").appendChild(div);

    //CharactersDetails
    const charactersDetails = document.querySelector("#charactersDetails");
    const x = document.querySelector("#x");

    function charactersDetailsOn() {
      //se characterDetails tiver um elemento como filho
      if (charactersDetails.children.length == 1) {
        //atribuindo valores aos elementos
        nameDetails.innerText = `Name: ${character.name}`;
        imgDetails.src = character.image;
        specie.innerText = `Specie: ${character.species}`;
        status.innerText = `${character.status}`;
        location.innerText = `Local: ${character.location.name}`;
        titleDesc.innerText = "Descrição:";
        divDetails.classList.add("characterDetails");
        divDetailsDesc.classList.add("divDetailsDesc");
        divFlex.classList.add("divFlex");

        if (character.status === "Alive") {
          status.style.color = "chartreuse";
        } else if (character.status === "unknown") {
          status.style.color = "#4e4e4e";
        } else {
          status.style.color = "red";
          imgDetails.style.filter = "grayscale(100%)";
        }

        // include(imgDetails, divDetailsDesc);
        // include(nameDetails, divDetails);
        // include(specie, divDetailsDesc);
        // include(status, divDetailsDesc);
        // include(location, divDetailsDesc);
        // include(divDetailsDesc, charactersDetails);
        // include(divDetails, charactersDetails);

        //incluindo os elementos
        include(imgDetails, divFlex);
        include(divDetailsDesc, divFlex);
        include(divFlex, divDetails);
        include(titleDesc, divDetailsDesc);
        include(nameDetails, divDetails);
        include(specie, divDetailsDesc);
        include(status, divDetailsDesc);
        include(location, divDetailsDesc);
        include(divDetails, charactersDetails);
      } else {
        //se não tiver apenas 1 elemento como filho, remove o characterDetails atual
        charactersDetails.removeChild(
          document.querySelector(".characterDetails")
        );

        //chama novamente a função
        charactersDetailsOn();
      }
    }

    x.addEventListener("click", function () {
      document.querySelector("#charactersDetails").style.display = "none";
      checked = false;
    });

    div.addEventListener("click", function () {
      checked = !checked;

      if (checked) {
        charactersDetails.style.display = "flex";
        charactersDetailsOn();
      }
    });
  });
}

getAllCharacters();
