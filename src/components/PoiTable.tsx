import type { Accident } from "../types/accidents";
import { legend } from "../legend";
import clsx from "clsx";

interface PoiTableProps {
  poiData: Accident;
  className?: string;
  showDescriptions?: boolean;
}
export function PoiTable({
  poiData,
  className,
  showDescriptions,
}: PoiTableProps) {
  const {
    Geschl_01,
    Geschl_02,
    AV1,
    AV2,
    Alter_01,
    Alter_02,
    Bet_01,
    Bet_02,
    Kz_Bet1,
    Kz_Bet2,
    Datum,
    Zeit,
    ...restPoiData
  } = poiData;
  return (
    <div className={clsx("flex flex-col gap-8", className)}>
      <table className="w-full table-fixed">
        <thead>
          <tr>
            <td className="w-1/2 !p-0"></td>
            <td className="w-1/2 !p-0"></td>
          </tr>
        </thead>
        <tbody>
          {Datum.trim() && (
            <tr>
              <td>
                <span className="font-bold">Datum: </span>
              </td>
              <td>
                {new Date(Datum).toLocaleDateString("de-DE", {
                  weekday: "long",
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
              </td>
            </tr>
          )}
          {Zeit.trim() && (
            <tr>
              <td>
                <span className="font-bold">Zeit: </span>
              </td>
              <td>{Zeit} Uhr</td>
            </tr>
          )}
          {Object.entries(restPoiData).map(([key, value]) => {
            const description = showDescriptions && legend[key]?.description;
            const valueDescription =
              showDescriptions && legend[key]?.values?.[value];
            return String(value).trim() ? (
              <tr key={key}>
                <td>
                  <span className="font-bold">{key}</span>:
                  {description && (
                    <>
                      <br />
                      <span className="text-tiny">{description}</span>
                    </>
                  )}
                </td>
                <td>
                  <span>{value}</span>{" "}
                  {valueDescription && (
                    <>
                      <br />
                      <span className="text-tiny">{valueDescription}</span>
                    </>
                  )}
                </td>
              </tr>
            ) : null;
          })}
        </tbody>
      </table>
      <table className="w-full table-fixed">
        <thead>
          <tr>
            <th className="w-1/2">Beteiligte</th>
            <th className="w-1/4">1</th>
            <th className="w-1/4">2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span className="font-bold">Geschl:</span>
              {showDescriptions && (
                <>
                  <br />
                  <span className="text-tiny">
                    {legend["Geschl_01"]?.description}
                  </span>
                </>
              )}
            </td>
            <td>{Geschl_01}</td>
            <td>{Geschl_02}</td>
          </tr>
          <tr>
            <td>
              <span className="font-bold">AV:</span>
              {showDescriptions && (
                <>
                  <br />
                  <span className="text-tiny">
                    {legend["AV1"]?.description}
                  </span>
                </>
              )}
            </td>
            <td>{AV1}</td>
            <td>{AV2}</td>
          </tr>
          <tr>
            <td>
              <span className="font-bold">Alter:</span>
              {showDescriptions && (
                <>
                  <br />
                  <span className="text-tiny">
                    {legend["Alter_01"]?.description}
                  </span>
                </>
              )}
            </td>
            <td>{Alter_01}</td>
            <td>{Alter_02}</td>
          </tr>
          <tr>
            <td>
              <span className="font-bold">Bet:</span>
              {showDescriptions && (
                <>
                  <br />
                  <span className="text-tiny">
                    {legend["Bet_01"]?.description}
                  </span>
                </>
              )}
            </td>
            <td>{Bet_01}</td>
            <td>{Bet_02}</td>
          </tr>
          <tr>
            <td>
              <span className="font-bold">KZ:</span>
              {showDescriptions && (
                <>
                  <br />
                  <span className="text-tiny">
                    {legend["Kz_Bet1"]?.description}
                  </span>
                </>
              )}
            </td>
            <td>{Kz_Bet1}</td>
            <td>{Kz_Bet2}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
