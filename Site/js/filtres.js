const lettres_allcontainer_volume_1 = document.querySelector(
  "#lettre-container-volume-1",
);
const lettres_allcontainer_volume_2 = document.querySelector(
  "#lettre-container-volume-2",
);
const lettres_container = document.querySelector(".display-lettres");
const lettres = document.querySelectorAll(".lettre");

const btn_volume_1 = document.querySelector("#btn-volume-1");
const btn_volume_2 = document.querySelector("#btn-volume-2");
const fleche_volume_1 = document.querySelector("#btn-volume-1 i");
const fleche_volume_2 = document.querySelector("#btn-volume-2 i");

let volume_1_ouvert = false;
let volume_2_ouvert = false;

btn_volume_1.addEventListener("click", (e) => {
  if (volume_1_ouvert == false) {
    lettres_allcontainer_volume_1.style.display = "block";
    fleche_volume_1.style.rotate = "180deg";
    btn_volume_1.style.borderRadius = "20px 20px 0 0";
    volume_1_ouvert = true;
  } else {
    lettres_allcontainer_volume_1.style.display = "none";
    fleche_volume_1.style.rotate = "0deg";
    btn_volume_1.style.borderRadius = "20px";
    volume_1_ouvert = false;
  }
});

btn_volume_2.addEventListener("click", (e) => {
  if (volume_2_ouvert == false) {
    lettres_allcontainer_volume_2.style.display = "block";
    fleche_volume_2.style.rotate = "180deg";
    btn_volume_2.style.borderRadius = "20px 20px 0 0";
    volume_2_ouvert = true;
  } else {
    lettres_allcontainer_volume_2.style.display = "none";
    fleche_volume_2.style.rotate = "0deg";
    btn_volume_2.style.borderRadius = "20px";
    volume_2_ouvert = false;
  }
});

lettres.forEach((lettre) => {
  lettre.addEventListener("click", (e) => {
    lettre.classList.toggle("lettre-select");
  });
});
