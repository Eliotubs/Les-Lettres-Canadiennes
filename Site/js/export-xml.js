document.getElementById('btn-export-xml').addEventListener('click', function () {
    
   const liens = document.querySelectorAll('$lettres=".xml"]'); // Ajustez le sélecteur si besoin

    if (liens.length === 0) {
        alert("Aucun lien XML trouvé sur la page.");
        return;
    }

    // 2. On prend le premier lien et on force son téléchargement
    const urlXml = liens[0].href;
    
    // Création d'un lien invisible pour forcer le téléchargement
    const a = document.createElement('a');
    a.href = urlXml;
    a.download = ''; // Le navigateur télécharge le fichier cible
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});
  