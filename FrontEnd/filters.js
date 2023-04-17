// JE METS EN PLACE LES FILTRES

function filterGallery(returnedImages) {
    // Au clic sur le bouton "TOUS", j'affiche tous les travaux:
    allButton.addEventListener("click", function () {
      gallery.innerHTML = "";
      displayGallery(returnedImages);
    });
  
    // Au clic sur le bouton "Objets", j'affiche les objets:
    objectsButton.addEventListener("click", function () {
      const objectGallery = returnedImages.filter(function (data) {
        return data.categoryId == 1;
      });
      // Effacement de la galerie et régénération de la galerie incluant uniquement les objets (Id=1)
      gallery.innerHTML = "";
      displayGallery(objectGallery);
    });
  
    // Idem pour les appartements:
    appartmentsButton.addEventListener("click", function () {
      const appartmentsGallery = returnedImages.filter(function (data) {
        return data.categoryId == 2;
      });
      gallery.innerHTML = "";
      displayGallery(appartmentsGallery);
    });
  
    // Et pour les hôtels et les restaurants:
    hotelsButton.addEventListener("click", function () {
      const hotelsGallery = returnedImages.filter(function (data) {
        return data.categoryId == 3;
      });
      gallery.innerHTML = "";
      displayGallery(hotelsGallery);
    });
  }
  