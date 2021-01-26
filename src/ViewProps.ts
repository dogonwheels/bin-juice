export default interface ViewProps {
  data: DataView;
  start: number;
  length: number;
  columns: number;
  visibleStart: number;
  visibleEnd: number;
  cursor: number;
  onUpdateCursor: (position: number) => void;
}
