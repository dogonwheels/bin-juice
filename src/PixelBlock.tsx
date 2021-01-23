import React, { CanvasHTMLAttributes, ReactElement, useEffect, useRef, useState } from 'react';

interface PixelBlockProps {
  data: ArrayBuffer;
  start: number;
  length: number;
}

function PixelBlock({ data, start, length }: PixelBlockProps) {
  const [buffer, setBuffer] = useState(new DataView(data));
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // DOMFIXME: get from layout
  const width = 124;
  const height = 124;

  // DOMFIXME: hooks? pass DataView as prop?
  useEffect(() => {
    //const arrayLength = round(length - start, 2);
    setBuffer(new DataView(data, start, length));
  }, [data, start, length]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) {
      return;
    }

    const image = ctx.getImageData(0, 0, width, height);
    for (let i = 0; i < Math.floor(buffer.byteLength / 3); i += 1) {
      const src = i * 3;
      const dst = i * 4;
      image.data[dst] = buffer.getUint8(src + 2);
      image.data[dst + 1] = buffer.getUint8(src + 1);
      image.data[dst + 2] = buffer.getUint8(src);
      image.data[dst + 3] = 255;
    }

    ctx.putImageData(image, 0, 0);
  }, [buffer, canvasRef]);

  return (
    <div>
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
}

export default PixelBlock;
