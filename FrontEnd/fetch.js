let allWorks = []; // Acces a tout les objets
let categories = []; // Acces a toutes les categories
const token = localStorage.token;

async function fetchCategories() {
  try {
    const response = await fetch("http://localhost:5678/api/categories/");
    categories = await response.json();
  } catch (error) {
    console.error("Erreur lors de la requête fetch categories:", error);
  }
}

async function fetchWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works/");
    const data = await response.json();
    data.forEach((work) => createWorkItem(work));
    attachDeleteEventListeners();
    allWorks = data;
    updateGallery(data);
  } catch (error) {
    console.error("Erreur lors de la requête fetch:", error);
  }
}

async function updateGallery(result) {
  console.log(result);
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  result.forEach((item) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    img.src = item.imageUrl;
    img.alt = item.title;
    figcaption.textContent = item.title;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  });
}
document.addEventListener("DOMContentLoaded", async () => {
  await fetchCategories();
  await fetchWorks();
});

async function trierParCategorie(categoryName) {
  const itemsContainer = document.querySelector(".gallery");
  itemsContainer.innerHTML = "";

  const category = categories.find((cat) => cat.name === categoryName);
  if (!category) return;

  const filteredWorks = allWorks.filter(
    (work) => work.category && work.category.id === category.id
  );
  filteredWorks.forEach((work) => {
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    image.src = work.imageUrl;
    const caption = document.createElement("figcaption");
    caption.textContent = work.title;
    figure.appendChild(image);
    figure.appendChild(caption);
    itemsContainer.appendChild(figure);
  });
}

/* création bouton tri */

function createCategoryButton(categoryName, clickHandler) {
  const button = document.createElement("button");
  button.textContent = categoryName;
  button.addEventListener("click", clickHandler);
  document.querySelector(".filtre").appendChild(button);
}

createCategoryButton("Tous", fetchWorks);
createCategoryButton("Objets", () => trierParCategorie("Objets"));
createCategoryButton("Appartements", () => trierParCategorie("Appartements"));
createCategoryButton("Hotels & restaurants", () =>
  trierParCategorie("Hotels & restaurants")
);

function createWorkItem(work) {
  const imgContainer = document.querySelector(".imageContainer");
  const figure = document.createElement("figure");

  const imageModale = document.createElement("img");
  imageModale.src = work.imageUrl;
  imageModale.classList.add("image-modale");
  figure.appendChild(imageModale);

  const icon = document.createElement("i");
  icon.classList.add("fa-trash-can", "fa-solid", "icon");
  icon.id = `${work.id}`;
  figure.appendChild(icon);

  imgContainer.appendChild(figure);
}

function attachDeleteEventListeners() {
  document.querySelectorAll(".icon").forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      deleteWorks(element.id);
    });
  });
}

async function deleteWorks(workId) {
  try {
    const url = `http://localhost:5678/api/works/${workId}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      removeGalleryItem(workId);
    } else {
      console.error("Error deleting work.");
    }
  } catch (error) {
    console.error("Error in delete request", error);
  }
}

function removeGalleryItem(workId) {
  const galleryItem = document.querySelector(`[data-work-id="${workId}"]`);
  if (galleryItem) {
    galleryItem.remove();
  }
}

/* Mode édition quand login */
const log = document.querySelector(".log");
const banner = document.querySelector(".editionBanner");
const modif = document.querySelector(".change");
const container = document.querySelector(".changingContainer");
const filtres = document.querySelector(".filtre");

function editionActive() {
  if (localStorage.login) {
    (log.innerText = "logout"), (banner.style = "display:flex;");
    filtres.style = "display:none";
  } else {
    banner.style = "display:none;";
    modif.style = "display:none;";
    container.style = "display:none";
  }
}

editionActive();

/* se déconnecter avec logout */

log.addEventListener("click", (event) => {
  if (localStorage.getItem("login") && localStorage.getItem("token")) {
    event.preventDefault();
    localStorage.removeItem("login");
    localStorage.removeItem("token");
    log.innerText = "logout";
    window.location.href = "./index.html";
    localStorage.clear;
  }
});

/*on recupère les elements dans le document qui vont  permettre d'ouvrir la fenetre*/
const edt = document.querySelectorAll(".newEdit");
const addMdl = document.querySelector(".openModale2");
/*on recupère la fenetre que nous souhaitant ouvrir au click*/
const mdl = document.querySelector(".modalContainer");
const mdl2 = document.querySelector(".modalContainer_2");

edt.forEach(function (element) {
  element.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("clique sur le bouton");
    mdl.classList.add("modalOpen");
  });
});

addMdl.addEventListener("click", function () {
  console.log("la modale 2 va s'ouvrir");
  mdl2.classList.add("modalOpen2");
  mdl.classList.remove("modalOpen");
});

const clos = document.querySelectorAll(".close");
const close_behind = document.querySelectorAll(".close_behind");

close_behind.forEach(function (element) {
  element.addEventListener("click", function () {
    mdl.classList.remove("modalOpen");
    mdl2.classList.remove("modalOpen2");
  });
});

clos.forEach(function (element) {
  element.addEventListener("click", function () {
    mdl.classList.remove("modalOpen");
    mdl2.classList.remove("modalOpen2");
  });
});

const arrowBak = document.querySelector(".arrow-back");
arrowBak.addEventListener("click", function () {
  mdl.classList.add("modalOpen");
  mdl2.classList.remove("modalOpen2");
});

//ajouter des projets au site//
const newPicmodale = document.querySelector(".input-newPicture");
const preview = document.querySelector(".importImg");
const addTitle = document.querySelector(".input-title");
const newCategorie = document.querySelector(".category");
const submitProject = document.querySelector(".validate");
const form2 = document.querySelector(".formModal");
let imgPreview;
let inputTitle;
let inputCategory;

function addPicture() {
  //Ajout des images//
  newPicmodale.addEventListener("input", (e) => {
    console.log(newPicmodale.files[0]);
    imgPreview = e.target.files[0];
    const imgModale2 = URL.createObjectURL(newPicmodale.files[0]);
    preview.src = imgModale2;
    preview.style = "visibility:visible";
  });
  //Ajout des titres//
  addTitle.addEventListener("input", (e) => {
    inputTitle = e.target.value;
    console.log(inputTitle);
  });
  //ajout des categories//
  newCategorie.addEventListener("input", (e) => {
    inputCategory = e.target.selectedIndex;
    console.log(inputCategory);
    console.log(token);
  });
  //changement de la couleur du bouton si tout les élèments sont remplis pour la validation du projet
  form2.addEventListener("change", () => {
    if (imgPreview && inputTitle && inputCategory) {
      submitProject.style.background = "#1d6154";
    } else {
      submitProject.style.background = "";
    }
  });

  //soumettre le projet//
  submitProject.addEventListener("click", (e) => {
    e.preventDefault();
    if (imgPreview && inputTitle && inputCategory) {
      /*On créer un fromData pour envoyer les données*/
      const formData = new FormData();
      formData.append("image", imgPreview); /*On ajoute ici l'image*/
      formData.append("title", inputTitle); /*On ajoute ici le titre*/
      formData.append("category", inputCategory);
      console.log(formData);
      newDataSubmit(formData);
      //modalOpen = true;

      async function newDataSubmit(formData) {
        try {
          const response = await fetch("http://localhost:5678/api/works", {
            method: "post",
            headers: {
              accept: "application/json",
              authorization: `Bearer ${token}`,
            },
            body: formData,
          });
          const dataResponse = await response.json();
          console.log(dataResponse);
          /* Ajouter l'image à la galerie sans rechargement de la page*/
          const figure = document.createElement("figure");
          const image = document.createElement("img");
          image.classList.add("image-modale");
          image.src = dataResponse.imageUrl;
          const icon = document.createElement("img");
          icon.classList.add("icon");
          figure.appendChild(icon);
          figure.appendChild(image);
          figure.appendChild(caption);
          imgContainer.appendChild(figure);
          fetchWorks();
          /* Ajouter l'image à la galerie sans rechargement de la page*/
        } catch (error) {
          console.log("il y a eu une erreur sur le fetch");
        }
      }
    } else {
      alert("Titre ou catégorie incorrect.");
    }
  });
}
addPicture();
