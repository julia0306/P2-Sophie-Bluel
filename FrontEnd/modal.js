// Je déclare mes variables 
const editorContent=document.querySelectorAll('.editor-content');
const logoutButton=document.getElementById('logout-btn');
const loginButton=document.getElementById('login-btn');
const filterBar=document.querySelector('.filterbar')
const editGalleryButton=document.querySelector('.js-modal');
const modalGallery=document.querySelector('.modal-gallery');
const trashIcon = document.querySelector('.fa-trash-bin');
const modalContainer=document.getElementById('modal-container');
const maximizeIcon =modalContainer.querySelectorAll('.fa-arrows-up-down-left-right');
console.log(maximizeIcon, "MI");
const userToken=localStorage.getItem('token');



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
})

// J'affiche la modale lorsque l'utilisateur clique sur le bouton "Modifier'
let modal = null
const openModal = function(e){
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href'))
    target.style.display=null
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', 'true')
    modal=target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.fa-times').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}
// Je supprime la modale lorsque l'utilisateur clique sur la croix ou sur la fenêtre modale
const closeModal = function(e){
    if (modal === null) return
    e.preventDefault()
    modal.style.display="none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.fa-times').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal = null
}
// J'empêche la modale de se refermer lorsque l'utilisateur clique sur le contenu de la modale
const stopPropagation = function (e) {
    e.stopPropagation()
}

document.querySelectorAll('.js-modal').forEach(a =>{a.addEventListener('click', openModal)

})
// J'instaure la fermeture de la modale au clic de la touche "Echap"
window.addEventListener('keydown', function(e){
    if (e.key === 'Escape' || e.key === "Esc"){closeModal(e)}
})



