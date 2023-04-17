// au clic sur le bouton "Modifier", j'affiche la modale
openModalButton.forEach((button) => {
  button.addEventListener("click", openGalleryModal);
});
// au clic sur la croix, je referme la modale
closeModalButton.forEach((button) => {
  button.addEventListener("click", closeModalWindow);
});
// au clic en dehors de la modale, je referme la modale
fullModal.addEventListener("click", function (e) {
  if (e.target === fullModal) {
    closeModalWindow();
  }
});

// J'affiche la modale "ajout de photos" lorsque l'utilisateur clique sur le bouton "+ ajouter"
const addPhotoButton = document.querySelector(".add-photo-button");
addPhotoButton.addEventListener("click", showAddPhotoModal);



// LES FONCTIONS UTILISEES : //

/**openGalleryModal permet d'ouvrir la vue 1 de la modale (vue d'ensemble de gallerie / suppression) */
function openGalleryModal() {
  fullModal.style.display = "flex";
  modalGalleryView.style.display = "flex";
  modalAddPhotoView.style.display = "none";
}

/**closeModalWindow referme l'ensemble de la modale */
function closeModalWindow() {
  fullModal.style.display = "none";
  resetForm()
}

/**showAddPhotoModal affiche la vue 2 de la modale (formulaire d'ajout de photos) */
function showAddPhotoModal() {
  fullModal.style.display = "flex";
  modalGalleryView.style.display = "none";
  modalAddPhotoView.style.display = "flex";
}
