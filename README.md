# Unfallkarte Hamburg

Dieses Repository beinhaltet den Quelltext für die "Unfallkarte Hamburg" – eine interaktive Visualisierung aller Verkehrsunfälle in Hamburg zwischen 2009 und 2023 aus der polizeilichen Unfalldatenbank EUSKa (Elektronische Unfalltypensteckkarte). Die Daten stammen aus [diversen IFG-Anfragen](https://github.com/pReya/unfallkarte-hamburg-daten). Dieses Projekt beinhaltet sowohl eine Frontend- als auch eine Backendanwendung (via Astro).

## Technische Umsetzung
Die Visualisierung von ca. 1 Millionen POIs auf einer interaktiven Karte stellte sich als relativ schwierig heraus. Um das performant zu ermöglichen, wird aus den POI-Daten ein Vektor-Layer mittels `tippecanoe` generiert. Die resultierenden Vektor-Tiles werden von einem Kartenserver (Martin – dieser Aspekt ist nicht Teil dieses Repos) angeboten. Um die Vektor-Tiles kleinzuhalten sind keinerlei Metdaten außer einer globalen ID pro POI in dem Vektorlayer enthalten. Die weiteren Metadaten werden durch einen kleinen API-Endpunkt `GET /api/poi/{globalPoiId}` bereitgestellt und aus einer SQLite-Datenbank ausgelesen. In einem React-Frontend werden dann die Vektorlayer gerendert und die POI-Daten abgefragt, wenn ein Nutzer über einen POI hovered oder ihn auswählt.

### Eingesetzte Technologien:
- Astro
- React
- Tailwind
- Maplibre GL JS
- Deck.gl