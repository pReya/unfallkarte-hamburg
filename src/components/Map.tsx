import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGl from "react-map-gl/mapbox";
import DeckGL from "@deck.gl/react";
import { MVTLayer } from "deck.gl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Accident } from "../types/accidents";
import debounce from "lodash-es/debounce";
import { HelpOverlay } from "./HelpOverlay";
import { useClickAway } from "@uidotdev/usehooks";

interface TooltipState {
  id: string | null;
  pointerX: number | null;
  pointerY: number | null;
}

const INITIAL_VIEW_STATE = {
  longitude: 9.9911,
  latitude: 53.5531,
  zoom: 12,
};

function Map() {
  const [tooltip, setTooltip] = useState<TooltipState>({
    id: null,
    pointerX: null,
    pointerY: null,
  });

  // This holds the data that was fetched from the backend
  const [poiData, setPoiData] = useState<Accident | null>();
  const [zoom, setZoom] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPoiId, setSelectedPoiId] = useState<string | null>(null);
  const [showHelpOverlay, setShowHelpOverlay] = useState<boolean>(true);

  const ref = useClickAway(() => {
    setShowHelpOverlay(false);
  });

  const handlePoiClick = useCallback((id: string) => {
    console.log("POI clicked:", id);
    setSelectedPoiId(id);
    // Add your custom click behavior here
  }, []);

  // Ref for request cancellation
  const currentFetchController = useRef<AbortController | null>(null);

  // Fetch function (not debounced yet)
  const fetchPoiData = useCallback(async (id: string) => {
    if (!id) return;

    // Abort any ongoing fetch
    if (currentFetchController.current) {
      currentFetchController.current.abort();
    }

    setIsLoading(true);
    const controller = new AbortController();
    currentFetchController.current = controller;

    try {
      const response = await fetch(`/api/poi/${id}`, {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch POI data");
      }

      const result = await response.json();

      // Only update if this is still the current request
      if (!controller.signal.aborted) {
        setPoiData(result);
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("Error fetching POI data:", error);
        setPoiData(null);
      }
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
    }
  }, []);

  // Create debounced version using lodash
  const debouncedFetch = useMemo(
    () => debounce(fetchPoiData, 300),
    [fetchPoiData]
  );

  // Effect to handle tooltip ID changes
  useEffect(() => {
    if (tooltip.id) {
      debouncedFetch(tooltip.id);
    } else {
      // Clear data immediately when hovering away
      setPoiData(null);
      setIsLoading(false);

      // Cancel debounced function and any pending requests
      debouncedFetch.cancel();
      if (currentFetchController.current) {
        currentFetchController.current.abort();
      }
    }

    // Cleanup on unmount
    return () => {
      debouncedFetch.cancel();
      if (currentFetchController.current) {
        currentFetchController.current.abort();
      }
    };
  }, [tooltip.id, debouncedFetch]);

  const renderTooltip = () => {
    const { id, pointerX, pointerY } = tooltip || {};

    if (poiData) {
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
        id &&
        pointerX &&
        pointerY && (
          <div
            className="absolute pointer-events-none bg-zinc-500/80 w-64 h-auto p-2 text-xs flex flex-col gap-4"
            style={{
              zIndex: 1000, // Higher z-index
              left: Math.min(pointerX, window.innerWidth - 280), // Prevent overflow
              top: Math.max(pointerY - 10, 10),
            }}
          >
            <table className="w-full">
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
                  return String(value).trim() ? (
                    <tr key={key}>
                      <td>
                        <span className="font-bold">{key}</span>:
                      </td>
                      <td>{value}</td>
                    </tr>
                  ) : null;
                })}
              </tbody>
            </table>
            <table className="w-full">
              <thead>
                <tr>
                  <th>Bet</th>
                  <th>1</th>
                  <th>2</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span className="font-bold">Geschl:</span>
                  </td>
                  <td>{Geschl_01}</td>
                  <td>{Geschl_02}</td>
                </tr>
                <tr>
                  <td>
                    <span className="font-bold">AV:</span>
                  </td>
                  <td>{AV1}</td>
                  <td>{AV2}</td>
                </tr>
                <tr>
                  <td>
                    <span className="font-bold">Alter:</span>
                  </td>
                  <td>{Alter_01}</td>
                  <td>{Alter_02}</td>
                </tr>
                <tr>
                  <td>
                    <span className="font-bold">Bet:</span>
                  </td>
                  <td>{Bet_01}</td>
                  <td>{Bet_02}</td>
                </tr>
                <tr>
                  <td>
                    <span className="font-bold">KZ:</span>
                  </td>
                  <td>{Kz_Bet1}</td>
                  <td>{Kz_Bet2}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )
      );
    }
  };

  const radiusScale = useMemo(() => {
    return zoom > 12 ? Math.pow(1.3, zoom - 12) : 1;
  }, [zoom]);

  // Get stroke width based on zoom (reduce stroke at high zoom)
  const strokeWidth = useMemo(() => {
    return zoom > 14 ? 0.5 : 1;
  }, [zoom]);

  // Get stroke opacity (reduce or remove stroke at very high zoom)
  const strokeOpacity = useMemo(() => {
    return zoom > 16 ? 0 : 200;
  }, [zoom]);

  // Helper function to get year-based color
  const getYearBasedColor = useCallback(
    (
      year: string,
      isSelected: boolean = false
    ): [number, number, number, number] => {
      // If selected, return a bright highlight color (e.g., bright orange/red)
      if (isSelected) {
        return [255, 165, 0, 255]; // Bright orange with full opacity
      }

      // Original year-based coloring
      switch (year) {
        case "2009":
          return [68, 130, 180, 51]; // most transparent (20% opacity)
        case "2010":
          return [68, 130, 180, 68]; // 27% opacity
        case "2011":
          return [68, 130, 180, 85]; // 33% opacity
        case "2012":
          return [68, 130, 180, 102]; // 40% opacity
        case "2013":
          return [68, 130, 180, 119]; // 47% opacity
        case "2014":
          return [68, 130, 180, 136]; // 53% opacity
        case "2015":
          return [68, 130, 180, 153]; // 60% opacity
        case "2016":
          return [68, 130, 180, 170]; // 67% opacity
        case "2017":
          return [68, 130, 180, 187]; // 73% opacity
        case "2018":
          return [68, 130, 180, 204]; // 80% opacity
        case "2019":
          return [68, 130, 180, 221]; // 87% opacity
        case "2020":
          return [68, 130, 180, 238]; // 93% opacity
        case "2021":
          return [68, 130, 180, 255]; // fully opaque
        case "2022":
          return [68, 130, 180, 255]; // fully opaque
        case "2023":
          return [68, 130, 180, 255]; // fully opaque
        default:
          return [240, 240, 240, 255]; // light gray fallback
      }
    },
    []
  );

  const layers = [
    new MVTLayer({
      id: "accidents",
      data: import.meta.env.PUBLIC_TILESERVER_URL,
      pointRadiusUnits: "pixels",
      getPointRadius: 3, // Larger radius at high zoom
      pointRadiusScale: radiusScale, // Scale with zoom
      getLineColor: [0, 0, 0, strokeOpacity],
      lineWidthScale: strokeWidth,
      getFillColor: (f) => {
        const year = f.properties.id.split("-")[0];
        const isSelected = f.properties.id === selectedPoiId;
        return getYearBasedColor(year, isSelected);
      },
      updateTriggers: {
        getPointRadius: zoom,
        pointRadiusScale: zoom,
        getLineColor: zoom,
        lineWidthScale: zoom,
        getFillColor: selectedPoiId,
      },
      picking: true,
      pickable: true,
    }),
  ];

  return (
    <>
      <div className="bg-white/50 absolute right-0 top-0 z-40 px-2 py-1 text-sm">
        <button
          type="button"
          className="cursor-pointer hover:underline"
          title="Hilfe anzeigen"
          onClick={() => {
            setShowHelpOverlay(true);
          }}
        >
          Hilfe
        </button>
      </div>
      {showHelpOverlay && (
        <HelpOverlay
          ref={ref}
          onClickOutside={() => {
            setShowHelpOverlay(false);
          }}
        />
      )}
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
        onClick={(e) => {
          if (e.object?.properties?.id) {
            handlePoiClick(e.object.properties.id);
          } else {
            // Click on empty space - clear selection
            setSelectedPoiId(null);
          }
        }}
        onViewStateChange={({ viewState }) => {
          setZoom(viewState.zoom); // Update zoom state when map moves
        }}
        onHover={(e) => {
          setTooltip({
            id: e.object?.properties?.id || undefined,
            pointerX: e.x,
            pointerY: e.y,
          });
        }}
        getCursor={({ isDragging, isHovering }) => {
          if (isDragging) return "grabbing";
          if (isHovering && tooltip.id) return "pointer";
          return "default"; // Default cursor
        }}
      >
        <ReactMapGl
          mapboxAccessToken={import.meta.env.PUBLIC_MAPBOX_TOKEN}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/dark-v9"
        ></ReactMapGl>
        {renderTooltip()}
      </DeckGL>
    </>
  );
}

export default Map;
