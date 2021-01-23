import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import './App.css';
import BlockProps from './BlockProps';
import HexBlock from './HexBlock';
import PixelBlock from './PixelBlock';
import TextBlock from './TextBlock';

enum BlockType {
  Hex,
  Text,
  Pixel,
}

const componentsForType = {
  [BlockType.Hex]: HexBlock,
  [BlockType.Text]: TextBlock,
  [BlockType.Pixel]: PixelBlock,
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
  const [data, setData] = useState<ArrayBuffer>(new ArrayBuffer(0));
  const [blocks, setBlocks] = useState<Block[]>([]);

  // DOMFIXME: useUrlAsBuffer/Blocks
  useEffect(() => {
    const array = new ArrayBuffer(1000);
    setData(array);
    async function createFile() {
      let response = await fetch('FLAG_B24.BMP');
      let data = await response.blob();
      let array = await data.arrayBuffer();
      setData(array);
      setBlocks([
        { type: BlockType.Hex, length: 14 },
        { type: BlockType.Text, length: 40 },
        { type: BlockType.Pixel, length: array.byteLength - 54 },
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

  return (
    <div className="App">
      <h1>Bin Juice</h1>
      <h2>Exploring the contents of your binaries</h2>

      {layout.map(({ Component, start, length }) => (
        <Component key={start} start={start} length={length} data={data} />
      ))}
    </div>
  );
}

export default App;
