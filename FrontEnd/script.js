                                        // JE RECUPERE LES TRAVAUX DEPUIS LE BACK-END 

    const worksURL= 'http://localhost:5678/api/works'
    const getWorks=await fetch(worksURL);
    const galleryImages = await getWorks.json();


//Je génère la fonction qui me permettra d'afficher les images dans la galerie
function showGallery(galleryImages){
    for (let i = 0; i < galleryImages.length; i++){
        const imageData=galleryImages[i];

    //Je crée un contenant pour l'image et ses dépendances
    const galleryFigure = document.createElement("figure");
    const galleryImage = document.createElement("img");
    galleryImage.src=imageData.imageUrl;
    const imageTitle = document.createElement("figcaption");
    imageTitle.innerText = imageData.title;
    galleryFigure.classList.add("filterType", imageData.categoryId);

// Je rattache les balises au DOM
    const gallery = document.querySelector(".gallery");
    gallery.appendChild(galleryFigure);
    galleryFigure.appendChild(galleryImage);
    galleryFigure.appendChild(imageTitle);
    galleryFigure.dataset.id=imageData.id;
    galleryImage.alt=imageData.title;};
    }
    showGallery(galleryImages);
    

                                        // JE METS EN PLACE LES FILTRES 

// Je crée un eventListener pour écouter l'événement 'click'
//Je modifie l'innerHTML pour afficher seulement les images qui correspondent au filtre
    const allButton = document.querySelector(".all-button");
    const objectsButton = document.querySelector(".objects-button");
    const appartmentsButton = document.querySelector(".appartments-button");
    const hotelsButton = document.querySelector(".hotels-button");
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

                                        //JE GENERE UN FORMULAIRE DE CONNEXION FONCTIONNEL (cf. login.js)

                                        // JE METS EN PLACE L'AFFICHAGE DU MODE "ADMIN"

function editorAccess(){
    const editorContent=document.querySelectorAll('.editor-content');
    const logoutButton=document.getElementById('logout-btn');
    const loginButton=document.getElementById('login-btn');
    const userToken=localStorage.getItem('token');
    const filterBar=document.querySelector('.filterbar');

    // Je modifie l'affichage lorsque l'utilisateur est bien connecté
    if (userToken){
        for(let i=0; i<editorContent.length; i++){
        editorContent[i].style.display="inline-flex"};
        loginButton.style.display="none";
        logoutButton.style.display="block";
        filterBar.innerHTML='';
        }
        // Je retire l'affichage du mode édition lorsqu'il se déconnecte
    logoutButton.addEventListener('click', function(){
    for(let i=0; i<editorContent.length; i++){
        editorContent[i].style.display="none"};
    localStorage.clear('token');
    loginButton.style.display="block";
    logoutButton.style.display="none";
    })
    }
editorAccess()

                                        // JE METS EN PLACE LE PREMIER AFFICHAGE DE LA FENETRE MODALE 

// J'affiche les images en provenance du Backend dans la galerie de la modale: 
function showModalGallery(galleryImages){
        for (let i = 0; i < galleryImages.length; i++){
    const modalGallery=document.querySelector(".modal-gallery")
    const imageData=galleryImages[i];
    const modalFigure = document.createElement("figure");
    const modalImage=document.createElement('img');
    const modalCaption = document.createElement("figcaption");
    modalGallery.appendChild(modalFigure);
    modalFigure.appendChild(modalImage);
    modalImage.src=imageData.imageUrl;
    modalFigure.appendChild(modalCaption);
    modalFigure.classList.add('modal-figure');
    modalFigure.dataset.id=imageData.id;
    modalCaption.innerText="éditer";
    const iconDiv = document.createElement('div')
    modalFigure.appendChild(iconDiv);
    iconDiv.innerHTML=
        `<div class="icon-div">
        <button class="maximize-btn"><i class="fa-solid fa-arrows-up-down-left-right"></i></button>
        <button class="delete-btn"><i class="fa-solid fa-trash-can"></i></button>
        </div>`;}

    // J'instaure la fonction "suppression de l'ensemble des travaux" 
        const deleteButton=document.querySelectorAll(".delete-btn")
        const userToken=localStorage.getItem('token');
        const modalFigures=document.querySelectorAll('.modal-figure')
        const modalGalleryDeletionLink = document.querySelector('.delete-gallery-link')
modalGalleryDeletionLink.addEventListener('click', function (e){
    e.preventDefault();
    deleteAllWorks();}
    )

    async function deleteAllWorks(){
        if (confirm("Voulez-vous vraiment supprimer l'ensemble des projets ?")){
            for (let i=0; i<modalFigures.length; i++){await fetch('http://localhost:5678/api/works/'+ modalFigures[i].dataset.id,{
                method:'DELETE',
                headers:{
                    "Authorization": "Bearer " + userToken
                }
            })
            .then ((response)=>{
                if(response.status === 401){
                    alert("Vous n'êtes pas autorisé à supprimer ce projet")}
                if(response.status === 404){
                        alert("Cette action ne peut être réalisée")}
                if(response.status === 200 || 201){
                    const modalGallery=document.querySelector('.modal-gallery')
                    modalGallery.innerHTML="";
                }})
            }}
        }

//J'instaure la suppression d'un projet spécifique, au clic sur l'icône "corbeille"
deleteButton.forEach(button => {
    button.addEventListener("click", function(e) {
        e.preventDefault;
        let btnClicked = e.target;
            // Je récupère l'id du projet 
        let figureToDelete = btnClicked.closest('.modal-figure');
        const userToken=localStorage.getItem('token');
        const workID=figureToDelete.dataset.id;
        async function deleteWorkfromGallery (e){
            e.preventDefault
            await fetch('http://localhost:5678/api/works/'+ workID,{
                method:'DELETE',
                headers:{
                    "Authorization": "Bearer " + userToken
                                }
            })
            .then ((response)=>{
                if(response.status === 204){
                    figureToDelete.remove()}
                if(response.status === 401){
                    alert("Vous n'êtes pas autorisé à supprimer ce projet")}
                if(response.status === 404){
                    alert("Cette action ne peut être réalisée")}
                })
    
        }
        deleteWorkfromGallery(workID)
    });

})
}
        
//J'exécute la fonction qui permet l'affichage de la galerie dans la modale: 
showModalGallery(galleryImages);

                                        // JE METS EN PLACE LE SECOND AFFICHAGE DE LA FENETRE MODALE

// J'instaure la fonction qui permet d'envoyer le formulaire d'ajout de photos à l'API
const addPhotoForm=document.getElementById("add-photo-form")
addPhotoForm.addEventListener('submit',function (e){
    e.preventDefault();
    addPhotoToAPI();
    showAddedPhoto();
    })

    // J'envoie ma requête à l'API:
    async function addPhotoToAPI(){
        const userToken=localStorage.getItem('token');
    const imageInput=document.getElementById('actual-btn');
    const uploadedImage= imageInput.files[0];
    const title = document.getElementById("title-field");
    const titleValue= title.value;
    const categoryId = document.getElementById("category-selector");
    const categoryNumber=categoryId.value;
    const formData = new FormData();
    formData.append("image", uploadedImage);
    formData.append("title", titleValue);
    formData.append("category", categoryNumber);
    await fetch(worksURL, {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + userToken,
                    accept: "application/json"},
                body: formData,
        })
        .then ((response)=>{
            if(response.status === 201){
                resetConfirmButtonStyle()
                // J'actualise le contenu de la galerie de la modale:
                const modalGallery=document.querySelector('.modal-gallery')
                modalGallery.innerHTML="";
                showModalGallery(galleryImages)
            }
            if(response.status === 401){
                alert("Vous n'êtes pas autorisé à ajouter ce projet")}
            if(response.status === 400){
                alert("Cette action ne peut être réalisée")}
            if(response.status === 500){
                alert("Une erreur inattendue est survenue")}    
    })
}

// Je redirige vers l'ajout de photos lorsque l'image est envoyée
    function showAddedPhoto(){
        const inputZone= document.querySelector('.input-zone');
        output.innerHTML=``
        output.style.display="none";
        inputZone.style.display="flex";
        addPhotoForm.reset();
    }

                                        // J'INSTAURE L'ALTERNANCE DES AFFICHAGES DE LA MODALE EN FONCTION DU COMPORTEMENT DE L'UTILISATEUR
  
// J'instaure l'affichage par défaut de la modale

const openModalButton=document.querySelectorAll(".open-js-modal");
const closeModalButton=document.querySelectorAll(".close-js-modal")
const fullModal=document.getElementById('modal');
const modalGalleryView=document.getElementById('modal-container');
const modalAddPhotoView=document.getElementById('add-photo-container')
openModalButton.forEach(button=>{button.addEventListener('click', function(){
    fullModal.style.display="flex";
    modalGalleryView.style.display="flex";
    modalAddPhotoView.style.display="none";
})})


// J'affiche la modale "ajout de photos" lorsque l'utilisateur clique sur le bouton "+ ajouter"
const addPhotoButton=document.querySelector('.add-photo-button')
addPhotoButton.addEventListener('click', function(){
    fullModal.style.display="flex";
    modalGalleryView.style.display="none";
    modalAddPhotoView.style.display="flex";
})

// Au clic sur la croix, je ferme la modale
closeModalButton.forEach(button=>{button.addEventListener('click', function(){
    fullModal.style.display="none";
    document.location.reload(".gallery")
})
// Je ferme la modale lorsque l'utilisateur clique en dehors de la modale 
fullModal.addEventListener('click', function(e){
    if(e.target===fullModal){
    fullModal.style.display="none";
    document.location.reload(".gallery")
}
})})

                                        // JE METS EN PLACE LES FONCTIONNALITES DU FORMULAIRE 

//Je mets en place le sélecteur de catégories à l'ajout de nouvelles photos : 

async function fetchCategories(){
    // Je récupère la liste de catégories
    const categoryResponse=await fetch ('http://localhost:5678/api/categories');
    const categoryList=await categoryResponse.json();
    const categorySelector=document.getElementById('category-selector')
    // J'instaure l'affichage dynamique des catégories dans le formulaire 
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
    updateCategorySelector(categoryList)
}
fetchCategories()

//Je gère la modale d'ajout de photos
const input= document.getElementById('actual-btn');
const output=document.querySelector('.photo-output-area');
let imagesArray = [];
input.addEventListener("change",() => {
    const inputZone= document.querySelector('.input-zone')
    inputZone.style.display="none";
    output.style.display="block";
    const file = input.files;
    imagesArray.pop();
    imagesArray.push(file[0]);
    console.log(imagesArray)
    displayImages();
    checkForm()})

// J'instaure le preview
function displayImages(){
    let images="";
    imagesArray.forEach((image) => {
        images += `<div class="uploaded-image">
                <img id="uploaded-image" src="${URL.createObjectURL(image)}" alt="image">
              </div>`
    })
    output.innerHTML=images
}

// J'instaure le changement de style au niveau du bouton "valider" dès que le formulaire est complet
function checkForm(){
    const categorySelector=document.getElementById('category-selector')
    const mandatoryFields=document.querySelectorAll('.mandatory-fields');
    const titleField=document.getElementById('title-field');
    mandatoryFields.forEach(field=>{field.addEventListener('input', function(){
    if (categorySelector.value>0 && categorySelector.value<4 && imagesArray.length===1 && titleField.value.length>1){
        changeConfirmButtonStyle()}
    else{
    resetConfirmButtonStyle()}
})})
}
checkForm()


// Je modifie le style du bouton "valider" lorsque le formulaire est complet
const confirmButton= document.querySelector('.confirm-photo-button');
function changeConfirmButtonStyle(){
    confirmButton.classList.remove("confirm-photo-button")
    confirmButton.classList.add("green-button")
}

function resetConfirmButtonStyle(){
    confirmButton.classList.add("confirm-photo-button");
}

// Je réinitialise le preview si l'utilisateur clique sur l'image pour choisir un autre fichier
function resetPreview(){
    const inputZone= document.querySelector('.input-zone');
    output.innerHTML=``
    output.style.display="none";
    inputZone.style.display="flex";
    resetConfirmButtonStyle();
    imagesArray.pop();
}

output.addEventListener('click', function(e){
    e.preventDefault;
    resetPreview()
})

// Je réinitialise le formulaire d'ajout de photos lorsque l'utilisateur l'a quitté et y revient 
const returnButton=document.querySelector('.RB')
console.log(returnButton)
returnButton.addEventListener('click', function(){
    console.log('click');
    addPhotoForm.reset();
    resetPreview()
})