import BlockType from './BlockType';
import HexLayout from './HexLayout';
import TextLayout from './TextLayout';
import PixelLayout from './PixelLayout';

const layoutsForType = {
  [BlockType.Hex]: HexLayout,
  [BlockType.Text]: TextLayout,
  [BlockType.Pixel]: PixelLayout,
  [BlockType.Pixel16]: PixelLayout,
};

export default layoutsForType;
