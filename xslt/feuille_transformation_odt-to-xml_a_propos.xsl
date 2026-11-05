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
        <TEI>
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
                    <xsl:for-each-group select="//office:text/*[self::text:h or self::text:p]" group-starting-with="text:h">
                        <xsl:if test="current-group()[self::text:h or(self::text:p and normalize-space(.) !='')]">
                            <div>
                                <xsl:apply-templates select="current-group()"/>
                            </div>
                        </xsl:if>
                    </xsl:for-each-group>
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
        <hi rend="italic">
            <xsl:apply-templates/>
        </hi>
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
 <xsl:variable name="type_note">
     <!-- On détermine le type de note -->
      <xsl:choose>
          <xsl:when test="ancestor::text:span[@text:style-name = 'Note_20_éditoriale']">
              <xsl:text>note_editoriale</xsl:text>
          </xsl:when>
          <xsl:when test="ancestor::text:span[@text:style-name = 'Note_20_savante']">
              <xsl:text>note_savante</xsl:text>
          </xsl:when>
          <xsl:otherwise>
              <xsl:text>contenu_note</xsl:text>
          </xsl:otherwise>
         
 </xsl:choose>
 </xsl:variable>
      <note type="{$type_note}" n="{$note}">
          <xsl:apply-templates select="text:note-body"/>
      </note>
  </xsl:template>
        
        <note type="contenu-note" n="{$note}">
            <xsl:apply-templates select="text:note-body"/> 
        </note>
        
     
            
          


</xsl:stylesheet>
