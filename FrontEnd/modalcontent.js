// J'AFFICHE LA LISTE DEROULANTE DE CATEGORIES DE MANIERE DYNAMIQUE 

async function displayCategoriesInForm() {
  // Je récupère la liste de catégories
  const categoryResponse = await fetch("http://localhost:5678/api/categories");
  const categoryList = await categoryResponse.json();
  // J'instaure l'affichage dynamique des catégories dans le formulaire
  updateCategorySelector(categoryList);
}
displayCategoriesInForm();

/**updateCategorySelector génère dynamiquement les catégories au sein du formulaire d'ajout de photos */
function updateCategorySelector(categoryList) {
  //Pour chacune des catégories récupérées
  for (let i = 0; i < categoryList.length; i++) {

    // Je récupère les données afin de les exploiter
    const categoryNames = categoryList[i];

    // Je crée les éléments du DOM
    const categoryOption = document.createElement("option");
    categoryOption.classList.add("option-value");

    // Je les rattache au DOM
    categorySelector.appendChild(categoryOption);
    
    // Et je les utilise pour configurer mon formulaire 
    categoryOption.setAttribute("id", categoryNames.name);
    categoryOption.value = categoryNames.id;
    categoryOption.innerText = categoryNames.name;
  }
}



// JE MODIFIE LE STYLE DU BOUTON "VALIDER" LORSQUE LE FORMULAIRE EST COMPLET:

/**checkForm permet de vérifier que les champs du formulaire sont bien remplis et de modifier le style du bouton "valider" en fonction*/
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
      } 
      else {
        resetConfirmButtonStyle();
      }
    });
  });
}
checkForm();



// JE REINITIALISE LE PREVIEW SI L'UTILISATEUR DECIDE FINALEMENT DE CHOISIR UNE AUTRE PHOTO:

imagePreviewZone.addEventListener("click", function (e) {
  e.preventDefault;
  resetPreview();
  hideFileSizeWarning();
});


// JE REINITIALISE LE FORMULAIRE D'AJOUT DE PHOTOS LORSQUE L'UTILISATEUR LE QUITTE ET Y REVIENT

returnButton.addEventListener("click", resetForm);




// LES FONCTIONS UTILISEES:

                /**changeConfirmButtonStyle permet de modifier le style du bouton "valider" lorsque tous les champs du formulaire sont renseignés*/
                function changeConfirmButtonStyle() {
                  confirmButton.classList.remove("confirm-photo-button");
                  confirmButton.classList.add("green-button");
                }

                /**resetConfirmButtonStyle annule les modifications apportées au style du bouton "valider" */
                function resetConfirmButtonStyle() {
                  confirmButton.classList.add("confirm-photo-button");
                }

                /**hideFileSizeWarning() cache le message d'erreur lorsque le fichier trop lourd a été retiré */
                function hideFileSizeWarning() {
                  fileSizeWarning.classList.add("invisible-items");
                }

                /**Cette fonction réinitialise l'affichage de la zone dédiée à l'upload de photos */
                function resetPreview() {
                  imagePreviewZone.innerHTML = ``;
                  imagePreviewZone.style.display = "none";
                  inputZone.style.display = "flex";
                  resetConfirmButtonStyle();
                  imagesArray.pop();
                }

                /**resetForm permet de remettre à zéro le formulaire*/
                function resetForm() {
                  addPhotoForm.reset();
                  hideFileSizeWarning();
                  resetPreview();
                }



