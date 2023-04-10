const openModalButton = document.querySelectorAll(".open-js-modal");
const closeModalButton = document.querySelectorAll(".close-js-modal");
const fullModal = document.getElementById("modal");
const modalGalleryView = document.getElementById("modal-container");
const modalAddPhotoView = document.getElementById("add-photo-container");

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
const addPhotoButton=document.querySelector('.add-photo-button')
addPhotoButton.addEventListener('click', showAddPhotoModal)


// LES FONCTIONS UTILISEES : //
function openGalleryModal() {
  fullModal.style.display = "flex";
  modalGalleryView.style.display = "flex";
  modalAddPhotoView.style.display = "none";
}

function closeModalWindow() {
  fullModal.style.display = "none";
  const addPhotoForm=document.getElementById("add-photo-form");
  addPhotoForm.reset();
}
function showAddPhotoModal(){
    fullModal.style.display="flex";
    modalGalleryView.style.display="none";
    modalAddPhotoView.style.display="flex";
}


// J'affiche la liste des catégories de manière dynamique : 
async function displayCategoriesInForm(){
    // Je récupère la liste de catégories
    const categoryResponse=await fetch ('http://localhost:5678/api/categories');
    const categoryList=await categoryResponse.json();
        // J'instaure l'affichage dynamique des catégories dans le formulaire 
    updateCategorySelector(categoryList)
}
displayCategoriesInForm()

const categorySelector=document.getElementById('category-selector')
function updateCategorySelector(categoryList){
    for(let i=0; i<categoryList.length; i++){
        const categoryNames=categoryList[i]
        const categoryOption=document.createElement('option');
        categoryOption.classList.add("option-value")
        categoryOption.setAttribute('id', categoryNames.name)
        categorySelector.appendChild(categoryOption);
        categoryOption.value=categoryNames.id;
        categoryOption.innerText=categoryNames.name;
    }
}


