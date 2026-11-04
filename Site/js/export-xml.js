
document.addEventListener('DOMContentLoaded', function () {
    const boutonExport = document.getElementById('btn-export-xml');

    if (!boutonExport) return;

    boutonExport.addEventListener('click', function () {
        // La variable "liensXml" vient de la page HTML
        if (typeof liensXml === 'undefined' || liensXml.length === 0) {
            alert("Aucun fichier à télécharger.");
            return;
        }

        liensXml.forEach((cheminWeb, index) => {
            setTimeout(() => {
                const a = document.createElement('a');
                a.href = cheminWeb;
                a.download = cheminWeb.split('/').pop(); 
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }, index * 300);
        });
    });
});
  
