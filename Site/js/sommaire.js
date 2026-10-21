const fleche_sommaire = document.querySelector(".fleche-sommaire");
const div_sommaire = document.querySelector(".sommaire");
menu_ouvert = false;

// Récupération de la largeur du sommaire, car elle varie en fonction des pages
let width_sommaire = div_sommaire.getBoundingClientRect().width;

// Position de départ : repliée
div_sommaire.style.transform = "translateX(-" + width_sommaire + "px)";

// Dès que l'utilisateur clique sur la div
fleche_sommaire.addEventListener("click", (e) => {
  if (menu_ouvert == false) {
    // Si le menu était fermé, alors ouverture
    div_sommaire.style.transform = "translateX(0)";
    menu_ouvert = true;
  } else {
    // Si le menu était ouvert, alors fermeture
    div_sommaire.style.transform = "translateX(-" + width_sommaire + "px)";
    menu_ouvert = false;
  }
});
