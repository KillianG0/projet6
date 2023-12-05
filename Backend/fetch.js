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

/* création bouton tri */
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

log.addEventListener("click", () => {
  localStorage.removeItem("login");
  localStorage.removeItem("token");
  log.innerText = "login";
  localStorage.clear;
});

/*on recupère les elements dans le document qui vont  permettre d'ouvrir la fenetre*/
const edt = document.querySelectorAll(".newEdit");
const addMdl = document.querySelector(".openModale2");
/*on recupère la fenetre que nous souhaitant ouvrir au click*/
const mdl = document.querySelector(".modalContainer");
const mdl2 = document.querySelector(".modalContainer_2")

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

/*ouvre la fenetre modale au click */

//on recupere les elements dans le document qui vont  permettre d'ouvrir la fenetre//
const edition = document.querySelectorAll(".newEdit");
const addModal = document.querySelector(".openModale2");
//on recupère la fenetre que nous souhaitant ouvrir au click//
const modal = document.querySelector(".modalContainer");
const modal2 = document.querySelector(".modalContainer_2");

/*On ajoute un evenement a l'input afin que le fenetre modale s'ouvre au click sur celui-ci*/
edition.forEach(function (element) {
  element.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("clique sur le bouton");
    modal.classList.add("modalOpen");
  });
});

addModal.addEventListener("click", function () {
  console.log("la modale 2 va s'ouvrir");
  modal2.classList.add("modalOpen2");
  modal.classList.remove("modalOpen");
});

const close = document.querySelectorAll(".close");

close.forEach(function (element) {
  element.addEventListener("click", function () {
    modal.classList.remove("modalOpen");
    modal2.classList.remove("modalOpen2");
  });
});

const arrowBack = document.querySelector(".arrow-back");
arrowBack.addEventListener("click", function () {
  modal.classList.add("modalOpen");
  modal2.classList.remove("modalOpen2");
});

/*Ajouter les images a la fenetre modale*/
/*Prendre les données de l'API avec un fetch*/
const imgContainer = document.querySelector(".imageContainer");
const token = localStorage.token;


fetch("http://localhost:5678/api/works/")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((work, index) => {
      const figure = document.createElement("figure");

      const imageModale = document.createElement("img");
      imageModale.src = work.imageUrl;
      figure.appendChild(imageModale);
      imageModale.classList.add("image-modale");

      const icon = document.createElement("img");
      icon.classList.add("icon");
      icon.id = `${work.id}`;
      figure.appendChild(icon);


      const edit = document.createElement("figcaption");
      edit.innerText = "éditer";
      figure.appendChild(edit);

      imgContainer.appendChild(figure);
    });
    /*Enlever image de la galerie*/
    const deleteElement = document.querySelectorAll(".icon");

    deleteElement.forEach((element) => {
      element.addEventListener("click", () => {
        deleteWorks(element.id);
        console.log("supression activée");
        element.parentElement.remove();
      });
    });
  });


// Fonction pour supprimer une image
async function deleteWorks(workId) {
  try {
    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
      method: "DELETE",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      // Supprimer l'élément de la galerie principale
      const galleryItem = document.querySelector(`[data-work-id="${workId}"]`);
      if (galleryItem) {
        galleryItem.remove();
      }

      // Mettre à jour la galerie principale
      await modaleGallery();
    } else {
      console.error("Erreur lors de la suppression de l'image");
    }
  } catch (error) {
    console.error("Erreur lors de la requête de suppression", error);
  }
}



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
  //changement de la couleur du bouton si tout les élèments sont remplis pour la validation du projet//
  form2.addEventListener("change", () => {
    if (imgPreview && inputTitle && inputCategory ) {
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
      modalOpen = true;

      async function newDataSubmit(formData) {
        try {
          const response = await fetch("http://localhost:5678/api/works",{
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
      image.classList.add("image-modale")
      image.src = dataResponse.imageUrl;
      const caption = document.createElement("figcaption");
      caption.innerText = "éditer";
      const icon = document.createElement("img");
      icon.classList.add("icon");
      figure.appendChild(icon);
      figure.appendChild(image);
      figure.appendChild(caption);
      imgContainer.appendChild(figure);
      afficherToutesLesImages();
          /* Ajouter l'image à la galerie sans rechargement de la page*/  
        } catch (error) {
          console.log("il y a eu une erreur sur le fetch");
        }
      }
    }
  });
}
addPicture()

