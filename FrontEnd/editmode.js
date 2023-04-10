
const editorContent = document.querySelectorAll(".editor-content");
const logoutButton = document.getElementById("logout-btn");
const loginButton = document.getElementById("login-btn");
const filterBar = document.querySelector(".filterbar");

// JE METS EN PLACE L'AFFICHAGE DU MODE "ADMIN"

function manageEditorAccess() {
  const userToken = localStorage.getItem("token");
  // Je modifie l'affichage lorsque l'utilisateur est bien connecté
  if (userToken) {
    showAdminContent();
  }
  // Je supprime le token du "LocalStorage" si l'utilisateur clique sur le bouton "logout"
  clearLocalStorage();
}
manageEditorAccess();


// LES FONCTIONS UTILISEES :
function showAdminContent() {
  for (let i = 0; i < editorContent.length; i++) {
    editorContent[i].style.display = "inline-flex";
  }
  loginButton.style.display = "none";
  logoutButton.style.display = "block";
  filterBar.style.display = "none";
}

function clearLocalStorage() {
  logoutButton.addEventListener("click", function () {
    localStorage.clear("token");
  });
}
