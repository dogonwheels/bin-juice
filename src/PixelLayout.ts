import RowLayout from './RowLayout';

export default class PixelLayout extends RowLayout {
  constructor(length: number) {
    super(length, 256, 8);
  }
}
