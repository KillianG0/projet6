function fetchWorks() {
  fetch("http://localhost:5678/api/works", {
    method: "GET",
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

function fetchCategories() {
  fetch("http://localhost:5678/api/categories", {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP! Statut : ${response.status}`);
      }
      return response.json();
    })
    .then((categories) => {
      if (categories) {
        createCategoryButtons(categories);
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la requête fetch:", error);
    });
}

function createCategoryButtons(categories) {
  const portfolioSection = document.getElementById("portfolio");

  // Création de la div pour les boutons de catégories
  const categoryButtonsDiv = document.createElement("div");
  categoryButtonsDiv.classList.add("category-buttons");

  // Création d'un bouton pour afficher tous les projets
  const allButton = createCategoryButton("Tous", "all");
  categoryButtonsDiv.appendChild(allButton);

  // Création des boutons pour chaque catégorie
  categories.forEach((category) => {
    const categoryButton = createCategoryButton(category.name, category.id);
    categoryButtonsDiv.appendChild(categoryButton);
  });

  // Ajout de la div des boutons à la section du portfolio
  portfolioSection.appendChild(categoryButtonsDiv);
}

function createCategoryButton(label, value) {
  const button = document.createElement("button");
  button.textContent = label;
  button.value = value;

  // Ajout d'un écouteur d'événements pour mettre à jour la galerie en fonction du bouton cliqué
  button.addEventListener("click", function () {
    const selectedCategory = this.value;
    filterGalleryByCategory(selectedCategory);
  });

  return button;
}

function filterGalleryByCategory(selectedCategory) {
  // TODO: Ajoutez ici le code pour filtrer la galerie en fonction de la catégorie sélectionnée
  // Vous pouvez utiliser la variable selectedCategory pour obtenir la catégorie sélectionnée
}

document.addEventListener("DOMContentLoaded", function () {
  fetchCategories();
  fetchWorks();
});