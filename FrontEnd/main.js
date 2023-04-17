// JE RECUPERE LES TRAVAUX DEPUIS LE BACKEND
async function getWorks() {
  const returnedWorks = await fetch(WORKS_URL);
  console.log(returnedWorks);
  const returnedImages = await returnedWorks.json();
  console.log(returnedImages);
  displayGallery(returnedImages);
  displaymodalGallery(returnedImages);
  onClickDeleteAllWorks();
  filterGallery(returnedImages);
  onClickDeleteWorkFromGallery();
  onClickDeleteAllWorks();
}
getWorks();

// J'AFFICHE LA GALERIE PRINCIPALE

/** 
displayGallery affiche la galerie une fois les travaux récupérés
*/
function displayGallery(returnedImages) {
  for (let i = 0; i < returnedImages.length; i++) {
    // Je déclare mes variables
    const imageData = returnedImages[i];

    // Je crée les éléments dans le DOM
    const galleryFigure = document.createElement("figure");
    const galleryImage = document.createElement("img");
    const figureCaption = document.createElement("figcaption");

    // Je rattache les éléments créés en attribuant un élément enfant à un élément parent
    gallery.appendChild(galleryFigure);
    galleryFigure.appendChild(galleryImage);
    galleryFigure.appendChild(figureCaption);

    // Je configure les éléments que je viens de créer:
    galleryImage.src = imageData.imageUrl;
    galleryImage.alt = imageData.title;
    galleryFigure.dataset.id = imageData.id;
    figureCaption.innerText = imageData.title;
  }
}

// J'AFFICHE LA GALERIE AU NIVEAU DE LA MODALE

/** displayModalGallery affiche la galerie de la modale une fois les travaux récupérés */
function displaymodalGallery(returnedImages) {
  for (let i = 0; i < returnedImages.length; i++) {
    const imageData = returnedImages[i];

    const modalFigure = document.createElement("figure");
    const modalImage = document.createElement("img");
    const modalCaption = document.createElement("figcaption");
    const iconDiv = document.createElement("div");

    modalGallery.appendChild(modalFigure);
    modalFigure.appendChild(modalImage);
    modalFigure.appendChild(modalCaption);
    modalFigure.appendChild(iconDiv);

    modalImage.src = imageData.imageUrl;
    modalFigure.classList.add("modal-figure");
    modalFigure.dataset.id = imageData.id;
    modalCaption.innerText = "éditer";

    iconDiv.innerHTML = `<div class="icon-div">
          <button class="maximize-btn">
             <i class="fa-solid fa-arrows-up-down-left-right"></i>
          </button>
          <button class="delete-btn">
            <i class="fa-solid fa-trash-can"></i>
          </button>
       </div>`;
  }
}

/**updateGalleries efface les galeries puis régénère celles-ci en récupérant l'ensemble des travaux via l'API */
function updateGalleries() {
  gallery.innerHTML = "";
  modalGallery.innerHTML = "";
  getWorks();
}

//JE GENERE UN FORMULAIRE DE CONNEXION FONCTIONNEL (cf. "login.js")

// JE METS EN PLACE L'AFFICHAGE DU MODE "ADMIN" (cf. "editmode.js")

// JE METS EN PLACE LES FILTRES (cf "filters.js")

// JE METS EN PLACE L'AFFICHAGE DE LA GALERIE MODALE (cf "modalwindow.js")
// JE GERE SON CONTENU ET SON STYLE (cf "modalcontent.js")

//J'INSTAURE LA SUPPRESSION D'UN PROJET SPECIFIQUE
function onClickDeleteWorkFromGallery() {
  const deleteButton = document.querySelectorAll(".delete-btn");
  deleteButton.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault;

      const btnClicked = e.target;
      const figureToDelete = btnClicked.closest(".modal-figure");
      const userToken = localStorage.getItem("token");
      const workID = figureToDelete.dataset.id;

      async function deleteWorkfromGallery(e) {
        e.preventDefault;
        await fetch("http://localhost:5678/api/works/" + workID, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }).then((response) => {
          console.log(response);
          if (response.ok) {
            updateGalleries();
          }
          if (response.status === 401) {
            alert("Vous n'êtes pas autorisé à supprimer ce projet");
          }
          if (response.status === 404) {
            alert("Cette action ne peut être réalisée");
          }
        });
      }
      deleteWorkfromGallery(workID);
    });
  });
}

// JE PERMETS LA SUPPRESSION DE TOUS LES TRAVAUX :
function onClickDeleteAllWorks() {
  modalGalleryDeletionLink.addEventListener("click", deleteAllWorks);
}

async function deleteAllWorks(e) {
  e.preventDefault();
  const modalFigures = document.querySelectorAll(".modal-figure");
  const userToken = localStorage.getItem("token");
  for (let i = 0; i < modalFigures.length; i++) {
    await fetch(
      "http://localhost:5678/api/works/" + modalFigures[i].dataset.id,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + userToken,
        },
      }
    ).then((response) => {
      if (response.status === 401) {
        alert("Vous n'êtes pas autorisé à supprimer ce projet");
      }
      if (response.status === 404) {
        alert("Cette action ne peut être réalisée");
      }
      if (response.ok) {
        updateGalleries();
      } else {
        console.log("error");
      }
    });
  }
}

// J'INSTAURE LA FONCTIONNALITE "AJOUT DE PHOTOS"

const imagesArray = [];

// J'instaure la fonction qui permet de récupérer sa photo en local
function displayNewPhotoInGalleries() {
  uploadNewPhoto();
  submitFormandSendRequest();
}

displayNewPhotoInGalleries();

/** uploadNewPhoto permet de stocker et d'afficher la photo choisie par l'utilisateur */
function uploadNewPhoto() {
  input.addEventListener("change", () => {
    // Je génère une zone de prévisulisation vide
    displayEmptyPreviewZone();
    // Je stocke l'image
    addPhotoToArray();
    // J'affiche la photo sélectionnée
    displayUploadedImage();
  });
}

/** displayEmptyPreviewZone permet d'afficher une zone de prévisualisation vide */
function displayEmptyPreviewZone() {
  inputZone.style.display = "none";
  imagePreviewZone.style.display = "block";
}

/**addPhotoToArray permet de stocker la photo sélectionnée */
function addPhotoToArray() {
  const file = input.files;
  imagesArray.push(file[0]);
}

/**displayUploadedPhoto génère un preview de la photo sélectionnée */
function displayUploadedImage() {
  let images = "";
  imagesArray.forEach((image) => {
    images += `<div class="uploaded-image">
                <img id="uploaded-image" src="${URL.createObjectURL(
                  image
                )}" alt="image">
              </div>`;
  });
  imagePreviewZone.innerHTML = images;
}

function submitFormandSendRequest() {
  addPhotoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    sendAddPhotoRequestToAPI();
  });
}

// J'envoie ma requête à l'API:
async function sendAddPhotoRequestToAPI() {
  // Je récupère les données nécessaires
  const userToken = localStorage.getItem("token");

  const uploadedImage = imageInput.files[0];
  const uploadedFileSize = uploadedImage.size;
  const uploadedFileSizeinMB = Math.round(uploadedFileSize / 1024);

  const title = document.getElementById("title-field");
  const titleValue = title.value;
  const categoryId = document.getElementById("category-selector");
  const categoryNumber = categoryId.value;

  // Je crée le formulaire
  const formData = new FormData();
  formData.append("image", uploadedImage);
  formData.append("title", titleValue);
  formData.append("category", categoryNumber);

  // Si le formulaire est bien complété, j'envoie ma requête
  if (imagesArray.length<1) {
    alert("Vous n'avez pas sélectionné de photo");
  } else if (uploadedFileSizeinMB >= 4096) {
    showFileSizeWarning();
  } else {
    await fetch(WORKS_URL, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + userToken,
        accept: "application/json",
      },
      body: formData,
      // Puis je traite la réponse et je remets à jour les galeries en cas de requête aboutie
    }).then((response) => {
      if (response.ok) {
        returnToAddPhotoForm();
        updateGalleries();
      }
      if (response.status === 401) {
        alert("Vous n'êtes pas autorisé à ajouter ce projet");
      }
      if (response.status === 400) {
        alert("Cette action ne peut être réalisée");
      }
      if (response.status === 500) {
        alert("Une erreur inattendue est survenue");
      }
    });
  }
}
