import type { ComponentPropsWithRef } from "react";
import type { Accident } from "../types/accidents";
import clsx from "clsx";
import { PoiTable } from "./PoiTable";

interface TooltipProps extends ComponentPropsWithRef<"div"> {
  poiData: Accident;
  style?: React.CSSProperties;
  className?: string;
}
export function Tooltip({ ref, poiData, style, className
  
 }: TooltipProps) {
  return (
    <div
      ref={ref}
      className={clsx(
        "absolute pointer-events-none bg-zinc-500/80 w-64 h-auto p-2 text-xs flex flex-col gap-4",
        className
      )}
      style={style}
    >
      <PoiTable poiData={poiData} />
    </div>
  );
}
