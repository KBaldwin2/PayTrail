import { useFormikContext } from "formik";
import { useEffect } from "react";
import { IReceiptForm } from "../../ReceiptForm";

export const WarrantyHandler = () => {
  const { values, setFieldValue } = useFormikContext<IReceiptForm>();

  useEffect(() => {
    if (values.hasWarranty === false) {
      setFieldValue("isLifetimeWarranty", false);
      setFieldValue("warrantyExpirationDate", undefined);
    }
  }, [values.hasWarranty]);

  useEffect(() => {
    if (values.isLifetimeWarranty === true) {
      setFieldValue("warrantyExpirationDate", undefined);
    }
  }, [values.isLifetimeWarranty]);

  return <></>;
};
