<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link href="../../style/style-general.css" rel="stylesheet" />
    <link href="../../style/style_export-pdf.css" rel="stylesheet" />

    <style>
      @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
      @import url("https://fonts.googleapis.com/css2?family=Tangerine:wght@400;700&display=swap");
      @import url("https://fonts.googleapis.com/css2?family=Albert+Sans:ital,wght@0,100..900;1,100..900&display=swap");
    </style>

    <title>Editions critique</title>
  </head>
  <body>
    <header>
      <nav class="header-container">
        <p id="logo-title">Les lettres canadiennes</p>
        <ul id="nav">
          <li>
            <a href="template.html">Accueil</a>
          </li>
          <li class="active">
            <button
              id="btn-texte-popover"
              class="btn-menu"
              popovertarget="nav-texte-popover"
            >
              Texte<i class="fa-solid fa-chevron-up"></i>
            </button>
            <div class="popover" id="nav-texte-popover" popover>
              <a href="#">Lettres</a>
              <a href="#">Transcription intégrale</a>
            </div>
          </li>
          <li>
            <button
              id="btn-references-popover"
              class="btn-menu"
              popovertarget="nav-references-popover"
            >
              Références<i class="fa-solid fa-chevron-up"></i>
            </button>
            <div class="popover" id="nav-references-popover" popover>
              <a href="#">Ressources</a>
              <a href="#">Documentation historique</a>
              <a href="#">Données</a>
              <a href="#">Index</a>
            </div>
          </li>
          <li>
            <button
              id="btn-apropos-popover"
              class="btn-menu"
              popovertarget="nav-apropos-popover"
            >
              À propos<i class="fa-solid fa-chevron-up"></i>
            </button>
            <div class="popover" id="nav-apropos-popover" popover>
              <a href="#">Présentation du projet</a>
              <a href="#">Introduction générale</a>
              <a href="#">Choix éditoriaux</a>
              <a href="#">Contributeurs</a>
            </div>
          </li>
        </ul>
      </nav>
    </header>

    <main>
      <div class="sommaire-container">
        <div class="sommaire">
          <div class="accordeon_titre">Sommaire</div>
          <div class="accordeon_content">
            <p class="volume">Volume 1</p>
            <p class="point"><a href="#Lettre_12">Lettre 12</a></p>
            <p class="volume">Volume 2</p>
            <p class="point"><a href="#Lettre_32">Lettre 32</a></p>
          </div>
          <div class="fleche-sommaire">...</div>
        </div>
      </div>

      <div class="contenaire_transcription_integral">
        <div class="machin"> <!-- trouver un autre nom !!!! -->
          <h1 class="title_page">Transcription intégrale</h1>
          <div class="export">
            <p>Exporter en...</p>
            <button id="btn-export-xml">XML-TEI</button>
            <button id="btn-export-pdf">PDF</button>
            <button id="btn-export-txt">TXT</button>
          </div>
          <hr class="sidebar" />

          <div class="transcription_integral" id="contenu-lettre">
            <!-- identifiant unique pour l'export / il est parent de la seclection, il prend donc toutes les lettres -->

            <div id="#Lettre_12">
              <div class="text-body">
                <div id="texte-normalise"></div>
              </div>
            </div>

            <div id="#Lettre_32">
             <div class="text-body">
              <div id="texte-normalise"></div>
            </div>
          </div>      
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer>
      <div class="footer">
        <p>Footer</p>
      </div>
    </footer>
    <script src="../../js/sommaire.js"></script>
    <script src="../../js/export-pdf.js"></script>
    <script src="../../js/export-txt.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
  </body>
</html>
