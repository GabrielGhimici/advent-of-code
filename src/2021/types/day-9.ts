interface MapPosition {
  row: number;
  column: number;
}
interface MapData {
  value: number;
  position: MapPosition;
}

export type { MapPosition, MapData };
