import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import './App.css';
import BlockProps from './BlockProps';
import HexBlock from './HexBlock';
import Inspector from './Inspector';
// import PixelBlock from './PixelBlock';
import TextBlock from './TextBlock';

enum BlockType {
  Hex,
  Text,
  // Pixel,
}

const componentsForType = {
  [BlockType.Hex]: HexBlock,
  [BlockType.Text]: TextBlock,
  // [BlockType.Pixel]: PixelBlock,
};
interface Block {
  type: BlockType;
  length: number;
}

interface Layout {
  Component: FunctionComponent<BlockProps>;
  start: number;
  length: number;
}

function App() {
  const [data, setData] = useState<DataView>();
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [cursor, setCursor] = useState(0);

  // DOMFIXME: useUrlAsBuffer/Blocks
  useEffect(() => {
    async function createFile() {
      let response = await fetch('FLAG_B24.BMP');
      let data = await response.blob();
      let array = await data.arrayBuffer();
      setData(new DataView(array));
      setBlocks([
        { type: BlockType.Hex, length: 14 },
        { type: BlockType.Text, length: 40 },
        { type: BlockType.Hex, length: array.byteLength - 54 },
      ]);
    }
    createFile();
  }, []);

  const layout = useMemo(() => {
    const result: Layout[] = [];
    let position = 0;

    // DOMFIXME: don't recalc if options change
    blocks.forEach(({ type, length }) => {
      result.push({
        Component: componentsForType[type],
        start: position,
        length,
        /* width, height from layout */
      });

      position += length;
    });

    return result;
  }, [blocks]);

  /*
  onOptionChange(index, key, value) {
    blocks.clone()[index] = { ...blocks[index], [key]: value}
  }
  */

  /*
  hexLayout(14, 8) - memo? or simple calc
  pixelLayout
  */

  return data ? (
    <div className="App">
      <div className="Blocks">
        <div className="Scroller">
          {layout.map(({ Component, start, length }) => (
            <Component
              key={start}
              start={start}
              length={length}
              data={data}
              onUpdateCursor={setCursor}
              cursor={cursor}
            />
          ))}
        </div>
      </div>
      <Inspector className="Inspector" data={data} cursor={cursor} />
    </div>
  ) : (
    <h2>Loading...</h2>
  );
}

export default App;
