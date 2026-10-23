<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:tei="http://www.tei-c.org/ns/1.0" version="1.0">
    <xsl:strip-space elements="*" />
    <xsl:output method="html" encoding="UTF-8" />

    <xsl:template match="/">
                <xsl:apply-templates/>
    </xsl:template>

    <xsl:template match="tei:p">
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>

</xsl:stylesheet>