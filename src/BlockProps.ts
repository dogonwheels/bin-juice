export default interface BlockProps {
  data: DataView;
  start: number;
  length: number;
  cursor: number;
  onUpdateCursor: (position: number) => void;
}
