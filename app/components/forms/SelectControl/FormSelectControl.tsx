import { useField } from "formik";
import {
  FormControl,
  Select,
  ISelectProps,
  ISelectItemProps,
} from "native-base";
import React from "react";

interface FormFieldProps extends ISelectProps {
  name: string;
  label?: string;
  options: ISelectItemProps[];
}

export const FormSelectControl = ({
  name,
  label,
  options,
  ...otherProps
}: FormFieldProps) => {
  const [field, meta, helpers] = useField(name);

  const handleInputChange = (text: string) => {
    helpers.setValue(text);
  };

  return (
    <FormControl isInvalid={!!(meta.initialValue && meta.error)}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      <Select
        size="md"
        variant="filled"
        onValueChange={handleInputChange}
        selectedValue={field.value}
        {...otherProps}
      >
        {options.map((option, index) => (
          <Select.Item
            label={option.label}
            value={option.value}
            key={`${option.value}${index}`}
          />
        ))}
      </Select>
      <FormControl.ErrorMessage>{meta.error}</FormControl.ErrorMessage>
    </FormControl>
  );
};
