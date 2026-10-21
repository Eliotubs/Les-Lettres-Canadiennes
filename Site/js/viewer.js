var splitter = document.getElementById("splitter");
var left = document.querySelector(".main-body-ressources");
var right = document.querySelector(".main-body-text");
var container = document.querySelector(".main-body");
var moveX = 0;
var drag = false;

// Quand le clic est enfoncé : l'utilisateur veut modifier les colonnes
splitter.addEventListener("mousedown", function (e) {
  drag = true;
});

// Quand le curseur bouge
container.addEventListener("mousemove", function (e) {
  moveX = e.pageX; // Récupération de la position X du curseur sur la page
  if (drag) {
    // Si l'utilisateur a le clic enfoncé
    leftValue = (moveX / window.innerWidth) * 100 + "%";
    rightValue = (1 - e.pageX / window.innerWidth) * 100 + "%";
    container.style.gridTemplateColumns =
      "minmax(400px, " + leftValue + ") 5px minmax(400px, " + rightValue + ")";
  } // Ne pas oublier que le splitter est une div à part de 5px
});

// Quand le clic est relaché : l'utilisateur ne veut pas/plus modifier les colonnes
container.addEventListener("mouseup", function (e) {
  drag = false;
});

// Zoomer dans une image

// Récupération de l'image et de son container
const imgContainerZoom = document.querySelector(".ressources-body");
const imgZoom = document.querySelector(".ressources-body img");

// Chaque fois que l'utilisateur passe sa souris sur le container de l'image
imgContainerZoom.addEventListener("mousemove", (e) => {
  const imgContainerZoomInfos = imgContainerZoom.getBoundingClientRect(); // Récupération des informations relatives au container
  const x = e.clientX - imgContainerZoomInfos.left;
  const y = e.clientY - imgContainerZoomInfos.top;

  // Création des pourcentages pour ensuite l'injecter dans le style de l'image
  const pourcentageXcontainer = (x / imgContainerZoomInfos.width) * 100;
  const pourcentageYcontainer = (y / imgContainerZoomInfos.height) * 100;

  imgZoom.style.transformOrigin = `${pourcentageXcontainer}% ${pourcentageYcontainer}%`;
});
