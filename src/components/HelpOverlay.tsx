import type { ComponentPropsWithRef } from "react";

interface HelpOverlayProps extends ComponentPropsWithRef<"div"> {}

export function HelpOverlay({ ref }: HelpOverlayProps) {
  return (
    <div className="absolute inset-0 w-full h-full bg-black/50 flex items-center justify-center z-30">
      <div
        ref={ref}
        className="w-2/3 max-w-192 h-2/3 max-h-96 bg-white rounded-lg z-40 drop-shadow-2xl overflow-hidden"
      >
        <div className="prose prose-sm max-w-none overflow-y-auto w-full h-full p-6">
          <h1>Unfallkarte Hamburg</h1>
          <h2 className="text-lg font-semibold">Was ist das hier?</h2>
          <p>
            Diese Karte ist eine Visualisierung aller Verkehrsunfälle in Hamburg
            zwischen 2009 und 2023. Die Daten stammen aus der polizeilichen
            Unfalldatenbank EUSKa (Elektronische Unfalltypensteckkarte). Sie
            wurden durch{" "}
            <a
              href="https://github.com/pReya/unfallkarte-hamburg-daten"
              target="_blank"
            >
              mehrere Informationsfreiheitsgesetz(IFG)-Anfragen
            </a>{" "}
            öffentlich gemacht.
          </p>
          <h2 className="text-lg font-semibold">
            Was bedeuten die ganzen Abkürzungen?
          </h2>
          <p>
            Die Abkürzungen stammen aus der Polizeistatistik. Wenn du einen
            Punkt anklickst (nicht nur hovern), dann erscheint eine Sidebar, in
            der alle Abkürzungen erklärt werden.
          </p>
          <h2 className="text-lg font-semibold">Warum hast du das gebaut?</h2>
          <p>
            Ich habe diese Karte primär als technische Fingerübung genutzt. Ich
            wollte herausfinden, wie man (halbwegs performant) rund eine
            Millionen Datenpunkte auf einer interaktiven, vektorbasierten Karte
            im Browser darstellen kann. Der{" "}
            <a
              className=""
              href="https://github.com/preya/unfallkarte-hamburg"
              target="_blank"
            >
              Quelltext der Anwendung
            </a>{" "}
            steht unter einer Open-Source-Lizenz zur freien Verfügung.
          </p>
          <h2 className="text-lg font-semibold">
            Gibt es sowas nicht bereits?
          </h2>
          <p>
            Ja, es gibt den{" "}
            <a href="https://unfallatlas.statistikportal.de/" target="_blank">
              Unfallatlas des Statistischen Bundesamts
            </a>
            . Dieser erfasst jedoch nur Unfälle mit Personenschäden und liefert
            deutlich weniger Daten, als die Polizeistatistik – dafür allerdings
            bundesweit.
          </p>
          <h3 className="text-lg font-semibold">Impressum & Kontakt</h3>
          <p>
            Wenn ihr diese Karte interessant oder nützlich fandet, würde ich
            mich über ein entsprechendes Feedback freuen.
          </p>
          <p>
            <strong>Verantwortlicher:</strong> Moritz Stückler
            <br />
            <strong>E-Mail:</strong> info "ätt" unfallkarte-hamburg.de
            <br />
            <strong>Mastodon:</strong>{" "}
            <a href="https://mastodon.social/@preya" target="_blank">
              @preya@mastodon.social
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
