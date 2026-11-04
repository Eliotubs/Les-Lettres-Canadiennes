<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:tei="http://www.tei-c.org/ns/1.0"
    xmlns="http://www.tei-c.org/ns/1.0"
    xpath-default-namespace="urn:oasis:names:tc:opendocument:xmlns:office:1.0"
    xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"
    xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0"
    xmlns:style="urn:oasis:names:tc:opendocument:xmlns:style:1.0"
    xmlns:fo="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0"
    exclude-result-prefixes="xs office text style fo" version="2.0">

    <!-- Affichage du contenu par template -->

    <xsl:template match="/">
        <TEI xmlns="http://www.tei-c.org/ns/1.0">
            <teiHeader>
                <fileDesc>
                    <titleStmt><title></title></titleStmt>
                    <publicationStmt>
                        <p></p>
                    </publicationStmt>
                    <sourceDesc>
                        <p></p>
                    </sourceDesc>
                </fileDesc>
            </teiHeader>
            <text>
                <body>
                    <xsl:apply-templates select="//office:text"/>
                </body>
            </text>
        </TEI>
    </xsl:template>

    <!-- -->
    <!-- Titres dans des balises head -->

    <xsl:template match="text:h[@text:outline-level = '1']">
        <head type="1">
            <xsl:apply-templates/>
        </head>
    </xsl:template>

    <xsl:template match="text:h[@text:outline-level = '2']">
        <head type="2">
            <xsl:apply-templates/>
        </head>
    </xsl:template>

    <xsl:template match="text:h[@text:outline-level = '3']">
        <head type="3">
            <xsl:apply-templates/>
        </head>
    </xsl:template>

    <!-- Paramètre de transformation du corps de texte dans des balises p -->

    <!-- <xsl:template match="text:p[@text:style-name = 'Normal' or @text:style-name = 'Police_20_par_20_défaut' or @style:family='paragraph']">
        <p>
            <xsl:apply-templates/>
        </p>
        <lb/>
    </xsl:template> -->


<!--Paragraphe (pas de paragraphe vide)-->
    <xsl:template match="text:p">
        <xsl:if test="normalize-space(.) !='' or text:span or text:note">
        <p>
            <xsl:apply-templates/>
        </p>
        </xsl:if>
    </xsl:template>


    <!-- Titres d'ouvrage -->

    <xsl:template match="text:span[@text:style-name = 'Titre_20_ouvrage']" priority='2'>
        <hi rend="italic" type="Titre_20_ouvrage">
            <xsl:apply-templates/>
        </hi>
    </xsl:template>

    <!-- Boucle : pour les balises dates, persnames et placename -->

    <xsl:template match="text:span" priority="1">
        <xsl:variable name="styleName" select="@text:style-name"/>
        <xsl:variable name="properties"
            select="//office:automatic-styles/style:style[@style:name = $styleName]/style:text-properties"/>

        <xsl:variable name="bgColor" select="$properties/@fo:background-color"/>
        <xsl:variable name="caracter_it" select="$properties/@fo:font-style"/>
        <xsl:variable name="caracter_bold" select="$properties/@fo:font-weight"/>


        <xsl:choose>
            <!-- Vert -> date -->
            <!-- doublons de couleurs maj et min pour éviter les beugs -->
            <xsl:when test="$bgColor = '#00ff00' or $bgColor = '#00FF00'">
                <date>
                    <xsl:call-template name="appliquer-format-texte">
                        <xsl:with-param name="it" select="$caracter_it"/>
                        <xsl:with-param name="bold" select="$caracter_bold"/>
                    </xsl:call-template>
                </date>
            </xsl:when>

            <!-- Cyan -> placeName -->
            <xsl:when test="$bgColor = '#00ffff' or $bgColor = '#00FFFF'">
                <placeName>
                    <xsl:call-template name="appliquer-format-texte">
                        <xsl:with-param name="it" select="$caracter_it"/>
                        <xsl:with-param name="bold" select="$caracter_bold"/>
                    </xsl:call-template>
                </placeName>
            </xsl:when>

            <!-- Jaune -> persName -->
            <xsl:when test="$bgColor = '#ffff00' or $bgColor = '#FFFF00'">
                <persName>
                    <xsl:call-template name="appliquer-format-texte">
                        <xsl:with-param name="it" select="$caracter_it"/>
                        <xsl:with-param name="bold" select="$caracter_bold"/>
                    </xsl:call-template>
                </persName>
            </xsl:when>

            <!-- Pas de couleur -->
            <xsl:otherwise>
                <xsl:call-template name="appliquer-format-texte">
                    <xsl:with-param name="it" select="$caracter_it"/>
                    <xsl:with-param name="bold" select="$caracter_bold"/>
                </xsl:call-template>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

    <!-- cumulation du gras et de l'italique en même temps -->

    <xsl:template name="appliquer-format-texte">
        <xsl:param name="it"/>
        <xsl:param name="bold"/>

        <xsl:choose>
            <!-- Cas : Gras et Italique en même temps -->
            <xsl:when
                test="($it = 'italic' or $it = '#italic') and ($bold = 'bold' or $bold = '#bold')">
                <hi rend="bold">
                    <hi rend="italic">
                        <xsl:apply-templates/>
                    </hi>
                </hi>
            </xsl:when>
            <!-- Cas : Italique seul -->
            <xsl:when test="$it = 'italic' or $it = '#italic'">
                <hi rend="italic">
                    <xsl:apply-templates/>
                </hi>
            </xsl:when>
            <!-- Cas : Gras seul -->
            <xsl:when test="$bold = 'bold' or $bold = '#bold'">
                <hi rend="bold">
                    <xsl:apply-templates/>
                </hi>
            </xsl:when>
            <!-- Cas : Texte brut -->
            <xsl:otherwise>
                <xsl:apply-templates/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>


    <!-- Introduire les notes -->

    <xsl:template match="text:note">
        <!-- On compte le numéro de la note -->
        <xsl:variable name="note" select="count(preceding::text:note) + 1"/>
        <note class="contenu-note" n="{$note}">
            <xsl:apply-templates select="text:note-body"/>
        </note>
    </xsl:template>
    


</xsl:stylesheet>
