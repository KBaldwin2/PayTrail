import { useField } from "formik";
import { FormControl, TextArea as NBTextArea } from "native-base";
import { ITextAreaProps } from "native-base/lib/typescript/components/primitives/TextArea";

interface TextAreaProps extends ITextAreaProps {
  name: string;
  label?: string;
}

export const FormTextArea = ({ name, label, ...props }: TextAreaProps) => {
  const [field, meta, helpers] = useField(name);

  const handleInputChange = (text: string | undefined) => {
    helpers.setValue(text ?? "");
  };

  return (
    <FormControl isInvalid={!!(meta.error && meta.touched)}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      <NBTextArea
        onChangeText={handleInputChange}
        onBlur={() => helpers.setTouched(true)}
        {...props}
      />
    </FormControl>
  );
};
