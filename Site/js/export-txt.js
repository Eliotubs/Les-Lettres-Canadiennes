document.getElementById('btn-export-txt').addEventListener('click', function () {
    // 1. On récupère le texte brut de votre article grâce à innerText
    const element = document.getElementById('contenu-lettre');
    const texteBrut = element.innerText;

    // 2. On crée un objet "Blob" qui contient le texte
    const blob = new Blob([texteBrut], { type: 'text/plain;charset=utf-8' });

    // 3. On crée un lien temporaire pour télécharger le fichier
    const lien = document.createElement('a');
    lien.href = URL.createObjectURL(blob);
    lien.download = 'mon-article.txt'; // Nom du fichier texte

    // 4. On simule le clic pour lancer le téléchargement, puis on nettoie
    document.body.appendChild(lien);
    lien.click();
    document.body.removeChild(lien);
    URL.revokeObjectURL(lien.href);
});