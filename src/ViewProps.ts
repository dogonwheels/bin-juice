export default interface ViewProps {
  data: DataView;
  start: number;
  length: number;
  visibleStart: number;
  visibleEnd: number;
  cursor: number;
  onUpdateCursor: (position: number) => void;
}
