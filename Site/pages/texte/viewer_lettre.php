<?php
// Création d'un arary pour stocker toutes les lettres présentes
$lettres = [
    'l12' => 'Lettre 12',
    'l32' => 'Lettre 32',
    'l70' => 'Lettre 70',
];
//Récupération dans l'url des paramètres
$lettre = $_GET['lettre'] ?? ''; //le numéro de la lettre choisie
$page = $_GET['page'] ?? ''; //la page de la lettre choisie
$selection_brut = $_GET['selection'] ?? ''; //La sélection de lettre
$selection = explode("-", $selection_brut); //La sélection nettoyée et mise en tableau

$position_selection = array_search($lettre, $selection);

$chapitre_sui = null;
$chapitre_pre = null;

if ($position_selection !== false && isset($selection[$position_selection + 1])) {
    $chapitre_sui = $selection[$position_selection + 1];
} else {
    $chapitre_sui = null;
}

if ($position_selection !== false && $position_selection > 0) {
    $chapitre_pre = $selection[$position_selection - 1];
} else {
    $chapitre_pre = null;
}

$html = ''; //va contenir ensuite tout le texte choisi
$image = ''; //image du manuscrit
$pages = []; //va séparer en pages un seul document XML

if (isset($lettres[$lettre])) {
    //Chemins vers les documents XML et la feuille de transformation XSL
    $fichierXML = __DIR__ . '/../../../XML/Lettres_XML/' . $lettre . '.xml';
    $fichierXSL = __DIR__ . '/../../../xslt/transformation_xml_vers_html.xsl';

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

                //On repère la page sur laquelle on est
                foreach ($pages as $i => $p) {
                    if ($p['n'] === $page) { //Ne pas confondre $pages et $page, cette dernière contient le paramètre page de l'url
                        $index = $i;
                        break;
                    }
                }

                $page = $pages[$index]['n']; //On récupère le numéro de la page que l'on souhaite
                $debut = $pages[$index]['node']; //On récupère l'élément complet du noeud <pb> que l'on souhaite
                $fin = $pages[$index + 1]['node'] ?? null; //On récupère l'élément complet du noeud <pb> qui suit celui que l'on souhaite

                $fragment = new DOMDocument('1.0', 'UTF-8');
                $racine = $fragment->createElement('div');
                $fragment->appendChild($racine);

                $courant = $debut->nextSibling; //On va chercher le noeud sibling du <pb> de départ, pour avoir le <p>

                // Tant que l'on n'est pas arrivé au <pb> suivant, on continue à parcourir les noeuds siblings
                ///// ATTENTION !! \\\\\ Ce n'est pas la bonne manière de faire, car les balises <pb> ne sont pas forcément siblings, elles peuvent être contenues dans des balises <p>
                while ($courant && $courant !== $fin) {
                    $suivant = $courant->nextSibling;

                    if ( //Vérifier qu'il s'agisse bien d'une balise et que ne s'agisse pas d'un <pb>
                        !($courant instanceof DOMElement)
                        || $courant->localName !== 'pb'
                    ) { //Injecter dans la page le texte de la balise anlaysée
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

                $image = $pages[$index]['facs']; //Lien relatif de l'image
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
    <link href="../../style/style-general.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.0/css/all.min.css" />

    <style>
        @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
    </style>
</head>

<body>
    <header>
        <nav class="header-container">
            <div id="logo-title">
                <a href="../../accueil.html">
                    <img src="../../images/logo.png" />
                </a>
            </div>
            <ul id="nav">
                <li>
                    <a href="../../accueil.html">Accueil</a>
                </li>
                <li class="active">
                    <button id="btn-texte-popover" class="btn-menu" popovertarget="nav-texte-popover">
                        Texte<i class="fa-solid fa-chevron-up"></i>
                    </button>
                    <div class="popover" id="nav-texte-popover" popover>
                        <a href="filtres-lettres.html">Lettres</a>
                        <a href="transcription_integrale.php">Transcription intégrale</a>
                    </div>
                </li>
                <li>
                    <button id="btn-references-popover" class="btn-menu" popovertarget="nav-references-popover">
                        Annexes<i class="fa-solid fa-chevron-up"></i>
                    </button>
                    <div class="popover" id="nav-references-popover" popover>
                        <a href="../annexes/ressources.html">Ressources</a>
                        <a href="../annexes/documentation_historique.html">Documentation historique</a>
                        <a href="../annexes/données.html">Données</a>
                        <a href="../annexes/index.html">Index</a>
                    </div>
                </li>
                <li>
                    <button id="btn-apropos-popover" class="btn-menu" popovertarget="nav-apropos-popover">
                        À propos<i class="fa-solid fa-chevron-up"></i>
                    </button>
                    <div class="popover" id="nav-apropos-popover" popover>
                        <a href="../a_propos/presentation_du_projet.html">Présentation du projet</a>
                        <a href="../a_propos/introduction_generale.html">Introduction générale</a>
                        <a href="../a_propos/bibliographie.html">Bibliographie</a>
                        <a href="../a_propos/choix_editoriaux.html">Choix éditoriaux</a>
                        <a href="../a_propos/contributeurs.html">Contributeurs</a>
                    </div>
                </li>
            </ul>
        </nav>
    </header>
    <main>
        <div class="main-container">
            <div class="main-header">
                <div class="mh-left">
                    <?php if ($chapitre_pre !== null): ?>
                        <a class="work-letter-button"
                            href="viewer_lettre.php?lettre=<?= urlencode($chapitre_pre) ?>&page=1&selection=<?= urlencode($selection_brut) ?>">←</a>
                    <?php endif; ?>
                    <a class="letter-button" href="">
                        < Lettre précédente</a>
                </div>
                <div class="mh-middle">
                    <form method="GET" action="viewer_lettre.php">
                        <select class="choix-ressources" name="lettre" onchange="this.form.submit()">
                            <option value="">-- Choisir une lettre --</option>

                            <!-- Création dynamique de la sélection des lettres à partir de l'array $lettres -->
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
                    <?php if ($chapitre_sui !== null): ?>
                        <a class="work-letter-button"
                            href="viewer_lettre.php?lettre=<?= urlencode($chapitre_sui) ?>&page=1&selection=<?= urlencode($selection_brut) ?>">→</a>
                    <?php endif; ?>
                </div>
            </div>
            <div class=" main-body">
                <div class="main-body-ressources">
                    <div class="ressources-header">
                        <select id="choix-ressources">
                            <option value="manuscrit">Manuscrit</option>
                            <option value="emprunts">Emprunts</option>
                            <option value="mentions">Mentions</option>
                            <option value="cartographie">Cartographie</option>
                        </select>
                    </div>
                    <!-- Injectation de l'image du manuscrit -->
                    <?php if ($page !== '' && $html !== ''): ?>
                        <div class="ressources-body">
                            <div class="image">
                                <img src="<?= htmlspecialchars($image) ?>"
                                    alt="Photographie du manuscrit, page <?= htmlspecialchars($page) ?>">
                            </div>
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
                        <!-- Injectation du texte de la page sélectionnée -->
                        <?php if ($page !== '' && $html !== ''): ?>
                            <?= $html ?>
                        <?php endif; ?>
                    </div>
                    <div class="text-footer">
                        <div class="btn-pages">
                            <!-- Injectation des flèches pour se déplacer dans les pages -->
                            <?php if ($page !== '' && $html !== ''): ?>
                                <?php if (isset($pages[$index - 1])): ?>
                                    <a id="btn-page-pre"
                                        href="?lettre=<?= urlencode($lettre) ?>&page=<?= urlencode($pages[$index - 1]['n']) ?>">
                                        <i class="fa-solid fa-chevron-up"></i>
                                    </a>
                                <?php endif; ?>
                                <?php if (isset($pages[$index + 1])): ?>
                                    <a id="btn-page-fol"
                                        href="?lettre=<?= urlencode($lettre) ?>&page=<?= urlencode($pages[$index + 1]['n']) ?>">
                                        <i class="fa-solid fa-chevron-up"></i>
                                    </a>
                                <?php endif; ?>
                            <?php endif; ?>
                        </div>

                        <!-- Affichage dynamique de la page actuelle -->
                        <span id="numero-page">Page
                            <?= htmlspecialchars($page) ?> sur <?= htmlspecialchars(count($pages)) ?>
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