# Unfallkarte Hamburg

Dieses Repository beinhaltet den Quelltext für die "Unfallkarte Hamburg" – eine interaktive Visualisierung aller Verkehrsunfälle in Hamburg zwischen 2009 und 2024 aus der polizeilichen Unfalldatenbank EUSKa (Elektronische Unfalltypensteckkarte). Die Daten stammen aus [diversen IFG-Anfragen](https://github.com/pReya/unfallkarte-hamburg-daten). Dieses Projekt beinhaltet sowohl eine Frontend- als auch eine Backendanwendung (via Astro).

## Technische Umsetzung
Die Visualisierung von ca. 1 Millionen POIs auf einer interaktiven Karte stellte sich als relativ schwierig heraus. Um das performant zu ermöglichen, wird aus den POI-Daten, die als SQLite Datenbank vorliegen, zunächst ein CSV exportiert, welches nur die Daten beinhaltet, die für die Darstellung eines Punktes auf der Karte wichtig sind (nämlich lat/long-Koordinate und die globale ID des Unfalls):

```bash
sqlite-utils processed.db 'select GlobalId as id, "Koord.x" as lon, "Koord.y" as lat from "accidents"' --csv > output.csv
```
Anschließend wird aus diesem CSV ein Vektor-Layer mittels `tippecanoe` generiert:

```bash
tippecanoe -z 12 -o out.pmtiles --no-tile-size-limit --force output.csv

```

Die resultierenden Vektor-Tiles werden von einem Kartenserver (Martin – dieser Aspekt ist nicht Teil dieses Repos) angeboten. Die weiteren Metadaten werden durch einen kleinen API-Endpunkt `GET /api/poi/{globalPoiId}` bereitgestellt und aus einer SQLite-Datenbank ausgelesen. In einem React-Frontend werden dann die Vektorlayer gerendert und die POI-Daten abgefragt, wenn ein Nutzer über einen POI hovered oder ihn auswählt.

### Eingesetzte Technologien:
- Astro
- React
- Tailwind
- Maplibre GL JS
- Deck.gl