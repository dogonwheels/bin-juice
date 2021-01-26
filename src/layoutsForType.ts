import BlockType from './BlockType';
import HexLayout from './HexLayout';

const layoutsForType = {
  [BlockType.Hex]: HexLayout,
  [BlockType.Text]: HexLayout,
  // [BlockType.Pixel]: PixelBlock,
};

export default layoutsForType;
