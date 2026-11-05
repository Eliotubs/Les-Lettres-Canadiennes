// ////////////////////////
// GESTION DE L'OUVERTURE / FERMETURE DES VOLUMES
// ////////////////////////

const lettres_allcontainer_volume_1 = document.querySelector(
  "#lettre-container-volume-1",
);
const lettres_allcontainer_volume_2 = document.querySelector(
  "#lettre-container-volume-2",
);
const lettres_container = document.querySelector(".display-lettres");

const btn_volume_1 = document.querySelector("#btn-volume-1");
const btn_volume_2 = document.querySelector("#btn-volume-2");
const fleche_volume_1 = document.querySelector("#btn-volume-1 i");
const fleche_volume_2 = document.querySelector("#btn-volume-2 i");

let volume_1_ouvert = true;
let volume_2_ouvert = true;

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

// ////////////////////////
// GESTIONS DES CASES SÉLECTIONNÉES OU NON (filtres)
// ////////////////////////

// À optimiser pour ne pas avoir à réécrire 4 fois le même code

const sujet_select_all = document.getElementById("filtre-sujet-selectall");
const emprunts_select_all = document.getElementById(
  "filtre-emprunts-selectall",
);
const mentions_select_all = document.getElementById(
  "filtre-mentions-selectall",
);
const correspondants_select_all = document.getElementById(
  "filtre-correspondants-selectall",
);

const sujet_checkbox = document.querySelectorAll(
  "#filtres-sujet .filtres-intern-container .filtres-label-container .label-filtre .checkbox-filtre",
);
const emprunts_checkbox = document.querySelectorAll(
  "#filtres-emprunts .filtres-intern-container .filtres-label-container .label-filtre .checkbox-filtre",
);
const mentions_checkbox = document.querySelectorAll(
  "#filtres-mentions .filtres-intern-container .filtres-label-container .label-filtre .checkbox-filtre",
);
const correspondants_checkbox = document.querySelectorAll(
  "#filtres-correspondants .filtres-intern-container .filtres-label-container .label-filtre .checkbox-filtre",
);
nb_checkbox_selected = 0;

//Tous les filtres sont sélectionnés par défaut
sujet_select_all.checked = true;
emprunts_select_all.checked = true;
mentions_select_all.checked = true;
correspondants_select_all.checked = true;

sujet_checkbox.forEach((checkbox) => {
  checkbox.checked = true;
});
emprunts_checkbox.forEach((checkbox) => {
  checkbox.checked = true;
});
mentions_checkbox.forEach((checkbox) => {
  checkbox.checked = true;
});
correspondants_checkbox.forEach((checkbox) => {
  checkbox.checked = true;
});

//Lorsqu'on clique sur "Tout sélectionner", toutes les cases deviennent sélectionnées
//Mais si la case était déjà sélectionnée, alors toutes les cases deviennent non-sélectionées
function update_select_all_filtres(select_all, checkboxes) {
  if (select_all.checked === true) {
    checkboxes.forEach((checkbox) => {
      checkbox.checked = true;
    });
  } else {
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }
}

sujet_select_all.addEventListener("click", (e) => {
  update_select_all_filtres(sujet_select_all, sujet_checkbox);
});

emprunts_select_all.addEventListener("click", (e) => {
  update_select_all_filtres(emprunts_select_all, emprunts_checkbox);
});
mentions_select_all.addEventListener("click", (e) => {
  update_select_all_filtres(mentions_select_all, mentions_checkbox);
});
correspondants_select_all.addEventListener("click", (e) => {
  update_select_all_filtres(correspondants_select_all, correspondants_checkbox);
});

//Si une case est manuellement déselectionnée, alors "Tout sélectionner" devient non-sélectionné
//Si toutes les cases sont sélectionnées, alors "Tout sélectionner" le devient aussi
sujet_checkbox.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    if (checkbox.checked === false) {
      sujet_select_all.checked = false;
    }
    for (var i = 0; i < sujet_checkbox.length; i++) {
      if (sujet_checkbox[i].checked === true) {
        nb_checkbox_selected++;
      }
    }
    if (nb_checkbox_selected == sujet_checkbox.length) {
      sujet_select_all.checked = true;
    }
    nb_checkbox_selected = 0;
  });
});
emprunts_checkbox.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    if (checkbox.checked === false) {
      emprunts_select_all.checked = false;
    }
    for (var i = 0; i < emprunts_checkbox.length; i++) {
      if (emprunts_checkbox[i].checked === true) {
        nb_checkbox_selected++;
      }
    }
    if (nb_checkbox_selected == emprunts_checkbox.length) {
      emprunts_select_all.checked = true;
    }
    nb_checkbox_selected = 0;
  });
});
mentions_checkbox.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    if (checkbox.checked === false) {
      mentions_select_all.checked = false;
    }
    for (var i = 0; i < mentions_checkbox.length; i++) {
      if (mentions_checkbox[i].checked === true) {
        nb_checkbox_selected++;
      }
    }
    if (nb_checkbox_selected == mentions_checkbox.length) {
      mentions_select_all.checked = true;
    }
    nb_checkbox_selected = 0;
  });
});
correspondants_checkbox.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    if (checkbox.checked === false) {
      correspondants_select_all.checked = false;
    }
    for (var i = 0; i < correspondants_checkbox.length; i++) {
      if (correspondants_checkbox[i].checked === true) {
        nb_checkbox_selected++;
      }
    }
    if (nb_checkbox_selected == correspondants_checkbox.length) {
      correspondants_select_all.checked = true;
    }
    nb_checkbox_selected = 0;
  });
});

// ////////////////////////
// GESTIONS DES CASES SÉLECTIONNÉES OU NON (volumes)
// ////////////////////////

const volume1_select_all = document.getElementById("volume-1-selectall");
const volume2_select_all = document.getElementById("volume-2-selectall");

const volume1_lettres = document.querySelectorAll(
  "#lettre-container-volume-1 .display-lettres span",
);
const volume2_lettres = document.querySelectorAll(
  "#lettre-container-volume-2 .display-lettres span",
);

const compteur_lettres_selected_vol1 = document.querySelector(
  "#btn-volume-1 .nombre-resultats span",
);
const compteur_lettres_selected_vol2 = document.querySelector(
  "#btn-volume-2 .nombre-resultats span",
);

nb_lettres_selected_vol1 = volume1_lettres.length;
nb_lettres_selected_vol2 = volume2_lettres.length;

volume1_select_all.checked = true;
volume2_select_all.checked = true;

compteur_lettres_selected_vol1.innerHTML =
  "Nombre de résultats : " + volume1_lettres.length;
compteur_lettres_selected_vol2.innerHTML =
  "Nombre de résultats : " + volume2_lettres.length;

volume1_lettres.forEach((lettre) => {
  lettre.classList.add("lettre-select");
});
volume2_lettres.forEach((lettre) => {
  lettre.classList.add("lettre-select");
});

function update_select_all_volume(volume_select_all, volume) {
  if (volume_select_all.checked === true) {
    volume.forEach((lettre) => {
      lettre.classList.add("lettre-select");
    });
  } else {
    volume.forEach((lettre) => {
      lettre.classList.remove("lettre-select");
    });
  }
}

const link_lecture_selection = document.getElementById("btn-lecture-selection");

function update_link_lecture_selection() {
  lettres_selected = [];
  volume1_lettres.forEach((lettre) => {
    if (lettre.classList.contains("lettre-select")) {
      lettres_selected.push(lettre.innerHTML.replace("Lettre ", ""));
    }
  });
  if (lettres_selected.length == 0) {
    lettres_selected.push("1");
  }
  str_lettres_selected = "";
  for (var i = 0; i < lettres_selected.length; i++) {
    str_lettres_selected += "l" + lettres_selected[i] + "-";
  }
  link_lecture_selection.href =
    "viewer_lettre.php?lettre=l" +
    lettres_selected[0] +
    "&page=1&selection=" +
    str_lettres_selected.slice(0, -1);
}
update_link_lecture_selection();

volume1_select_all.addEventListener("click", (e) => {
  update_select_all_volume(volume1_select_all, volume1_lettres);
  update_link_lecture_selection();
});

volume1_lettres.forEach((lettre) => {
  lettre.addEventListener("click", (e) => {
    if (lettre.classList.contains("lettre-select")) {
      volume1_select_all.checked = false;
    }

    lettre.classList.toggle("lettre-select");
    for (var i = 0; i < volume1_lettres.length; i++) {
      if (volume1_lettres[i].classList.contains("lettre-select")) {
        nb_lettres_selected_vol1++;
      }
    }
    if (nb_lettres_selected_vol1 == volume1_lettres.length) {
      volume1_select_all.checked = true;
    }
    nb_lettres_selected_vol1 = 0;
    update_link_lecture_selection();
  });
});

volume2_select_all.addEventListener("click", (e) => {
  update_select_all_volume(volume2_select_all, volume2_lettres);
});

volume2_lettres.forEach((lettre) => {
  lettre.addEventListener("click", (e) => {
    if (lettre.classList.contains("lettre-select")) {
      volume2_select_all.checked = false;
    }

    lettre.classList.toggle("lettre-select");
    for (var i = 0; i < volume2_lettres.length; i++) {
      if (volume2_lettres[i].classList.contains("lettre-select")) {
        nb_lettres_selected_vol2++;
      }
    }
    if (nb_lettres_selected_vol2 == volume2_lettres.length) {
      volume2_select_all.checked = true;
    }
    nb_lettres_selected_vol2 = 0;
  });
});

// ////////////////////////
// AFFICHAGE DE LA DESCRIPTION AU SURVOL
// ////////////////////////

const all_lettres = document.querySelectorAll(".volume-container .lettre");
const container_description_lettre = document.querySelector(
  ".description_lettre",
);

lettres_description = [
  {
    id: "12",
    nom: "Lettre 12",
    destinataire: "À sa mère, à Angers.",
    contenu:
      "Il la console sur la mort de son père et lui envoie une lettre de son frère.",
  },
  {
    id: "32",
    nom: "Lettre 32",
    destinataire: "À un de ses amis qui veut entrer dans les ordres sacrés.",
    contenu:
      "Histoire d’un récollet qui a abjuré sa religion, et de la manière qu’il le fit.",
  },
  {
    id: "70",
    nom: "Lettre 70",
    destinataire: "À Raoul, à Vienne, en Autriche.",
    contenu:
      "Qu’il faut aimer la lecture, les Espagnols prennent Alcantara, mort du roi de Portugal, naissance du duc de Bretagne.",
  },
];

all_lettres.forEach((lettre) => {
  lettre.addEventListener("mouseover", (e) => {
    container_description_lettre.replaceChildren();
    for (var i = 0; i < lettres_description.length; i++) {
      if (lettres_description[i]["nom"] == e.target.textContent) {
        let p_nom_lettre = document.createElement("h3");
        let p_destinataire = document.createElement("p");
        let p_contenu = document.createElement("p");
        p_nom_lettre.append(lettres_description[i]["nom"]);
        p_destinataire.append(lettres_description[i]["destinataire"]);
        p_contenu.append(lettres_description[i]["contenu"]);
        container_description_lettre.append(
          p_nom_lettre,
          p_destinataire,
          p_contenu,
        );
      }
    }
  });
});
