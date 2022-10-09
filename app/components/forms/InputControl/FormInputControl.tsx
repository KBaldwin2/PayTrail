import { useField } from "formik";
import {
  FormControl,
  IInputProps,
  InputGroup,
  InputLeftAddon,
  Text,
} from "native-base";
import React, { useEffect } from "react";
import { InputControl } from ".";

type FormFieldProps = IInputProps & {
  name: string;
  label?: string;
  helperText?: string;
};

const currencyFormatted = (value: string = "") => {
  // Replace all non-numeric characters
  let replace = `${value}`.replace(/[^\d.]/g, "");
  // Split all dots (in case there are more than one)
  const split = replace.split(".");
  // join all after the first dot
  const merged = [split[0], split.slice(1).join("")].join(".");
  // @ts-ignore
  return parseFloat(merged).toFixed(2);
};

export const FormInputControl = ({
  name,
  label,
  width,
  type = "text",
  size = "md",
  helperText,
  ...otherProps
}: FormFieldProps) => {
  const [field, meta, helpers] = useField(name);

  const handleInputBlur = () => {
    if (type === "currency") {
      const rounded = currencyFormatted(field.value);
      helpers.setValue(rounded);
    }

    helpers.setTouched(true);
  };

  useEffect(() => {
    if (type === "currency" && field.value) {
      const rounded = currencyFormatted(field.value);
      helpers.setValue(rounded);
    }
  }, []);

  return (
    <FormControl isInvalid={!!(meta.error && meta.touched)}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      {type === "currency" ? (
        <InputGroup width="100%">
          <InputLeftAddon
            borderLeftRadius="md"
            width="44px"
            backgroundColor="primary.800"
            borderColor="input.borderColor"
          >
            <Text color="white" fontSize="md" fontWeight="500">
              $
            </Text>
          </InputLeftAddon>
          <InputControl
            size={size}
            onBlur={handleInputBlur}
            onChangeText={helpers.setValue}
            keyboardType="decimal-pad"
            value={`${field.value}`}
            width={width}
            {...otherProps}
          />
        </InputGroup>
      ) : type === "email" ? (
        <InputControl
          flexGrow={1}
          type="email"
          autoCapitalize="none"
          autoCompleteType="email"
          autoCorrect={false}
          textContentType="emailAddress"
          keyboardType="email-address"
          size={size}
          onBlur={handleInputBlur}
          value={field.value}
          onChangeText={helpers.setValue}
          {...otherProps}
        />
      ) : type === "password" ? (
        <InputControl
          secureTextEntry
          textContentType="password"
          autoCapitalize="none"
          autoCorrect={false}
          size={size}
          onBlur={handleInputBlur}
          onChangeText={helpers.setValue}
          value={field.value}
          width={width}
          {...otherProps}
        />
      ) : (
        <InputControl
          size={size}
          onBlur={handleInputBlur}
          onChangeText={helpers.setValue}
          value={type === "number" ? "" + field.value : field.value}
          width={width}
          {...otherProps}
        />
      )}
      <FormControl.ErrorMessage>{meta.error}</FormControl.ErrorMessage>
      {helperText && (
        <FormControl.HelperText>{helperText}</FormControl.HelperText>
      )}
    </FormControl>
  );
};
