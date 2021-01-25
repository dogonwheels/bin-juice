export default interface ViewProps {
  data: DataView;
  start: number;
  length: number;
  cursor: number;
  onUpdateCursor: (position: number) => void;
}
