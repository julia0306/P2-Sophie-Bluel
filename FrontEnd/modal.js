export function editorAccess(){
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

//J'affiche la galerie dans la modale 

// Je récupère les travaux depuis l'API et je crée le contenu de ma modale
async function getWorks(){
    const galleryResponse=await fetch('http://localhost:5678/api/works');
    const galleryImages = await galleryResponse.json();
    
function showGallery(galleryImages){
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
        const deleteButton=document.querySelectorAll(".delete-btn")
        console.log(deleteButton, "delete");


//J'instaure la suppression des projets, au clic sur l'icône "corbeille"
deleteButton.forEach(button => {
    button.addEventListener("click", function(e) {
        e.preventDefault;
        let btnClicked = e.target;
            // Je récupère l'id du projet 
        let figureToDelete = btnClicked.closest('.modal-figure');
        const userToken=localStorage.getItem('token');
        console.log(figureToDelete,"ftd");
        const workID=figureToDelete.dataset.id;
        alert(workID +'will be deleted')
        async function deleteWorkfromGallery (workID){
            e.preventDefault
            await fetch('http://localhost:5678/api/works/'+ workID,{
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
                if(response.status === 200){
                    alert("Le projet a bien été supprimé")
                }})
        }
        deleteWorkfromGallery(workID)

    });

})
        }

showGallery(galleryImages);}
getWorks()


// J'instaure l'alternance de modale en fonction du comportement de l'utilisateur

const openModalButton=document.querySelectorAll(".open-js-modal");
const closeModalButton=document.querySelectorAll(".close-js-modal")
const modal1=document.getElementById('modal');
const modalDiv1=document.getElementById('modal-container');
const modalDiv2=document.getElementById('add-photo-container')
openModalButton.forEach(button=>{button.addEventListener('click', function(){
    modal1.style.display="flex";
    modalDiv1.style.display="flex";
    modalDiv2.style.display="none";

})})

//J'affiche la modale 1 si l'utilisateur clique sur la flèche 
const returnButton=document.querySelector('.return-button')
returnButton.addEventListener('click', function(){
    modal1.style.display="flex";
    modalDiv1.style.display="flex";
    modalDiv2.style.display="none";
})

// J'affiche la modale 2 lorsque l'utilisateur clique sur le bouton "ajouter photo"
const addPhotoButton=document.querySelector('.add-photo-button')
addPhotoButton.addEventListener('click', function(){
    modal1.style.display="flex";
    modalDiv1.style.display="none";
    modalDiv2.style.display="flex";
})

// Au clic sur la croix, je ferme la modale
closeModalButton.forEach(button=>{button.addEventListener('click', function(){
    modal1.style.display="none";
})
// Je ferme la modale lorsque l'utilisateur clique en dehors de la modale 
modal1.addEventListener('click', function(e){
    if(e.target===modal1){
    modal1.style.display="none";}
})})


const addPhotoContainer=document.getElementById('add-photo-container');
const modalContainer=document.getElementById('modal-container');
addPhotoButton.addEventListener('click', function(){
    modalContainer.style.display="none";
    addPhotoContainer.style.display="flex";
})


//Je mets en place le formulaire d'ajout de photos


async function fetchCategories(){
    // Je récupère la liste de catégories
    const categoryResponse=await fetch ('http://localhost:5678/api/categories');
    const categoryList=await categoryResponse.json();
    console.log(categoryList);
    const categorySelector=document.getElementById('category-selector')
    // J'instaure l'affichage dynamique des catégories dans le formulaire 
    function updateCategorySelector(categoryList){
        for(let i=0; i<categoryList.length; i++){
            const categoryNames=categoryList[i]
            console.log(categoryNames)
            const categoryOption=document.createElement('option');
            categoryOption.classList.add('option-value')
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
    imagesArray.push(file[0]);
    output.addEventListener('click', function(){
        output.style.display="none";
        inputZone.style.display="flex";
        imagesArray=""
    })
    displayImages()
})

function displayImages(){
    let images="";
    imagesArray.forEach((image) => {
        images += `<div class="uploaded-image">
                <img id="uploaded-image" src="${URL.createObjectURL(image)}" alt="image">
              </div>`
    })
    output.innerHTML=images
}


        


// Je réinitialise le formulaire lorsque je le quitte:


// Envoi du formulaire vie API

const addPhotoForm=document.getElementById("add-photo-form")
addPhotoForm.addEventListener('submit',function (e){
    e.preventDefault;
    console.log('form submitted')
    const userToken=localStorage.getItem('token');
    const imageInput=document.getElementById('actual-btn');
    const uploadedImage= imageInput.files[0];
    const title = document.getElementById("title");
    const titleValue= title.value;
    const categoryId = document.getElementById("category-selector");
    const categoryNumber=categoryId.value;
    const formData = new FormData();
    formData.append("image", uploadedImage);
    formData.append("title", titleValue);
    formData.append("category", categoryNumber);
    async function addPhotoToAPI(){
    await fetch('http://localhost:5678/api/works', {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + userToken,
                accept: "application/json"},
            body: formData,
    })
    .then ((response)=>{
        if(response.status === 401){
            alert("Vous n'êtes pas autorisé à ajouter ce projet")}
        if(response.status === 400){
            alert("Cette action ne peut être réalisée")}
        if(response.status === 500){
            alert("Une erreur inattendue est survenue")}    
        if(response.status === 200){
            alert("Le projet a bien été ajouté")
        }})}
        addPhotoToAPI()
    })