import { Flex } from 'antd';
import { ReactNode } from 'react';
import { Tile, TileType } from './Tile';
import { colors } from './Palette';

type TileConfig = {
  /**
   * 宽度
   */
  width: number;

  /**
   * 高度
   */
  height: number;

  /**
   * 缩放
   */
  scale: number;

  /**
   * 色深（bpp）
   */
  colorDepth: number;
};

type Props = {
  bytes: Uint8Array;
  offset?: number;
  width?: number;
  height?: number;
  tileConfig?: TileConfig;
};

export const TileGrid: React.FC<Props> = ({
  bytes,
  offset = 0,
  width = 16,
  height = 16,
  tileConfig = {
    width: 8,
    height: 8,
    scale: 3,
    colorDepth: 2,
  },
}: Props) => {
  const tiles: ReactNode[] = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = x + y * width;
      const length =
        (tileConfig.width * tileConfig.height * tileConfig.colorDepth) / 8;
      const startAt = offset + index * length;
      const tileBytes = bytes.slice(startAt, startAt + length);
      tiles.push(
        <Tile
          bytes={tileBytes}
          type={TileType.NES_2BPP}
          palette={[colors[0x0d], colors[0x16], colors[0x1b], colors[0x12]]}
          width={tileConfig.width}
          height={tileConfig.height}
          scale={tileConfig.scale}
        />,
      );
    }
  }
  return <Flex wrap={'wrap'}>{tiles}</Flex>;
};
