import React, { Fragment, ReactElement, useEffect, useState } from 'react';
import './Block.css';
import BlockProps from './BlockProps';
import HexRow from './HexRow';

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
