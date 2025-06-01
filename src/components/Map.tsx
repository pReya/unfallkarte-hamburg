import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGl from "react-map-gl/mapbox";
import DeckGL from "@deck.gl/react";
import { MVTLayer } from "deck.gl";
import { useEffect, useState } from "react";

function Map() {
  const [tooltip, setTooltip] = useState<{
    id: string | null;
    pointerX: number | null;
    pointerY: number | null;
  }>({
    id: null,
    pointerX: null,
    pointerY: null,
  });
  const [poiData, setPoiData] = useState();
  const [zoom, setZoom] = useState(12); // Track zoom level

  useEffect(() => {
    let ignore = false;

    if (tooltip.id) {
      setPoiData(null);

      fetch(`/api/poi/${tooltip.id}`)
        .then((response) => response.json())
        .then((result) => {
          if (!ignore) {
            setPoiData(result);
          }
        });
    }

    return () => {
      ignore = true;
    };
  }, [tooltip.id]);

  const renderTooltip = () => {
    const { id, pointerX, pointerY } = tooltip || {};
    return (
      id &&
      pointerX &&
      pointerY && (
        <div
          className="absolute pointer-events-none bg-zinc-500/80 w-64 h-auto p-2 text-xs"
          style={{
            zIndex: 1,
            left: pointerX,
            top: pointerY,
          }}
        >
          {poiData && (
            <ul>
              {Object.entries(poiData).map(([key, value]) =>
                value ? (
                  <li key={key}>
                    <span className="font-bold">{key}</span>: {value}
                  </li>
                ) : null
              )}
            </ul>
          )}
        </div>
      )
    );
  };

  const INITIAL_VIEW_STATE = {
    longitude: 9.9911,
    latitude: 53.5531,
    zoom: 12,
  };

  const getRadiusScale = () => {
    return zoom > 12 ? Math.pow(1.3, zoom - 12) : 1;
  };

  // Get stroke width based on zoom (reduce stroke at high zoom)
  const getStrokeWidth = () => {
    return zoom > 14 ? 0.5 : 1;
  };

  // Get stroke opacity (reduce or remove stroke at very high zoom)
  const getStrokeOpacity = () => {
    return zoom > 16 ? 0 : 200;
  };

  const layers = [
    new MVTLayer({
      id: "accidents",
      data: "http://localhost:3000/out",
      pointRadiusUnits: "pixels",
      getPointRadius: 3, // Larger radius at high zoom
      pointRadiusScale: getRadiusScale(), // Scale with zoom
      getLineColor: [0, 0, 0, getStrokeOpacity()],
      lineWidthScale: getStrokeWidth(),
      getFillColor: (f) => {
        const year = f.properties.id.split("-")[0];

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
      updateTriggers: {
        getPointRadius: zoom,
        pointRadiusScale: zoom,
        getLineColor: zoom,
        lineWidthScale: zoom,
      },
      picking: true,
      pickable: true,
    }),
  ];

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
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
    >
      <ReactMapGl
        cursor="pointer"
        mapboxAccessToken="pk.eyJ1IjoicHJleWEyayIsImEiOiJjbTA3cGRxMDkxYXdzMmpzaGh2NWpqb2h2In0.oXjP1_xLjkIFfu4cbIBAgg"
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        interactiveLayerIds={["accidents", "output"]}
      ></ReactMapGl>
      {renderTooltip()}
    </DeckGL>
  );
}

export default Map;