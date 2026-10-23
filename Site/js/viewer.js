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

// Afficher le texte sur plusieurs pages

const lettres = [
  {
    id: "lettre70",
    title: "Lettre 70",
    pages: [
      {
        image: "../../images/manuscrit/lettre70/lettre70-p1.JPG",
        text: `<h1>Lettre 70 [1707]</h1>
                        <h2>À Raoul, à Vienne, en Autriche</h2>
                        <h3 class="abstract">
                            Qu’il faut aimer la lecture ; les Espagnols prennent Alcantara ;
                            mort du roi de Portugal ; naissance du duc de Bretagne
                        </h3>
                        <p>
                            Tu as dû recevoir dans son temps, parmi les livres que je t’ai
                            envoyés,
                            <span class="ref-externe"><a aria="tooltip-1"
                                    href="https://books.google.ca/books?id=WZBjAAAAcAAJ&pg=PA462&dq=Trait%C3%A9+d%E2%80%99origine+contre+Celse&hl=fr&sa=X&ved=0ahUKEwij3u7jhozVAhWI34MKHXjbA4gQ6AEIKTAA#v=onepage&q&f=false">le
                                    traité d’Origène contre Celse</a></span>, ou autrement défense de la religion
                            chrétienne contre les
                            accusations des païens.
                            <span class="pb">[454]</span>
                        </p>"`,
      },
      {
        image: "../../images/manuscrit/lettre70/lettre70-p2.JPG",
        text: `<p>
                            Tu as dû recevoir dans son temps, parmi les livres que je t’ai
                            envoyés,
                            <span class="ref-externe"><a aria="tooltip-1"
                                    href="https://books.google.ca/books?id=WZBjAAAAcAAJ&pg=PA462&dq=Trait%C3%A9+d%E2%80%99origine+contre+Celse&hl=fr&sa=X&ved=0ahUKEwij3u7jhozVAhWI34MKHXjbA4gQ6AEIKTAA#v=onepage&q&f=false">le
                                    traité d’Origène contre Celse</a></span>, ou autrement défense de la religion
                            chrétienne contre les
                            accusations des païens.
                            <span class="pb">[454]</span>
                        </p>"`,
      },
      {
        image: "../../images/manuscrit/lettre70/lettre70-p3.JPG",
        text: `<p>
                            Tu as dû recevoir dans son temps, parmi les livres que je t’ai
                            envoyés,
                            <span class="ref-externe"><a aria="tooltip-1"
                                    href="https://books.google.ca/books?id=WZBjAAAAcAAJ&pg=PA462&dq=Trait%C3%A9+d%E2%80%99origine+contre+Celse&hl=fr&sa=X&ved=0ahUKEwij3u7jhozVAhWI34MKHXjbA4gQ6AEIKTAA#v=onepage&q&f=false">le
                                    traité d’Origène contre Celse</a></span>, ou autrement défense de la religion
                            chrétienne contre les
                            accusations des païens.
                            <span class="pb">[454]</span>
                        </p>"`,
      },
      {
        image: "../../images/manuscrit/lettre70/lettre70-p4.JPG",
        text: `<p>
                            Tu as dû recevoir dans son temps, parmi les livres que je t’ai
                            envoyés,
                            <span class="ref-externe"><a aria="tooltip-1"
                                    href="https://books.google.ca/books?id=WZBjAAAAcAAJ&pg=PA462&dq=Trait%C3%A9+d%E2%80%99origine+contre+Celse&hl=fr&sa=X&ved=0ahUKEwij3u7jhozVAhWI34MKHXjbA4gQ6AEIKTAA#v=onepage&q&f=false">le
                                    traité d’Origène contre Celse</a></span>, ou autrement défense de la religion
                            chrétienne contre les
                            accusations des païens.
                            <span class="pb">[454]</span>
                        </p>"`,
      },
      {
        image: "../../images/manuscrit/lettre70/lettre70-p5.JPG",
        text: `<p>
                            Tu as dû recevoir dans son temps, parmi les livres que je t’ai
                            envoyés,
                            <span class="ref-externe"><a aria="tooltip-1"
                                    href="https://books.google.ca/books?id=WZBjAAAAcAAJ&pg=PA462&dq=Trait%C3%A9+d%E2%80%99origine+contre+Celse&hl=fr&sa=X&ved=0ahUKEwij3u7jhozVAhWI34MKHXjbA4gQ6AEIKTAA#v=onepage&q&f=false">le
                                    traité d’Origène contre Celse</a></span>, ou autrement défense de la religion
                            chrétienne contre les
                            accusations des païens.
                            <span class="pb">[454]</span>
                        </p>"`,
      },
      {
        image: "../../images/manuscrit/lettre70/lettre70-p6.JPG",
        text: `<p>
                            Tu as dû recevoir dans son temps, parmi les livres que je t’ai
                            envoyés,
                            <span class="ref-externe"><a aria="tooltip-1"
                                    href="https://books.google.ca/books?id=WZBjAAAAcAAJ&pg=PA462&dq=Trait%C3%A9+d%E2%80%99origine+contre+Celse&hl=fr&sa=X&ved=0ahUKEwij3u7jhozVAhWI34MKHXjbA4gQ6AEIKTAA#v=onepage&q&f=false">le
                                    traité d’Origène contre Celse</a></span>, ou autrement défense de la religion
                            chrétienne contre les
                            accusations des païens.
                            <span class="pb">[454]</span>
                        </p>"`,
      },
    ],
  },
];

const lettre_active = document.getElementById("choix-lettre");
const btn_precedent = document.getElementById("btn-page-pre");
const btn_suivant = document.getElementById("btn-page-fol");
const numero_page_active = document.getElementById("numero-page-active");
const section_texte = document.getElementById("texte-normalise");
const section_image = document.getElementById("image-manuscrit");

let current_lettre = 0;
let current_numero_page = 0;

// Affiche le menu déroulant pour choisir quelle lettre on veut
lettres.forEach((letter, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.textContent = letter.title;
  lettre_active.appendChild(option);
});

// Afficher la page courante
function displayPage() {
  const letter = lettres[current_lettre];
  const page = letter.pages[current_numero_page]; // On commence à la page 0

  section_texte.textContent = page.text;
  section_image.src = page.image;
  section_image.alt = `${letter.title}, page ${current_numero_page + 1}`;

  numero_page_active.textContent = current_numero_page + 1;

  btn_precedent.disabled = current_numero_page === 0;
  btn_suivant.disabled = current_numero_page === letter.pages.length - 1;
}

// Changer de lettre
lettre_active.addEventListener("change", () => {
  current_lettre = Number(lettre_active.value);
  current_numero_page = 0;
  displayPage();
});

// Bouton page précédente
btn_precedent.addEventListener("click", () => {
  if (current_numero_page > 0) {
    current_numero_page--;
    displayPage();
  }
});

// Bouton page suivante
btn_suivant.addEventListener("click", () => {
  const letter = lettres[current_lettre];

  if (current_numero_page < letter.pages.length - 1) {
    current_numero_page++;
    displayPage();
  }
});

displayPage();
