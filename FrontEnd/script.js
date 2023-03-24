    const getWorks=await fetch('http://localhost:5678/api/works');
    const galleryImages = await getWorks.json();
    export {galleryImages};

//Je déclare les variables dont je vais avoir besoin 
const gallery = document.querySelector(".gallery");

//Je génère la fonction qui me permettra d'afficher les images dans la galerie
function showGallery(galleryImages){
    for (let i = 0; i < galleryImages.length; i++){
        const imageData=galleryImages[i];

    //Je crée un contenant pour l'image et ses dépendances
    const figure = document.createElement("figure");
    const individualImage = document.createElement("img");
    individualImage.src=imageData.imageUrl;
    const imageTitle = document.createElement("figcaption");
    imageTitle.innerText = imageData.title;
    figure.classList.add("filterType", imageData.categoryId);

// Je rattache les balises au DOM
    gallery.appendChild(figure);
    figure.appendChild(individualImage);
    figure.appendChild(imageTitle);
    individualImage.alt=imageData.title;};
    }

// J'exécute la fonction pour afficher la galerie
    showGallery(galleryImages);
    

// les boutons

const allButton = document.querySelector(".all-button");
const objectsButton = document.querySelector(".objects-button");
const appartmentsButton = document.querySelector(".appartments-button");
const hotelsButton = document.querySelector(".hotels-button");

        
// Je crée un eventListener pour écouter l'événement 'click'
//Je modifie l'innerHTML pour afficher seulement les images qui correspondent au filtre
    
    allButton.addEventListener("click", function(){
        gallery.innerHTML = "";
        showGallery(galleryImages)
    });    

    objectsButton.addEventListener("click", function(){
        const objectGallery = galleryImages.filter(function(data){
            return data.categoryId == 1});
        gallery.innerHTML = "";
        showGallery(objectGallery)
    });

    appartmentsButton.addEventListener("click", function(){
            const appartmentsGallery = galleryImages.filter(function(data){
                return data.categoryId == 2
            });
            gallery.innerHTML = "";
            showGallery(appartmentsGallery);
    });

    hotelsButton.addEventListener("click", function(){
        const hotelsGallery = galleryImages.filter(function(data){
            return data.categoryId == 3
        });
        gallery.innerHTML = "";
        showGallery(hotelsGallery);
});

export {showGallery}
import { editorAccess } from "./modal.js";
import { displayModal } from "./modal.js";

editorAccess()
displayModal