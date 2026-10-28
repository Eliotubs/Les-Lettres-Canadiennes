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

lettres.forEach((lettre) => {
  lettre.addEventListener("click", (e) => {
    lettre.classList.toggle("lettre-select");
  });
});

// ////////////////////////
// GESTIONS DES CASES SÉLECTIONNÉES OU NON
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
sujet_select_all.addEventListener("click", (e) => {
  if (sujet_select_all.checked === true) {
    sujet_checkbox.forEach((checkbox) => {
      checkbox.checked = true;
    });
  } else {
    sujet_checkbox.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }
});
emprunts_select_all.addEventListener("click", (e) => {
  if (emprunts_select_all.checked === true) {
    emprunts_checkbox.forEach((checkbox) => {
      checkbox.checked = true;
    });
  } else {
    emprunts_checkbox.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }
});
mentions_select_all.addEventListener("click", (e) => {
  if (mentions_select_all.checked === true) {
    mentions_checkbox.forEach((checkbox) => {
      checkbox.checked = true;
    });
  } else {
    mentions_checkbox.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }
});
correspondants_select_all.addEventListener("click", (e) => {
  if (correspondants_select_all.checked === true) {
    correspondants_checkbox.forEach((checkbox) => {
      checkbox.checked = true;
    });
  } else {
    correspondants_checkbox.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }
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
