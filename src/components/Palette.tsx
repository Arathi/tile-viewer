import { Flex } from 'antd';
import { ReactNode } from 'react';

export const colors = [
  '#626262',
  '#002e98',
  '#0c11c2',
  '#3b00c2',
  '#650098',
  '#7d004e',
  '#7d0000',
  '#651900',
  '#3b3600',
  '#0c4f00',
  '#005b00',
  '#005900',
  '#00494e',
  '#000000',
  '#000000',
  '#000000',
  '#ababab',
  '#0064f4',
  '#353cff',
  '#761bff',
  '#ae0af4',
  '#cf0c8f',
  '#cf231c',
  '#ae4700',
  '#766f00',
  '#359000',
  '#00a100',
  '#009e1c',
  '#00888f',
  '#000000',
  '#000000',
  '#000000',
  '#ffffff',
  '#4ab5ff',
  '#858cff',
  '#c86aff',
  '#ff58ff',
  '#ff5be2',
  '#ff726a',
  '#ff9702',
  '#c8c100',
  '#85e300',
  '#4af502',
  '#29f26a',
  '#29dbe2',
  '#4e4e4e',
  '#000000',
  '#000000',
  '#ffffff',
  '#b6e1ff',
  '#ced1ff',
  '#e9c3ff',
  '#ffbcff',
  '#ffbdf4',
  '#ffc6c3',
  '#ffd59a',
  '#e9e681',
  '#cef481',
  '#b6fb9a',
  '#a9fac3',
  '#a9f0f4',
  '#b8b8b8',
  '#000000',
  '#000000',
];

type Props = {
  width?: number;
  height?: number;
};

export const Palette: React.FC<Props> = ({
  width = 32,
  height = 32,
}: Props) => {
  const blocks: ReactNode[] = [];
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 0x10; x++) {
      const index = x + y * 0x10;
      const hex = `${index.toString(16).padStart(2, '0').toUpperCase()}`;
      const color = colors[index];
      blocks.push(
        <Flex
          key={`block-${hex}`}
          justify={'center'}
          align={'center'}
          style={{
            color: color === '#000000' ? 'gray' : 'black',
            backgroundColor: color,
            borderRightWidth: x < 0x0f ? 1 : 0,
            borderRightColor: 'gray',
            borderRightStyle: 'solid',
            borderBottomWidth: y < 0x03 ? 1 : 0,
            borderBottomColor: 'gray',
            borderBottomStyle: 'solid',
            width,
            height,
          }}
        >
          {hex}
        </Flex>,
      );
    }
  }

  return (
    <Flex
      wrap={'wrap'}
      style={{ width: width * 16 + 15, height: height * 4 + 3 }}
    >
      {blocks}
    </Flex>
  );
};
