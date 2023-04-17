// JE METS EN PLACE L'AFFICHAGE DU MODE "ADMIN"

function manageEditorAccess() {
  const userToken = localStorage.getItem("token");
  if (userToken) {
    showAdminContent();
  }
  clearLocalStorage();
}
manageEditorAccess();


// LES FONCTIONS UTILISEES :

/**showAdminContent affiche le contenu du mode éditeur lorsqu'un token se trouve dans le LS */
function showAdminContent() {
  for (let i = 0; i < editorContent.length; i++) {
    editorContent[i].style.display = "flex";
  }
  loginButton.style.display = "none";
  logoutButton.style.display = "block";
  filterBar.style.display = "none";
}

/**clearLocalStorage permet de supprimer le token du LS lorsque l'utilisateur clique sur le bouton "logout" */
function clearLocalStorage() {
  logoutButton.addEventListener("click", function () {
    localStorage.clear("token");
  })
}
