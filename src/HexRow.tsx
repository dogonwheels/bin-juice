import React, { ReactElement, useCallback } from 'react';

interface HexRowProps {
  buffer: DataView;
  start: number;
  offset: number;
  columns: number;
  cursor: number;
  onUpdateCursor: (position: number) => void;
}

function HexRow({ buffer, offset, columns, cursor, onUpdateCursor, start }: HexRowProps) {
  const result: ReactElement[] = [];

  const onCellClick = useCallback(
    (e) => {
      const position = e.target.dataset.position;
      onUpdateCursor(position);
    },
    [onUpdateCursor],
  );

  for (let column = 0; column < columns; column++) {
    const position = offset + column;
    const isSelected = cursor - start === position;
    if (position < buffer.byteLength) {
      result.push(
        <span
          onClick={onCellClick}
          className={`Cell${isSelected ? ' Selected' : ''}`}
          key={position}
          data-position={start + position}
        >
          {' '}
          {buffer.getUint8(position).toString(16).padStart(2, '0')}
        </span>,
      );
    }
  }
  return <div className="Row">{result}</div>;
}

export default HexRow;
