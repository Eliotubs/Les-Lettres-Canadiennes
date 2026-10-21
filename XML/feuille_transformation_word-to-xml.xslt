<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:tei="http://www.tei-c.org/ns/1.0"
    exclude-result-prefixes="xs" version="2.0"
    xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
    <xsl:strip-space elements="*"/>
    
    <xsl:template match="/">
        <TEI>
            <teiHeader>
                <fileDesc> 
                    <titleStmt> 
                        <title> 
                            <!-- Titre de la ressource --> 
                        </title> 
                    </titleStmt> 
                    <publicationStmt> 
                        <p> 
                            <!-- Informations sur la distribution de la ressource --> 
                        </p> 
                    </publicationStmt> 
                    <sourceDesc> 
                        <p> 
                            <!-- Informations sur la source de la ressource --> 
                        </p> 
                    </sourceDesc> 
                </fileDesc> 
            </teiHeader>
            <front>
                <div>
                    <xsl:apply-templates select="w:body/w:pPr[@Titreh2]/w:t"></xsl:apply-templates>
                </div>
            </front>
            <body>
                <text>
                    <div>
                        <head>
                        </head>
                    </div>
                    <div>
                        
                    </div>
                </text>
            </body>
        </TEI>
    </xsl:template>    
</xsl:stylesheet>
