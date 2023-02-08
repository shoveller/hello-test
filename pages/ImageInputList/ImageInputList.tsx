import { ImageInputButton } from "../ImageInputButton/ImageInputButton";
import InputListStyle from "./ImageInputList.module.css";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface ImageInputListProps {
  formData: FormData;
  size?: "primary" | "small";
  remit?: number;
}

export const ImageInputList = ({
  formData,
  size = "primary",
  remit = 4
}: ImageInputListProps): JSX.Element => {
  const InputListClassName = clsx(
    InputListStyle.ImageInputList,
    size === "primary" ? InputListStyle.Primary : InputListStyle.Small
  );
  const [datas, setDatas] = useState<File[]>();
  useEffect(() => {
    formData?.forEach((value) => {
      setDatas((current) => {
        return current ? [...current, value as File] : [value as File];
      });
    });
  }, [formData]);
  return (
    <div className={InputListClassName}>
      {datas?.map((file) => (
        <ImageInputButton
          key={file.name}
          file={file}
          size={size}
          formData={formData}
          setDatas={setDatas}
        />
      ))}
      {((datas && datas.length < remit) || !datas) && (
        <ImageInputButton size={size} formData={formData} setDatas={setDatas} />
      )}
    </div>
  );
};
