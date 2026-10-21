const fleche_sommaire = document.querySelector(".fleche-sommaire");
const div_sommaire = document.querySelector(".sommaire");
menu_ouvert = false;

let width_sommaire = div_sommaire.getBoundingClientRect().width;

div_sommaire.style.transform = "translateX(-" + width_sommaire + "px)";

fleche_sommaire.addEventListener("click", (e) => {
  if (menu_ouvert == false) {
    div_sommaire.style.transform = "translateX(0)";
    menu_ouvert = true;
  } else {
    div_sommaire.style.transform = "translateX(-" + width_sommaire + "px)";
    menu_ouvert = false;
  }
});
