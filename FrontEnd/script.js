console.log('Connecté !');
const gallery = document.querySelector(".gallery")



async function getProjects(){
    //Récupération des données depuis le fichier JSON
    const response=await fetch('http://localhost:5678/api/works')
    const galleryImages = await response.json();

    for (let i = 0; i < galleryImages.length; i++){

    // Création des balises 
    const imageData=galleryImages[i];
    const figure = document.createElement("figure")
    const individualImage = document.createElement("img");
    individualImage.src=imageData.imageUrl;
    const imageTitle = document.createElement("figcaption");
    imageTitle.innerText = imageData.title;
    
    // Rattachement des balises au DOM
    gallery.appendChild(figure);
    figure.appendChild(individualImage);
    figure.appendChild(imageTitle);
    individualImage.alt=imageData.title
} 
}

getProjects();




