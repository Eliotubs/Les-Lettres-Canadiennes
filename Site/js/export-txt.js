document.getElementById('btn-export-txt').addEventListener('click', function () {
    // récupère le texte brut de votre article grâce à innerText
    const element = document.getElementById('contenu-lettre');
    const texteBrut = element.innerText;
    const blob = new Blob([texteBrut], { type: 'text/plain;charset=utf-8' });

    // lien temporaire pour télécharger le fichier
    const lien = document.createElement('a');
    lien.href = URL.createObjectURL(blob);
    lien.download = 'Les_Lettres_Canadiennes.txt'; // Nom du fichier texte

    document.body.appendChild(lien);
    lien.click();
    document.body.removeChild(lien);
    URL.revokeObjectURL(lien.href);
});