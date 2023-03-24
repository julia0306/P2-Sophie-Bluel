import {galleryImages} from "./script.js";
import {showGallery} from "./script.js";

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

export function displayModal(){
// J'affiche la modale lorsque l'utilisateur clique sur le bouton "Modifier'
let modal = null

const openModal = function(e){
    e.preventDefault()
    //2. Mon target = le lien"#modal1"
    const target = document.querySelector(e.target.getAttribute('href'))
    //3. J'annule le display "none"
    target.style.display=null
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', 'true')
    //modal= "#modal1"
    modal=target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.fa-times').addEventListener('click', closeModal)
    modal.querySelector('.close-space').addEventListener('click', stopPropagation)


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
    modal.querySelector('.close-space').removeEventListener('click', stopPropagation)
    modal = null
}
// J'empêche la modale de se refermer lorsque l'utilisateur clique sur le contenu de la modale
const stopPropagation = function (e) {
    e.stopPropagation()
}

document.querySelectorAll('.open-js-modal').forEach(a =>{a.addEventListener('click', openModal)})


// J'instaure la fermeture de la modale au clic de la touche "Echap"
window.addEventListener('keydown', function(e){
    if (e.key === 'Escape' || e.key === "Esc"){closeModal(e)}
})

}
displayModal()

// J'instaure l'alternance de modale en fonction du comportement de l'utilisateur


const addPhotoButton=document.querySelector('.add-photo-button');
const addPhotoContainer=document.getElementById('add-photo-container');
const modalContainer=document.getElementById('modal-container');
addPhotoButton.addEventListener('click', function(){
    modalContainer.style.display="none";
    addPhotoContainer.style.display="flex";
})
