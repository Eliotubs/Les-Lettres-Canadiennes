document.getElementById('btn-export-pdf').addEventListener('click', function () {
    // Cibler l'élément grâce à son id
    const element = document.getElementById('contenu-lettre');

    // Options de configuration (facultatif)
    const options = {
        margin:       [15, 15, 25, 15],
        filename:     'Les_lettres_canadiennes.pdf',
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak:    { mode: ['css', 'legacy'], avoid: ['img', 'h2', 'h3'] }
    };

    element.classList.add('style_export-pdf');

    // 2. On lance la génération du PDF
    html2pdf().from(element).set(options).save().then(function () {
        // 3. Une fois le téléchargement terminé, on retire la classe pour que le site redevienne normal
        element.classList.remove('style_export-pdf');
    });
});
