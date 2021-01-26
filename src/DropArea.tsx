import { useCallback, useState } from 'react';

interface DropAreaProps {
  onUpdateData: (data: DataView) => void;
}
const DropArea = ({ onUpdateData }: DropAreaProps) => {
  const defaultText = 'Drag File Here';
  const [label, setLabel] = useState(defaultText);

  const onDrop = useCallback(
    (e) => {
      const item = e.dataTransfer?.files?.[0];
      e.preventDefault();

      async function readFile() {
        if (item) {
          const buffer = await item.arrayBuffer();
          onUpdateData(new DataView(buffer));
        }
      }

      readFile();
      setLabel(defaultText);
    },
    [onUpdateData],
  );

  const onDragOver = useCallback((e) => {
    setLabel('Drop!');
    e.preventDefault();
  }, []);

  const onDragLeave = useCallback((e) => {
    setLabel(defaultText);
  }, []);

  return (
    <div className="DropArea" onDrop={onDrop} onDragOver={onDragOver} onDragLeave={onDragLeave}>
      <h1>{label}</h1>;
    </div>
  );
};

export default DropArea;
