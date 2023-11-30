function fetchWorks() {
  fetch("http://localhost:5678/api/works", {

  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP! Statut : ${response.status}`);
      }
      return response.json();
    })
    .then((result) => {
      if (result) {
updateGallery(result);
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la requête fetch:", error);
    });
}

function updateGallery(result) {console.log(result)
  const gallery = document.querySelector('.gallery'); 

  gallery.innerHTML = '';

  result.forEach(item => {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const figcaption = document.createElement('figcaption');

    img.src = item.imageUrl;
    img.alt = item.title;
    figcaption.textContent = item.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);

    gallery.appendChild(figure);
  });
}
document.addEventListener("DOMContentLoaded", fetchWorks);

export { fetchWorks };


// Récupérer le conteneur des éléments à trier
const itemsContainer = document.querySelector(".gallery");

async function afficherToutesLesImages() {
  // Effacer les éléments actuels dans le conteneur
  itemsContainer.innerHTML = "";

  // Effectuer une requête Fetch pour obtenir toutes les données de l'API
  const response = await fetch("http://localhost:5678/api/works/")
    .then((response) => response.json())
    .then((data) => {
      // Parcourir tous les éléments et les ajouter au conteneur
      data.forEach((element) => {
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        image.src = element.imageUrl;
        const caption = document.createElement("figcaption");
        caption.textContent = element.title;

        figure.appendChild(image);
        figure.appendChild(caption);
        itemsContainer.appendChild(figure);
      });
    });
}


async function trierParCategorie(categorie) {
 
  itemsContainer.innerHTML = "";

 
  const response = await fetch("http://localhost:5678/api/works/")
    .then((response) => response.json())
    .then((data) => {
  
      const elementsFiltres = data.filter(
        (element) => element.category.name === categorie
      );

     
      elementsFiltres.forEach((element) => {
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        image.src = element.imageUrl;
        const caption = document.createElement("figcaption");
        caption.textContent = element.title;

        figure.appendChild(image);
        figure.appendChild(caption);
        itemsContainer.appendChild(figure);
      });
    });
}


const tousBtn = document.createElement("button");
tousBtn.textContent = "Tous";
tousBtn.addEventListener("click", afficherToutesLesImages);
document.querySelector(".filtre").appendChild(tousBtn);

const objetsBtn = document.createElement("button");
objetsBtn.textContent = "Objets";
objetsBtn.addEventListener("click", () => trierParCategorie("Objets"));
document.querySelector(".filtre").appendChild(objetsBtn);

const appartementsBtn = document.createElement("button");
appartementsBtn.textContent = "Appartements";
appartementsBtn.addEventListener("click", () =>
  trierParCategorie("Appartements")
);
document.querySelector(".filtre").appendChild(appartementsBtn);

const hotelsBtn = document.createElement("button");
hotelsBtn.textContent = "Hotels & restaurants";
hotelsBtn.addEventListener("click", () =>
  trierParCategorie("Hotels & restaurants")
);
document.querySelector(".filtre").appendChild(hotelsBtn);