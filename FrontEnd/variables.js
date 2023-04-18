
const WORKS_URL = "http://localhost:5678/api/works";



// Les galeries
const gallery = document.getElementById("gallery");
const modalGallery = document.getElementById("modal-gallery");



// Les boutons des filtres
const allButton = document.querySelector(".all-button");
const objectsButton = document.querySelector(".objects-button");
const appartmentsButton = document.querySelector(".appartments-button");
const hotelsButton = document.querySelector(".hotels-button");



// Les éléments permettant d'afficher ou non la modale
const openModalButton = document.querySelectorAll(".open-js-modal");
const closeModalButton = document.querySelectorAll(".close-js-modal");
const fullModal = document.getElementById("modal");
const modalGalleryView = document.getElementById("modal-container");
const modalAddPhotoView = document.getElementById("add-photo-container");



// Les éléments de la modale "galerie"
const modalGalleryDeletionLink = document.querySelector(".delete-gallery-link");



// Les éléments de la modale "ajout de photos"
const returnButton = document.querySelector(".RB");
const addPhotoForm = document.getElementById("add-photo-form");
const categorySelector = document.getElementById("category-selector");
const mandatoryFields = document.querySelectorAll(".mandatory-fields");
const titleField = document.getElementById("title-field");
const input = document.getElementById("photo-input-button");
const imagePreviewZone = document.getElementById("image-preview-zone");
const fileSizeWarning = document.getElementById("file-size-warning");
const confirmButton = document.querySelector(".confirm-photo-button");
const imageInput = document.getElementById("photo-input-button");
const inputZone = document.getElementById("input-zone");



// Les éléments nécessaires à l'affichage du mode "édition"
const editorContent = document.querySelectorAll(".editor-content");
const logoutButton = document.getElementById("logout-btn");
const loginButton = document.getElementById("login-btn");
const filterBar = document.getElementById("filterbar");
