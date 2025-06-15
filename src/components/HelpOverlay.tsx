import type { ComponentPropsWithRef } from "react";

interface HelpOverlayProps extends ComponentPropsWithRef<"div"> {
}

export function HelpOverlay({ref }: HelpOverlayProps) {
  return (
    <div className="absolute inset-0 w-full h-full bg-black/50 flex items-center justify-center z-30">
      <div
        ref={ref}
        className="w-2/3 max-w-192 h-2/3 max-h-96 bg-white rounded-lg p-6 z-40 drop-shadow-2xl prose prose-sm overflow-y-scroll"
      >
        <h1>Unfallkarte Hamburg</h1>
        <p>
          Diese Karte ist eine Visualisierung aller Verkehrsunfälle in Hamburg
          zwischen 2009 und 2023. Die Daten stammen aus der polizeilichen
          Unfalldatenbank EUSKa (Elektronische Unfalltypensteckkarte). Sie
          wurden durch{" "}
          <a
            href="https://github.com/pReya/unfallstatistik-hamburg-daten"
            target="_blank"
          >
            mehrere Informationsfreiheitsgesetz(IFG)-Anfragen
          </a>{" "}
          öffentlich gemacht.
        </p>
        <p>
          Ich habe diese Karte primär als technische Fingerübung konzipiert. Ich
          wollte herausfinden, wie man (halbwegs performant) rund eine Millionen
          Datenpunkte auf einer interaktiven, vektorbasierten Karte im Browser
          darstellen kann. Der{" "}
          <a
            className=""
            href="https://github.com/preya/unfallstatistik-hamburg"
            target="_blank"
          >
            Quelltext der Anwendung
          </a>{" "}
          steht unter einer Open-Source-Lizenz zur freien Verfügung.
        </p>
        <h3 className="text-lg font-semibold">Impressum & Kontakt</h3>
        <p>Moritz Stückler (unfaelle "ätt" elbnerds.de)</p>
      </div>
    </div>
  );
}
