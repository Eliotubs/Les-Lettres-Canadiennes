<?php
// Création d'un arary pour stocker toutes les lettres présentes
$lettres = [
    'Lettre-12_l_espion_turc' => 'Lettre 12',
    'Lettre-32_recollet' => 'Lettre 32',
    'Lettre-70' => 'Lettre 70',
];
//Récupération dans l'url des paramètres
$lettre = $_GET['lettre'] ?? ''; //le numéro de la lettre choisie
$page = $_GET['page'] ?? ''; //la page de la lettre choisie

$html = ''; //va contenir ensuite tout le texte choisi
$image = ''; //image du manuscrit
$pages = []; //va séparer en pages un seul document XML

if (isset($lettres[$lettre])) {
    //Chemins vers les documents XML et la feuille de transformation XSL
    $fichierXML = __DIR__ . '/../../../XML/Lettres_XML/' . $lettre . '.xml';
    $fichierXSL = __DIR__ . '/../../../xslt/tei-html.xsl';

    //Si les deux fichiers existent
    if (is_file($fichierXML) && is_file($fichierXSL)) {
        $xml = new DOMDocument();

        //On va venir récupérer les balises <pb> dans les documents XML-TEI
        //pour séparer ensuite les pages
        if ($xml->load($fichierXML)) {
            $xpath = new DOMXPath($xml);
            $xpath->registerNamespace(
                'tei',
                'http://www.tei-c.org/ns/1.0'
            );

            $balises = $xpath->query('//tei:pb');

            //Pour chaque balise <pb> trouvée, on vient remplir l'array $pages
            //en renseignant les valeurs des attributs n (numéro de page) et facs (lien vers l'image)
            foreach ($balises as $pb) {
                $pages[] = [
                    'n' => $pb->getAttribute('n'),
                    'facs' => $pb->getAttribute('facs'),
                    'node' => $pb
                ];
            }

            //S'il n'y a au moins une balise <pb> dans le document
            if (count($pages) > 0) {
                $index = 0;

                //
                foreach ($pages as $i => $p) {
                    if ($p['n'] === $page) {
                        $index = $i;
                        break;
                    }
                }

                $page = $pages[$index]['n'];
                $debut = $pages[$index]['node'];
                $fin = $pages[$index + 1]['node'] ?? null;

                $fragment = new DOMDocument('1.0', 'UTF-8');
                $racine = $fragment->createElement('div');
                $fragment->appendChild($racine);

                $courant = $debut->nextSibling;

                while ($courant && $courant !== $fin) {
                    $suivant = $courant->nextSibling;

                    if (
                        !($courant instanceof DOMElement)
                        || $courant->localName !== 'pb'
                    ) {
                        $racine->appendChild(
                            $fragment->importNode($courant, true)
                        );
                    }

                    $courant = $suivant;
                }

                $xsl = new DOMDocument();

                if ($xsl->load($fichierXSL)) {
                    $processeur = new XSLTProcessor();
                    $processeur->importStylesheet($xsl);

                    $html = $processeur->transformToXML($fragment);

                    if ($html === false) {
                        $html = '';
                    }
                }

                $image = $pages[$index]['facs'];
            }
        }
    }
}
?>

<!doctype html>
<html lang="fr">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Interface de lecture - Lettres canadiennes</title>
    <link href="../../style/style-texte.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.0/css/all.min.css" />

    <style>
        @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
    </style>
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
                    <button id="btn-texte-popover" class="btn-menu" popovertarget="nav-texte-popover">
                        Texte<i class="fa-solid fa-chevron-up"></i>
                    </button>
                    <div class="popover" id="nav-texte-popover" popover>
                        <a href="#">Lettres</a>
                        <a href="#">Transcription intégrale</a>
                    </div>
                </li>
                <li>
                    <button id="btn-references-popover" class="btn-menu" popovertarget="nav-references-popover">
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
                    <button id="btn-apropos-popover" class="btn-menu" popovertarget="nav-apropos-popover">
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
        <div class="main-container">
            <div class="main-header">
                <div class="mh-left">
                    <a class="work-letter-button" href="">
                        ←</a>
                    <a class="letter-button" href="">
                        < Lettre précédente</a>
                </div>
                <div class="mh-middle">
                    <form method="GET" action="viewer_lettre.php">
                        <select class="choix-ressources" name="lettre" onchange="this.form.submit()">
                            <option value="">-- Choisir une lettre --</option>

                            <?php foreach ($lettres as $valeur => $libelle): ?>
                                <option value="<?= htmlspecialchars($valeur) ?>" <?= $lettre === $valeur ? 'selected' : '' ?>>
                                    <?= htmlspecialchars($libelle) ?>
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </form>
                </div>
                <div class="mh-right">
                    <a class="letter-button" href="">Lettre suivante ></a>
                    <a class="work-letter-button" href="">→</a>
                </div>
            </div>
            <div class="main-body">
                <div class="main-body-ressources">
                    <div class="ressources-header">
                        <select id="choix-ressources">
                            <option value="manuscrit">Manuscrit</option>
                            <option value="emprunts">Emprunts</option>
                            <option value="mentions">Mentions</option>
                            <option value="cartographie">Cartographie</option>
                        </select>
                    </div>
                    <?php if ($page !== '' && $html !== ''): ?>
                        <div class="image">
                            <img src="<?= htmlspecialchars($image) ?>"
                                alt="Photographie du manuscrit, page <?= htmlspecialchars($page) ?>">
                        </div>
                    <?php endif; ?>
                </div>
                <div id="splitter"></div>
                <div class="main-body-text">
                    <div class="text-header">
                        <input type="checkbox" id="checkbox-note-visibility" name="checkbox-note-visibility"
                            value="Affiche l'appareil critique" />
                        <label for="checkbox-note-visibility">Afficher l'appareil critique</label>
                    </div>
                    <div class="text-body">
                        <?php if ($page !== '' && $html !== ''): ?>
                            <?= $html ?>
                        <?php endif; ?>
                    </div>
                    <div class="text-footer">
                        <?php if ($page !== '' && $html !== ''): ?>
                            <?php if (isset($pages[$index - 1])): ?>
                                <a class="btn-page-pre"
                                    href="?lettre=<?= urlencode($lettre) ?>&page=<?= urlencode($pages[$index - 1]['n']) ?>">
                                    ← Page précédente
                                </a>
                            <?php endif; ?>
                            <?php if (isset($pages[$index + 1])): ?>
                                <a class="btn-page-fol"
                                    href="?lettre=<?= urlencode($lettre) ?>&page=<?= urlencode($pages[$index + 1]['n']) ?>">
                                    Page suivante →
                                </a>
                            <?php endif; ?>
                        <?php endif; ?>

                        <span>Page
                            <?= htmlspecialchars($page) ?>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <footer>Footer</footer>
    <script src="../../js/viewer.js"></script>
</body>

</html>