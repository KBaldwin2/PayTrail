import React from "react";
import { useFormikContext } from "formik";
import ImageInputList from "../ImageInputList";
import { ErrorMessage } from "./ErrorMessage";

interface FormImagePickerProps {
  name: string;
}

function FormImagePicker({ name }: FormImagePickerProps) {
  const { errors, setFieldValue, touched, values } =
    useFormikContext<{ [key: string]: string | string[] }>();
  const imageUris = values[name];

  const handleAdd = (uri: string | null): void => {
    setFieldValue(name, [...imageUris, uri]);
  };

  const handleRemove = (uri: string | null): void => {
    setFieldValue(
      name,
      (imageUris as string[]).filter((imageUri: string) => imageUri !== uri)
    );
  };

  return (
    <>
      <ImageInputList
        imageUris={imageUris as string[]}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormImagePicker;
