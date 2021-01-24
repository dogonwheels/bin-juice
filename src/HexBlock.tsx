import React, { Fragment, ReactElement, useCallback, useEffect, useState } from 'react';
import './Block.css';
import BlockProps from './BlockProps';

// DOMFIXME sub data view
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
      console.log(position);
      onUpdateCursor(position);
    },
    [offset, onUpdateCursor],
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

// DOMFIXME: RowBlock
function HexBlock({ data, start, length, cursor, onUpdateCursor }: BlockProps) {
  const [buffer, setBuffer] = useState(new DataView(data));

  const columns = 16;

  useEffect(() => {
    setBuffer(new DataView(data, start, length));
  }, [data, start, length]);

  const isSelected = cursor >= start && cursor < start + length;

  const result: ReactElement[] = [];
  for (let row = 0; row < Math.ceil(length / columns); row++) {
    result.push(
      <HexRow
        key={row}
        start={start}
        offset={row * columns}
        columns={columns}
        buffer={buffer}
        cursor={cursor}
        onUpdateCursor={onUpdateCursor}
      />,
    );
  }
  return (
    <div className={`Block${isSelected ? ' Selected' : ''}`}>
      <div className="BlockType">Hex</div>
      <div className="BlockContents">{result}</div>
      <div className="BlockOptions">
        {isSelected ? (
          <Fragment>
            <div>Foo</div>
            <div>Foo</div>
            <div>Foo</div>
          </Fragment>
        ) : null}
      </div>
    </div>
  );
}

export default HexBlock;
