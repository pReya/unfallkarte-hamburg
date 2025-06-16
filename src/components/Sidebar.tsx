import type { Accident } from "../types/accidents";
import clsx from "clsx";
import { PoiTable } from "./PoiTable";

interface SidebarProps {
  poiData: Accident;
  className?: string;
}
export function Sidebar({ poiData, className }: SidebarProps) {
  return (
    <aside
      className={clsx("bg-white/80 h-full z-40 p-4 text-xs overflow-y-auto", className)}
    >
      <PoiTable poiData={poiData} className="[&_td]:py-2" showDescriptions />
    </aside>
  );
}
