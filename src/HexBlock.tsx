import React, { ReactElement, useEffect, useState } from 'react';
import './Block.css';

interface HexBlockProps {
  data: ArrayBuffer;
  start: number;
  length: number;
}

// DOMFIXME sub data view
interface HexRowProps {
  buffer: DataView;
  offset: number;
  columns: number;
}

function HexRow({ buffer, offset, columns }: HexRowProps) {
  const result: ReactElement[] = [];
  for (let column = 0; column < columns; column++) {
    const position = offset + column;
    if (position < buffer.byteLength) {
      result.push(<span key={position}> {buffer.getUint8(position).toString(16).padStart(2, '0')}</span>);
    }
  }
  return <div>{result}</div>;
}

function HexBlock({ data, start, length }: HexBlockProps) {
  const [buffer, setBuffer] = useState(new DataView(data));

  const columns = 16;

  useEffect(() => {
    setBuffer(new DataView(data, start, length));
  }, [data, start, length]);

  const result: ReactElement[] = [];
  for (let row = 0; row < Math.ceil(length / columns); row++) {
    result.push(<HexRow key={row} offset={row * columns} columns={columns} buffer={buffer} />);
  }
  return (
    <div className="Block">
      <div className="BlockType">Hex</div>
      <div className="BlockContents">{result}</div>
      <div className="BlockOptions"></div>
    </div>
  );
}

export default HexBlock;
