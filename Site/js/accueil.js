const btn_menu = document.querySelector(".btn-menu");
const sous_menu = document.querySelector(".sous-menu");
menu_ouvert = false;

btn_menu.addEventListener("click", (e) => {
  if (menu_ouvert == false) {
    sous_menu.style.transform = "translateX(0)";
    menu_ouvert = true;
  } else {
    sous_menu.style.transform = "translateX(-180px)";
    menu_ouvert = false;
  }
});

