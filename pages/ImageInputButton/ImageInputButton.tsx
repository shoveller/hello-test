import { ImagePlaceholder } from "../ImageInputList/ImagePlaceholder";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
// import addImg from "./BG.png";
import { HiOutlinePencilAlt, HiOutlineX } from "react-icons/hi";
// import buttonStyle from "./ImageInputButton/ImageInputButton.module.css";
import clsx from "clsx";
import { Button } from "../Button/Button";

const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024;

interface ImageInputButtonProps {
  file?: File;
  size?: "primary" | "small";
  setDatas: Dispatch<SetStateAction<File[] | undefined>>;
  formData: FormData;
}

export const ImageInputButton = ({
  size = "primary",
  file,
  formData,
  setDatas
}: ImageInputButtonProps): JSX.Element => {
  const [imgSrc, setImgSrc] = useState<string>("");
  const setImg = useCallback((newFile: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(newFile);
    reader.onloadend = () => {
      setImgSrc(reader.result as string);
    };
  }, []);
  const handleAdd = useCallback(
    (newFile: File) => {
      formData.append(newFile.name, newFile);
      setDatas((current) => (current ? [...current, newFile] : [newFile]));
    },
    [formData, setDatas]
  );

  const handleUpdate = useCallback(
    (newFile: File) => {
      if (file) {
        formData.delete(file.name);
        formData.set(newFile.name, newFile);
        setDatas((current) => {
          return current?.map((data) => {
            if (data.name === file.name) {
              return newFile;
            }
            return data;
          });
        });
      }
    },
    [file, formData, setDatas]
  );
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newFile = (e.target.files as FileList)[0];
      if (newFile === undefined) {
        return;
      }
      if (newFile.size > FILE_SIZE_MAX_LIMIT) {
        alert("업로드 가능한 최대 용량은 5MB입니다. ");
        return;
      }
      if (formData.has(newFile.name)) {
        alert("동일한 이름의 파일을 등록할수 없습니다.");
        return;
      }
      if (file) {
        handleUpdate(newFile);
        return;
      }
      handleAdd(newFile);
    },
    [file, formData, handleAdd, handleUpdate]
  );
  // 삭제 버튼 클릭 핸들러
  const handleDelete = useCallback(() => {
    if (file) {
      formData.delete(file.name);
      setDatas((current) => {
        return current?.filter((data) => {
          if (data.name === file.name) {
            return false;
          }
          return true;
        });
      });
    }
  }, [file, formData, setDatas]);

  useEffect(() => {
    if (file) {
      setImg(file);
      return;
    }
    setImgSrc("");
  }, [file, setImg]);

  // const buttonStyleClassName = useMemo(() => {
  //   return clsx(
  //     buttonStyle.Button,
  //     size === "primary" ? buttonStyle.PrimarySize : buttonStyle.SmallSize,
  //     file ? buttonStyle.HasImgStyle : buttonStyle.NoImgStyle
  //   );
  // }, [size, file]);
  return (
    <label className={"w-fit block"}>
      <input
        accept=".jpg, .jpeg, .png"
        className="hidden"
        onChange={handleChange}
        type="file"
        alt="inputImage"
        form="ImageListInputForm"
      />
      <div>
        <ImagePlaceholder
          src={imgSrc ? imgSrc : "./BG.png"}
          alt="placeHolder"
          fill={!!file}
        />
        {file && (
          <HiOutlinePencilAlt
            size={size === "primary" ? 48 : 30}
            className={"text-neutral-300"}
          />
        )}
        {file && (
          <Button
            className={"absolute top-[-1rem] left-[108px] "}
            color="Primary"
            size="xs"
            onClick={handleDelete}
            icon={{ type: "Only", element: <HiOutlineX /> }}
          ></Button>
        )}
      </div>
    </label>
  );
};
