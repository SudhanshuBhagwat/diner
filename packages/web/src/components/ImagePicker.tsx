import React, { ChangeEvent, useState } from "react";

interface Props {
  children?: React.ReactNode;
  initialImage?: string;
  onChange: (url: string | undefined) => void;
}

const ImagePicker: React.FC<Props> = ({ initialImage, onChange }) => {
  const [dataURL, setDataURL] = useState<string | undefined>(initialImage);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    const reader = new FileReader();
    reader.readAsDataURL(file!);
    reader.onloadend = () => {
      setDataURL(reader.result?.toString());
      onChange(reader.result?.toString());
    };
  };

  return (
    <label htmlFor="filePicker" className="text-gray-400 font-semibold">
      <img
        src={dataURL}
        alt="Restaurant Image"
        className={`${!dataURL ? "hidden" : ""}`}
      />
      <div className="border-2 border-dashed h-48 w-full flex justify-center items-center">
        <input
          id="filePicker"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onChangeHandler}
        />
        Click to add image
      </div>
    </label>
  );
};

export default ImagePicker;
