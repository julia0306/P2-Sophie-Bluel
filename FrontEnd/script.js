const WORKS_URL = "http://localhost:5678/api/works";

// LES VARIABLES DONT J'AI BESOIN

// Les galeries
const gallery = document.getElementById("gallery");
const modalGallery = document.getElementById("modal-gallery");

// Les boutons des filtres
const allButton = document.querySelector(".all-button");
const objectsButton = document.querySelector(".objects-button");
const appartmentsButton = document.querySelector(".appartments-button");
const hotelsButton = document.querySelector(".hotels-button");

// Les éléments de la modale "galerie"
const modalGalleryDeletionLink = document.querySelector(".delete-gallery-link");


// Les éléments de la modale "ajout de photos"
const returnButton = document.querySelector(".RB");
const addPhotoForm = document.getElementById("add-photo-form");
const categorySelector = document.getElementById("category-selector");
const mandatoryFields = document.querySelectorAll(".mandatory-fields");
const titleField = document.getElementById("title-field");
const input = document.getElementById("photo-input-button");
const imagePreviewZone = document.getElementById("image-preview-zone");
const fileSizeWarning = document.getElementById("file-size-warning");
const confirmButton = document.querySelector(".confirm-photo-button");
const imageInput = document.getElementById("photo-input-button");
const inputZone = document.getElementById("input-zone");


// JE RECUPERE LES TRAVAUX DEPUIS LE BACKEND
async function getWorks() {
  const returnedWorks = await fetch(WORKS_URL);
  const returnedImages = await returnedWorks.json();
  displayGallery(returnedImages);
  displaymodalGallery(returnedImages);
  onClickDeleteAllWorks();
  filterGallery(returnedImages);
  onClickDeleteWorkFromGallery();
  onClickDeleteAllWorks();
}
getWorks();

// Fonction qui affiche la galerie une fois les travaux récupérés
function displayGallery(returnedImages) {
  for (let i = 0; i < returnedImages.length; i++) {
    const imageData = returnedImages[i];

    const galleryFigure = document.createElement("figure");
    const galleryImage = document.createElement("img");
    const figureCaption = document.createElement("figcaption");

    gallery.appendChild(galleryFigure);
    galleryFigure.appendChild(galleryImage);
    galleryFigure.appendChild(figureCaption);

    galleryImage.src = imageData.imageUrl;
    galleryImage.alt = imageData.title;
    galleryFigure.dataset.id = imageData.id;
    figureCaption.innerText = imageData.title;
  }
}

// Fonction qui affiche la galerie de la modale une fois les travaux récupérés
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
                <button class="maximize-btn"><i class="fa-solid fa-arrows-up-down-left-right"></i></button>
                <button class="delete-btn"><i class="fa-solid fa-trash-can"></i></button>
                </div>`;
  }
}


// Fonction qui met à jour les galeries:

function updateGalleries() {
  gallery.innerHTML = "";
  modalGallery.innerHTML = "";
  getWorks();
}

//JE GENERE UN FORMULAIRE DE CONNEXION FONCTIONNEL (cf. login.js)

// JE METS EN PLACE L'AFFICHAGE DU MODE "ADMIN" (cf. editmode.js)

// JE METS EN PLACE LES FILTRES

function filterGallery(returnedImages) {
  // Au clic sur le bouton "TOUS", j'affiche tous les travaux:
  allButton.addEventListener("click", function () {
    gallery.innerHTML = "";
    displayGallery(returnedImages);
  });

  // Au clic sur le bouton "Objets", j'affiche les objets:
  objectsButton.addEventListener("click", function () {
    const objectGallery = returnedImages.filter(function (data) {
      return data.categoryId == 1;
    });
    gallery.innerHTML = "";
    displayGallery(objectGallery);
  });

  // Idem pour les appartements:
  appartmentsButton.addEventListener("click", function () {
    const appartmentsGallery = returnedImages.filter(function (data) {
      return data.categoryId == 2;
    });
    gallery.innerHTML = "";
    displayGallery(appartmentsGallery);
  });

  // Et pour les hôtels et les restaurants:
  hotelsButton.addEventListener("click", function () {
    const hotelsGallery = returnedImages.filter(function (data) {
      return data.categoryId == 3;
    });
    gallery.innerHTML = "";
    displayGallery(hotelsGallery);
  });
}

// JE METS EN PLACE L'AFFICHAGE DE LA GALERIE (cf "modal.js")

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

function displayEmptyPreviewZone() {
  inputZone.style.display = "none";
  imagePreviewZone.style.display = "block";
}

function addPhotoToArray() {
  const file = input.files;
  imagesArray.push(file[0]);
}

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
  if (imagesArray.length === 0) {
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

// Je cache ou j'affiche le message indiquant que le fichier choisi est trop lourd :
function showFileSizeWarning() {
  fileSizeWarning.classList.remove("invisible-items");
}

function hideFileSizeWarning() {
  fileSizeWarning.classList.add("invisible-items");
}

// Je redirige vers l'ajout de photos lorsque l'image est envoyée
function returnToAddPhotoForm() {
  imagePreviewZone.innerHTML = ``;
  imagePreviewZone.style.display = "none";
  inputZone.style.display = "flex";
  resetForm();
}

// JE MODIFIE LE STYLE DU BOUTON "VALIDER" LORSQUE LE FORMULAIRE EST COMPLET:

function checkForm() {
  mandatoryFields.forEach((field) => {
    field.addEventListener("change", function (e) {
      e.preventDefault();
      if (
        categorySelector.value > 0 &&
        categorySelector.value < 4 &&
        imagesArray.length > 0 &&
        titleField.value.length > 0
      ) {
        // bouton vert
        changeConfirmButtonStyle();
      } else {
        // bouton gris
        resetConfirmButtonStyle();
      }
    });
  });
}
checkForm();

function changeConfirmButtonStyle() {
  confirmButton.classList.remove("confirm-photo-button");
  confirmButton.classList.add("green-button");
}

function resetConfirmButtonStyle() {
  confirmButton.classList.add("confirm-photo-button");
}

// JE REINITIALISE LE PREVIEW SI L'UTILISATEUR DECIDE FINALEMENT DE CHOISIR UNE AUTRE PHOTO:

imagePreviewZone.addEventListener("click", function (e) {
  e.preventDefault;
  resetPreview();
  hideFileSizeWarning()
});

function resetPreview() {
  imagePreviewZone.innerHTML = ``;
  imagePreviewZone.style.display = "none";
  inputZone.style.display = "flex";
  resetConfirmButtonStyle();
  imagesArray.pop();
}

// JE REINITIALISE LE FORMULAIRE D'AJOUT DE PHOTOS LORSQUE L'UTILISATEUR LE QUITTE ET Y REVIENT

returnButton.addEventListener("click", resetForm);

function resetForm() {
  addPhotoForm.reset();
  hideFileSizeWarning()
  resetPreview();
}
resetForm();
