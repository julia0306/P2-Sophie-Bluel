// J'affiche la liste des catégories de manière dynamique :
async function displayCategoriesInForm() {
  // Je récupère la liste de catégories
  const categoryResponse = await fetch("http://localhost:5678/api/categories");
  const categoryList = await categoryResponse.json();
  // J'instaure l'affichage dynamique des catégories dans le formulaire
  updateCategorySelector(categoryList);
}
displayCategoriesInForm();

function updateCategorySelector(categoryList) {
  for (let i = 0; i < categoryList.length; i++) {
    const categoryNames = categoryList[i];
    const categoryOption = document.createElement("option");
    categoryOption.classList.add("option-value");
    categoryOption.setAttribute("id", categoryNames.name);
    categorySelector.appendChild(categoryOption);
    categoryOption.value = categoryNames.id;
    categoryOption.innerText = categoryNames.name;
  }
}

/**showFileSizeWarning affiche un message d'erreur lorsque le fichier est trop lourd */
function showFileSizeWarning() {
  fileSizeWarning.classList.remove("invisible-items");
}

/**hideFileSizeWarning() cache le message d'erreur lorsque le fichier trop lourd a été retiré */
function hideFileSizeWarning() {
  fileSizeWarning.classList.add("invisible-items");
}

/**
 *  returnToAddPhotoForm redirige vers le formulaire lorsque l'image est envoyée
 */

function returnToAddPhotoForm() {
  imagePreviewZone.innerHTML = ``;
  imagePreviewZone.style.display = "none";
  inputZone.style.display = "flex";
  resetForm();
}

// JE MODIFIE LE STYLE DU BOUTON "VALIDER" LORSQUE LE FORMULAIRE EST COMPLET:
/**
 * checkForm permet de vérifier que les champs du formulaire sont bien remplis
 */
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
        changeConfirmButtonStyle();
      } else {
        resetConfirmButtonStyle();
      }
    });
  });
}
checkForm();

/**
 * changeConfirmButtonStyle permet de modifier le style du bouton "valider" lorsque tous les champs du formulaire sont renseignés
 */
function changeConfirmButtonStyle() {
  confirmButton.classList.remove("confirm-photo-button");
  confirmButton.classList.add("green-button");
}

/**resetConfirmButtonStyle annule les modifications apportées au style du bouton "valider" */
function resetConfirmButtonStyle() {
  confirmButton.classList.add("confirm-photo-button");
}

// JE REINITIALISE LE PREVIEW SI L'UTILISATEUR DECIDE FINALEMENT DE CHOISIR UNE AUTRE PHOTO:

imagePreviewZone.addEventListener("click", function (e) {
  e.preventDefault;
  resetPreview();
  hideFileSizeWarning();
});

/**Cette fonction réinitialise l'affichage de la zone dédiée à l'upload de photos */
function resetPreview() {
  imagePreviewZone.innerHTML = ``;
  imagePreviewZone.style.display = "none";
  inputZone.style.display = "flex";
  resetConfirmButtonStyle();
  imagesArray.pop();
}

// JE REINITIALISE LE FORMULAIRE D'AJOUT DE PHOTOS LORSQUE L'UTILISATEUR LE QUITTE ET Y REVIENT

returnButton.addEventListener("click", resetForm);

/**
 * resetForm permet de remettre à zéro le formulaire
 */
function resetForm() {
  addPhotoForm.reset();
  hideFileSizeWarning();
  resetPreview();
}
resetForm();
