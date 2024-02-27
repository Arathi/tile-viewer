import { Flex, Upload, UploadProps, Button, Input } from 'antd';
import { ReactNode, useState } from 'react';
import { Tile, TileType } from '@/components/Tile';
import { Palette, colors } from '@/components/Palette';

type OffsetProps = {
  value: number;
  setValue: (newValue: number) => void;
};

const Offset: React.FC<OffsetProps> = ({ value, setValue }) => {
  const hex = value.toString(16).toUpperCase();

  function move(delta: number) {
    let nextValue = value + delta;
    if (nextValue < 0) {
      nextValue = 0;
    }
    setValue(nextValue);
  }

  return (
    <Flex gap={8}>
      <Button onClick={() => move(-0x1000)}>&lt;&lt;&lt;</Button>
      <Button onClick={() => move(-0x10)}>&lt;&lt;</Button>
      <Button onClick={() => move(-1)}>&lt;</Button>
      <Input value={hex} style={{ width: 80 }} />
      <Button onClick={() => move(1)}>&gt;</Button>
      <Button onClick={() => move(0x10)}>&gt;&gt;</Button>
      <Button onClick={() => move(0x1000)}>&gt;&gt;&gt;</Button>
    </Flex>
  );
};

const App = () => {
  const [rom, setRom] = useState<Uint8Array>(new Uint8Array());
  const [offset, setOffset] = useState<number>(0);

  const uploadProps: UploadProps = {
    maxCount: 1,
    showUploadList: false,
    beforeUpload: file => {
      file.arrayBuffer().then(buffer => {
        console.info(`加载ROM完成，字节数：${buffer.byteLength}`);
        setRom(new Uint8Array(buffer));
      });
      return false;
    },
  };

  const tileBytes: ReactNode[] = [];
  rom.slice(offset, offset + 0x10).forEach(byte => {
    const tileByte = (
      <div style={{ marginLeft: 4, marginRight: 0 }}>
        {byte.toString(16).padStart(2, '0').toUpperCase()}
      </div>
    );
    tileBytes.push(tileByte);
  });

  return (
    <Flex vertical gap={8}>
      <Flex gap={8}>
        <Upload {...uploadProps}>
          <Button>打开</Button>
        </Upload>
        <Offset value={offset} setValue={setOffset} />
      </Flex>
      <Flex style={{ display: 'none' }}>
        <Palette />
      </Flex>
      <Flex>
        <Tile
          bytes={rom.slice(offset, offset + 0x10)}
          type={TileType.NES_2BPP}
          palette={[colors[0x0d], colors[0x16], colors[0x1b], colors[0x12]]}
        />
        {tileBytes}
      </Flex>
    </Flex>
  );
};

export default App;
