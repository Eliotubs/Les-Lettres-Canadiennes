<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:tei="http://www.tei-c.org/ns/1.0"
    exclude-result-prefixes="xs" version="1.0">
    
    <xsl:template match="tei:TEI">
        <html>
            <head><meta charset="UTF-8"/><title><xsl:apply-templates select="//tei:head[@type='1']"></xsl:apply-templates></title></head>
            <body><xsl:apply-templates select="//tei:body"/></body>
        </html>
        
        
    </xsl:template>
    
    <xsl:template match="tei:head[@type='1']">
        <h1><xsl:apply-templates/></h1>
    </xsl:template>
    
    <xsl:template match="tei:head[@type='2']">
        <h2><xsl:apply-templates/></h2>
    </xsl:template>
    
    <xsl:template match="tei:head[@type='3']">
        <h3><xsl:apply-templates/></h3>
    </xsl:template>
    
    <xsl:template match="tei:p">
        <p><xsl:apply-templates/></p>
    </xsl:template>
    
    <xsl:template match="tei:hi[@rend='italic' or @rend='italique']">
        <em><xsl:apply-templates/></em>
    </xsl:template>
    
    
    
</xsl:stylesheet>