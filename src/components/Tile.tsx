/* eslint-disable no-bitwise */
import { Flex } from 'antd';
import React, { ReactNode } from 'react';

export enum TileType {
  NES_2BPP,
}

type Props = {
  bytes: Uint8Array;
  type: TileType;
  palette: string[];
  width?: number;
  height?: number;
  scale?: number;
};

function getPaletteIndex(
  bytes: Uint8Array,
  type: TileType,
  pixelIndex: number,
): number {
  if (type === TileType.NES_2BPP) {
    // NES 2BPP
    const bitIndex = pixelIndex % 8;
    const byteIndex = pixelIndex >> 3;
    const shift = 7 - bitIndex;
    const mask = 1 << shift;
    const low = (bytes[byteIndex] & mask) >> shift;
    const high = (bytes[byteIndex + 0x08] & mask) >> shift;
    return (high << 1) | low;
  }
  return 0;
}

export const Tile: React.FC<Props> = ({
  bytes,
  type,
  palette,
  width = 8,
  height = 8,
  scale = 8,
}: Props) => {
  const pixels: ReactNode[] = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pixelIndex = x + y * width;
      const paletteIndex = getPaletteIndex(bytes, type, pixelIndex);
      const color: string = palette[paletteIndex];
      pixels.push(
        <div
          style={{
            width: scale,
            height: scale,
            backgroundColor: color,
          }}
        ></div>,
      );
    }
  }
  return (
    <Flex
      wrap={'wrap'}
      style={{
        width: width * scale,
        height: height * scale,
      }}
    >
      {pixels}
    </Flex>
  );
};
