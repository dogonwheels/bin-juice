import React, { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import Block from './Block';
import BlockType from './BlockType';
import HexBlock from './HexBlock';
import Inspector from './Inspector';
// import PixelBlock from './PixelBlock';
import TextBlock from './TextBlock';
import ViewProps from './ViewProps';

const componentsForType: { [blockType: string]: FunctionComponent<ViewProps> } = {
  [BlockType.Hex]: HexBlock,
  [BlockType.Text]: TextBlock,
  // [BlockType.Pixel]: PixelBlock,
};
interface BlockPosition {
  type: BlockType;
  length: number;
}

interface Layout {
  type: BlockType;
  start: number;
  end: number;
  length: number;
}

function App() {
  const [data, setData] = useState<DataView>();
  const [blocks, setBlocks] = useState<BlockPosition[]>([]);
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
        { type: BlockType.Hex, length: 40 },
        { type: BlockType.Text, length: 40 },
        { type: BlockType.Hex, length: 40 },
        { type: BlockType.Hex, length: 40 },

        //{ type: BlockType.Hex, length: array.byteLength - 54 },
      ]);
    }
    createFile();
  }, []);

  const layout = useMemo(() => {
    const result: Layout[] = [];
    let position = 0;

    if (data) {
      blocks.forEach(({ type, length }) => {
        const start = position;
        const end = Math.min(position + length, data.byteLength);

        // Only add the block if it covers data
        if (start < data.byteLength) {
          result.push({
            type,
            start,
            end,
            length: end - start,
          });
        }

        position += length;
      });
    }

    return result;
  }, [blocks, data]);

  /*
  onOptionChange(index, key, value) {
    blocks.clone()[index] = { ...blocks[index], [key]: value}
  }
  */

  /*
  hexLayout(14, 8) - memo? or simple calc
  pixelLayout
  */

  const onUpdateType = useCallback(
    (start, type) => {
      const index = layout.findIndex((block) => block.start === start);
      if (index === -1) {
        return;
      }

      const newBlocks = blocks.slice();
      newBlocks[index].type = type;

      setBlocks(newBlocks);
    },
    [blocks, layout],
  );

  const onUpdateLength = useCallback(
    (start, length) => {
      const index = layout.findIndex((block) => block.start === start);
      if (index === -1) {
        return;
      }

      const newBlocks = blocks.slice();
      newBlocks[index].length = length;

      setBlocks(newBlocks);
    },
    [layout, blocks],
  );

  const onMergeBlock = useCallback(
    (start) => {
      const index = layout.findIndex((block) => block.start === start);
      // Can't delete the first block
      if (index < 1) {
        return;
      }

      // Remove the block and add its length to the previous one
      const newBlocks = blocks.slice();
      newBlocks.splice(index, 1);
      newBlocks[index - 1].length += blocks[index].length;

      setBlocks(newBlocks);
    },
    [blocks, layout],
  );

  const onSplitBlock = useCallback(() => {
    const index = layout.findIndex((block) => cursor >= block.start && cursor < block.end);
    if (index === -1) {
      return;
    }

    // Can't split at the first cell
    const oldLayoutBlock = layout[index];
    if (cursor === oldLayoutBlock.start) {
      return;
    }

    const newBlocks = blocks.slice();
    const partition = cursor - oldLayoutBlock.start;

    newBlocks[index].length = partition;
    const newBlock = {
      ...blocks[index],
      length: oldLayoutBlock.length - partition,
    };

    newBlocks.splice(index + 1, 0, newBlock);

    setBlocks(newBlocks);
  }, [blocks, cursor, layout]);

  return data ? (
    <div className="App">
      <div className="Blocks">
        <div className="Scroller">
          {layout.map(({ type, start, length }) => (
            <Block
              key={start}
              type={type}
              start={start}
              length={length}
              data={data}
              cursor={cursor}
              contentsComponent={componentsForType[type]}
              onUpdateCursor={setCursor}
              onUpdateLength={onUpdateLength}
              onUpdateType={onUpdateType}
              onMergeBlock={onMergeBlock}
            />
          ))}
        </div>
      </div>
      <Inspector className="Inspector" data={data} cursor={cursor} onSplitBlock={onSplitBlock} />
    </div>
  ) : (
    <h2>Loading...</h2>
  );
}

export default App;
