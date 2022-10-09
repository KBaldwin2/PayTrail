import { useField } from "formik";
import { CheckboxControl, CheckboxControlProps } from "./CheckboxControl";

const isChecked = (formValue: any, fieldValue: any) => {
  let checked;
  if (formValue instanceof Array) {
    checked = formValue.includes(fieldValue);
  } else {
    checked = formValue;
  }
  return checked;
};

export type FormCheckboxControlProps = Overwrite<
  CheckboxControlProps,
  {
    name: string;
    value?: any;
  }
>;

export const FormCheckboxControl = (props: FormCheckboxControlProps) => {
  const { name, children, ...rest } = props;
  const [field, meta, helpers] = useField(name);

  return (
    <CheckboxControl
      isInvalid={!!meta.error && meta.touched}
      isChecked={isChecked(field.value, props.value)}
      name={name}
      onChange={() => helpers.setValue(!field.value)}
      value={field.value}
      {...rest}
    >
      {children}
    </CheckboxControl>
  );
};
