<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:tei="http://www.tei-c.org/ns/1.0"
    exclude-result-prefixes="xs tei" version="1.0">
    
    <xsl:template match="tei:TEI">
        <html>
            <head><meta charset="UTF-8"/><title>Lettres canadiennes</title></head>
            <body><xsl:apply-templates select="//tei:body"/>
            <hr/>
                <div class="note-bas-page">
                    <xsl:apply-templates select="//tei:note" mode="bas-de-page"/>
                </div>
            </body>
        </html>
    </xsl:template>
    
    <!-- TITRES DES PARTIES -->
    <xsl:template match="tei:head[@type='1']">
        <h1><xsl:apply-templates/></h1>
    </xsl:template>
    
    <xsl:template match="tei:head[@type='2']">
        <h2><xsl:apply-templates/></h2>
    </xsl:template>
    
    <xsl:template match="tei:head[@type='3']">
        <h3><xsl:apply-templates/></h3>
    </xsl:template>
    
    <!-- PARAGRAPHES ET STYLE ITALIQUE -->
    <xsl:template match="tei:p">
        <p><xsl:apply-templates/></p>
    </xsl:template>
    
    <xsl:template match="tei:hi[@rend='italic' or @rend='italique']">
        <em><xsl:apply-templates/></em>
    </xsl:template>
    
    <!-- NOTES dans le texte-->
    <xsl:template match="tei:note">
        <xsl:variable name="num">
            <xsl:number level="any" count="tei:note"/>
        </xsl:variable>
        <sup class="{@type} note">
            <a href="#note-{$num}" id="appel-{$num}">
                <xsl:value-of select="$num"/>
        </a></sup>
    </xsl:template>
     <!-- note en bas de la page -->
    <xsl:template match="tei:note" mode="bas-de-page">
        <xsl:variable name="num">
            <xsl:number level="any" count="tei:note"/>
        </xsl:variable>
        <div class="{@type}" id="note-{$num}">
            <a href="#appel-{$num}">
                <sup><xsl:value-of select="$num"/></sup></a>
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    <xsl:template match="tei:div">
        <div><xsl:apply-templates/></div>
    </xsl:template>
    
    
</xsl:stylesheet>