export default abstract class Layout {
  length: number;

  constructor(length: number) {
    this.length = length;
  }

  abstract getHeight: () => number;
  abstract getTopFor: (address: number) => number;
  abstract getAddressFor: (position: number) => number;
}
