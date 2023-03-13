console.log('Connecté !');

//J'initialise les variables dont je vais avoir besoin 
const gallery = document.querySelector(".gallery");
console.log(gallery, 'gallery')

    // les boutons

const allButton = document.querySelector(".all-button");
console.log(allButton, 'all button');

const objectsButton = document.querySelector(".objects-button");
console.log(objectsButton, 'objects button');

const appartmentsButton = document.querySelector(".appartments-button");
console.log(appartmentsButton, 'appartments button');

const hotelsButton = document.querySelector(".hotels-button");
console.log(hotelsButton, 'hotels button');

//Je récupère les données depuis le fichier JSON
async function getData(){
    const galleryResponse=await fetch('http://localhost:5678/api/works');
    const galleryImages = await galleryResponse.json();
    console.log(galleryImages, 'gallery images');

    function showGallery(galleryImages){
    for (let i = 0; i < galleryImages.length; i++){
        const imageData=galleryImages[i];

//Je crée les balises dont je vais avoir besoin pour l'affichage dynamique
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
    

        
        // Je crée un eventListener pour écouter l'événement click
        //Je modifie l'innerHTML pour afficher seulement les images qui correspondent au filtre
    
    allButton.addEventListener("click", function(){
        console.log('bouton "tous" cliqué');
        gallery.innerHTML = "";
        showGallery(galleryImages)
    });    

    objectsButton.addEventListener("click", function(){
        console.log('bouton "objets" cliqué');
        const objectGallery = galleryImages.filter(function(data){
            return data.categoryId == 1});
        console.log(objectGallery, 'object gallery');
        gallery.innerHTML = "";
        showGallery(objectGallery)
    });

    appartmentsButton.addEventListener("click", function(){
            console.log('bouton "appartements" cliqué');
            const appartmentsGallery = galleryImages.filter(function(data){
                return data.categoryId == 2
            });
            console.log(appartmentsGallery, 'appartments gallery');
            gallery.innerHTML = "";
            showGallery(appartmentsGallery);
    });

    hotelsButton.addEventListener("click", function(){
        console.log('bouton "hôtels" cliqué');
        const hotelsGallery = galleryImages.filter(function(data){
            return data.categoryId == 3
        });
        console.log(hotelsGallery, 'hotels gallery');
        gallery.innerHTML = "";
        showGallery(hotelsGallery);

});
    }

    getData ();
 






