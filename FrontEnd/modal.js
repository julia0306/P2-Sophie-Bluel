// Je déclare mes variables 
const editorContent=document.querySelectorAll('.editor-content');
const logoutButton=document.getElementById('logout-btn');
const loginButton=document.getElementById('login-btn');
const filterBar=document.querySelector('.filterbar')
const editGalleryButton=document.querySelector('.edit-link-b');
const modalContainer=document.getElementById('modal-container');
const modalGallery=document.querySelector('.modal-gallery');
const icon = document.querySelector('.fa-times');
const maximizeIcon =modalContainer.querySelectorAll('.fa-arrows-up-down-left-right');
console.log(maximizeIcon, "MI")
const trashIcon = document.querySelector('.fa-trash-bin');
const userToken=localStorage.getItem('token');
const modalWrapper=document.querySelector('.modal-wrapper');


// Je récupère les travaux depuis l'API et je crée ma modale
async function getData(){
    const galleryResponse=await fetch('http://localhost:5678/api/works');
    const galleryImages = await galleryResponse.json();
    console.log(galleryImages, 'gallery images 2');
    function showGallery(galleryImages){
        for (let i = 0; i < galleryImages.length; i++){
        const imageData=galleryImages[i];
    const modalFigure = document.createElement("figure");
    const modalImage=document.createElement('img');
    const modalCaption = document.createElement("figcaption");
    modalGallery.appendChild(modalFigure);
    modalFigure.appendChild(modalImage);
    modalImage.src=imageData.imageUrl;
    modalFigure.appendChild(modalCaption);
    modalCaption.innerText="éditer";
    const iconDiv = document.createElement('div')
    modalFigure.appendChild(iconDiv);
    iconDiv.innerHTML=
        `<div class="icon-div">
        <a href="#"><i class="fa-solid fa-arrows-up-down-left-right"></i></a>
        <a href="#"><i class="fa-solid fa-trash-can"></i></a>
        </div>`;}
    }
    
    showGallery(galleryImages);
}

getData()


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
    console.log('logout clicked');
    localStorage.clear('token');
    loginButton.style.display="block";
    logoutButton.style.display="none";
    modalContainer.style.display="none";
})


// J'affiche la modale lorsque l'utilisateur clique sur le bouton "Modifier'

editGalleryButton.addEventListener('click', function(e){
    e.preventDefault;
    modalWrapper.style.visibility="visible"
})

// Je cache la modale lorsque l'utilisateur clique sur l'icône "x"

icon.addEventListener('click', function(e){
    e.preventDefault;
    modalWrapper.style.visibility="hidden"}
)

//Ou bien s'il clique ailleurs sur la page
modalWrapper.addEventListener('click', function(e){
    e.preventDefault;
    modalWrapper.style.visibility='hidden'
})


