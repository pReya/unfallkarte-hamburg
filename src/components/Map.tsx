import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGl from "react-map-gl/mapbox";
import DeckGL from "@deck.gl/react";
import { MVTLayer } from "deck.gl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Accident } from "../types/accidents";
import debounce from "lodash-es/debounce";
import { HelpOverlay } from "./HelpOverlay";
import { useClickAway } from "@uidotdev/usehooks";
import { getYearBasedColor as getColor } from "../helpers/color";
import { Tooltip } from "./Tooltip";
import { Sidebar } from "./Sidebar";

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
  const [hoveredPoiData, setHoveredPoiData] = useState<Accident | null>(null);
  const [selectedPoiData, setSelectedPoiData] = useState<Accident | null>(null);
  const [zoom, setZoom] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [showHelpOverlay, setShowHelpOverlay] = useState<boolean>(true);

  const overlayRef = useClickAway<HTMLDivElement>(() => {
    setShowHelpOverlay(false);
  });

  const handlePoiClick = useCallback((id: string) => {
    // console.log("POI clicked:", id, hoveredPoiData);
    debouncedFetch(id)?.then((newPoiData) => {
      newPoiData && setSelectedPoiData(newPoiData);
    });
  }, []);

  // Ref for request cancellation
  const currentFetchController = useRef<AbortController | null>(null);

  // Fetch function (not debounced yet)
  const fetchPoiData = useCallback(
    async (id: string): Promise<undefined | Accident> => {
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
          return result as Accident;
        }
        return;
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Error fetching POI data:", error);
          return;
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    },
    []
  );

  // Create debounced version using lodash
  const debouncedFetch = useMemo(
    () => debounce(fetchPoiData, 300),
    [fetchPoiData]
  );

  // Effect to handle tooltip ID changes
  useEffect(() => {
    if (tooltip.id) {
      debouncedFetch(tooltip.id)?.then((newPoiData) => {
        newPoiData && setHoveredPoiData(newPoiData);
      });
    } else {
      // Clear data immediately when hovering away
      setHoveredPoiData(null);
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

    if (hoveredPoiData) {
      return (
        id &&
        pointerX &&
        pointerY && (
          <Tooltip
            style={{
              zIndex: 1000, // Higher z-index
              left: Math.min(pointerX, window.innerWidth - 280), // Prevent overflow
              top: Math.max(pointerY - 10, 10),
            }}
            poiData={hoveredPoiData}
          />
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
  const getYearBasedColor = useCallback(getColor, []);

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
        const isSelected = f.properties.id === selectedPoiData?.GlobalId;
        return getYearBasedColor(year, isSelected);
      },
      updateTriggers: {
        getPointRadius: zoom,
        pointRadiusScale: zoom,
        getLineColor: zoom,
        lineWidthScale: zoom,
        getFillColor: selectedPoiData,
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
      {showHelpOverlay && <HelpOverlay ref={overlayRef} />}
      {selectedPoiData && (
        <Sidebar
          className="absolute left-0 top-0 bottom-0 w-1/4 max-w-128"
          poiData={selectedPoiData}
        />
      )}
      <div className="relative h-full">
        <DeckGL
          initialViewState={INITIAL_VIEW_STATE}
          controller={true}
          layers={layers}
          onClick={(e) => {
            if (e.object?.properties?.id) {
              handlePoiClick(e.object.properties.id);
            } else {
              // Click on empty space - clear selection
              setSelectedPoiData(null);
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
      </div>
    </>
  );
}

export default Map;
