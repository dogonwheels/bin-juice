export default interface BlockProps {
  data: ArrayBuffer;
  start: number;
  length: number;
  cursor: number;
  onUpdateCursor: (position: number) => void;
}
