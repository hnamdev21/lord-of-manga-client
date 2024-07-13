import { useWindowSize } from "@uidotdev/usehooks";
import { Button, Image } from "antd";
import React from "react";
import { GridContextProvider, GridDropZone, GridItem, swap } from "react-grid-dnd";
import { FaTrash } from "react-icons/fa";
import { v4 } from "uuid";

import styles from "./styles.module.scss";

function checkSizeGrid(size: number | any): number {
  if (size > 1100) return 10;
  if (size > 700) return 6;
  if (size >= 500 && size < 700) return 4;
  if (size < 500) return 3;
  return 10;
}

type Props = {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
};

const MultipleFileInput = ({ images, setImages }: Props) => {
  const size = useWindowSize();

  function onChange(_sourceId: string, sourceIndex: number, targetIndex: number) {
    const _images = swap(images, sourceIndex, targetIndex);
    setImages(_images);
  }

  const deleteItem = (idx: number) => {
    const _clone = images.slice();

    _clone.splice(idx, 1);

    setImages(_clone);
  };

  return (
    <div className="mt-[1rem]">
      <GridContextProvider onChange={onChange}>
        <GridDropZone id="images" boxesPerRow={checkSizeGrid(size.width)} rowHeight={160} className={styles.container__drag}>
          {images.map((image: string, index: number) => {
            return (
              <GridItem key={v4()} className={styles.container__img}>
                <div className="w-full h-full flex flex-col justify-between items-center">
                  <Image src={image} alt="img" />
                  <div className="flex items-center justify-between mt-5">
                    <Button size="small" type="text" icon={<FaTrash />} danger={true} onClick={() => deleteItem(index)} />
                  </div>
                </div>
              </GridItem>
            );
          })}
        </GridDropZone>
      </GridContextProvider>
    </div>
  );
};

export default React.memo(MultipleFileInput);
