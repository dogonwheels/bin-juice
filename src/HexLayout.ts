import RowLayout from './RowLayout';

export default class HexLayout extends RowLayout {
  constructor(length: number) {
    super(length, 16, 32);
  }
}
