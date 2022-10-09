import { useField } from "formik";
import { ToggleControl, ToggleControlProps } from ".";

const isChecked = (formValue: any, fieldValue: any) => {
  let checked;
  if (formValue instanceof Array) {
    checked = formValue.includes(fieldValue);
  } else {
    checked = formValue;
  }
  return checked;
};

export type FormToggleControlProps = Overwrite<
  ToggleControlProps,
  {
    name: string;
  }
>;

export const FormToggleControl = (props: FormToggleControlProps) => {
  const { name, children, ...rest } = props;
  const [field, meta, helpers] = useField(name);

  return (
    <ToggleControl
      offTrackColor="input.bgColor"
      isInvalid={!!meta.error && meta.touched}
      isChecked={isChecked(field.value, props.value)}
      name={name}
      onChange={() => helpers.setValue(!field.value)}
      {...rest}
    >
      {children}
    </ToggleControl>
  );
};
