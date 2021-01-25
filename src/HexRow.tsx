import React, { ReactElement, useCallback } from 'react';
import ViewProps from './ViewProps';

function HexRow({ data, start, length, cursor, onUpdateCursor }: ViewProps) {
  const result: ReactElement[] = [];

  const onCellClick = useCallback(
    (e) => {
      const position = parseInt(e.target.dataset.position, 10);
      onUpdateCursor(position);
    },
    [onUpdateCursor],
  );

  for (let position = start; position < start + length; position++) {
    const isSelected = cursor === position;
    result.push(
      <span
        onClick={onCellClick}
        className={`Cell${isSelected ? ' Selected' : ''}`}
        key={position}
        data-position={position}
      >
        {data.getUint8(position).toString(16).padStart(2, '0')}
      </span>,
    );
  }
  return <div className="Row">{result}</div>;
}

export default HexRow;
