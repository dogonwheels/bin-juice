import ViewProps from './ViewProps';

export default interface BlockProps extends ViewProps {
  onUpdateLength: (start: number, length: number) => void;
}
