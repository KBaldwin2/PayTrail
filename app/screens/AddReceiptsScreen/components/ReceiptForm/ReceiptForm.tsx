import { Formik } from "formik";
import { Alert, Box, Flex, FormControl, Stack, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { number, object, string } from "yup";
import { ICreateReceipt } from "../../../../api/receipts/receiptsPost";
import ActivityIndicator from "../../../../components/ActivityIndicator";
import { Button } from "../../../../components/Button";
import { DatePicker } from "../../../../components/DatePicker/DatePicker";
import { FormInputControl } from "../../../../components/forms/InputControl";
import { FormSelectControl } from "../../../../components/forms/SelectControl/FormSelectControl";
import { FormToggleControl } from "../../../../components/forms/Toggle";
import { KeyboardAvoidingWrapper } from "../../../../components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper";
import settings from "../../../../config/settings";
import { IReceipt } from "../../../../models/receipt";
import { useReceiptCategoriesGetAll } from "../../../../services/receiptCategories/queries/useReceiptCategoriesGetAll";
import { ImagePreview } from "../ImagePreview/ImagePreview";
import { WarrantyHandler } from "./components/WarrantyHandler";

interface IProps {
  existingReceipt?: IReceipt;
  onSubmit: (values: ICreateReceipt) => void;
  error: string;
  isLoading: boolean;
  newImage?: string | undefined;
  onAddImage: (values: IReceiptForm) => void;
  onDeleteImage: () => void;
  onUploadImage: (id: string, image: string) => void;
  onBack: () => void;
}

export interface IReceiptForm {
  date?: Date;
  store?: string;
  total?: number;
  receiptCategoryId?: string;
  hasWarranty: boolean;
  isLifetimeWarranty?: boolean;
  warrantyExpirationDate?: Date;
  memo?: string;
}

export const ReceiptForm = ({
  existingReceipt,
  newImage,
  onSubmit,
  error,
  isLoading,
  onAddImage,
  onDeleteImage,
  onUploadImage,
  onBack,
}: IProps) => {
  const {
    isLoadingReceiptCategories,
    receiptCategories,
    errorReceiptCategories,
  } = useReceiptCategoriesGetAll();

  const [imagePath, setImagePath] = useState<string | undefined>("");

  useEffect(() => {
    if (existingReceipt?.id && newImage) {
      onUploadImage(existingReceipt?.id, newImage);
    }
    setImagePath(
      newImage
        ? newImage
        : existingReceipt?.fileDetail
        ? `${settings.apiUrl}/receipts/${existingReceipt?.id}/fileDetail`
        : ""
    );
  }, [newImage, existingReceipt]);

  const removeImage = () => {
    setImagePath(undefined);

    if (!newImage) {
      onDeleteImage();
    }
  };

  const defaultCategory =
    (receiptCategories ?? []).find((x) => x.description === "Uncategorized")
      ?.id ?? "";

  return (
    <>
      <ActivityIndicator visible={isLoading || isLoadingReceiptCategories} />
      <KeyboardAvoidingWrapper>
        <>
          {!!error && (
            <Alert variant="top-accent" status={"error"} w="100%">
              <Alert.Icon />
              <Text>{error?.toString()}</Text>
            </Alert>
          )}
          <Formik
            enableReinitialize
            initialValues={
              {
                id: existingReceipt?.id ?? "",
                date: existingReceipt?.date
                  ? new Date(existingReceipt.date)
                  : new Date(),
                store: existingReceipt?.store ?? "",
                memo: existingReceipt?.memo ?? "",
                total:
                  typeof existingReceipt?.total !== "undefined"
                    ? existingReceipt.total
                    : 0,
                receiptCategoryId:
                  existingReceipt?.receiptCategoryId ?? defaultCategory,
                hasWarranty: existingReceipt?.hasWarranty ?? false,
                isLifetimeWarranty:
                  existingReceipt?.isLifetimeWarranty ?? false,
                warrantyExpirationDate: existingReceipt?.warrantyExpirationDate
                  ? new Date(existingReceipt.warrantyExpirationDate)
                  : undefined,
              } as IReceiptForm
            }
            validationSchema={object({
              store: string()
                .required("Store is required")
                .max(100, "Store can't be more than 100 characters"),
              total: number().max(
                1000000000,
                "Total can't exceed 1,000,000,000"
              ),
            })}
            onSubmit={(values) =>
              onSubmit({
                ...values,
                fileDetail: imagePath,
              })
            }
          >
            {({ handleSubmit, values, setFieldValue }) => (
              <>
                <WarrantyHandler />
                <Stack space={4} px={4} mb={10} display="flex">
                  <DatePicker
                    onDateSelected={(date) => setFieldValue("date", date)}
                    defaultDate={values.date}
                    label="Date"
                    maximumDate={new Date()}
                  />

                  <Flex width="100%">
                    <FormInputControl
                      flexGrow={1}
                      label="Total"
                      placeholder="Total"
                      name="total"
                      type="currency"
                    />
                  </Flex>

                  <FormInputControl
                    label="Store"
                    name="store"
                    placeholder="Superstore"
                  />
                  <FormSelectControl
                    label="Category"
                    name="receiptCategoryId"
                    options={(receiptCategories ?? [])
                      .sort((a, b) =>
                        a.description.localeCompare(b.description)
                      )
                      .map((x) => ({
                        label: x.description,
                        value: x.id,
                      }))}
                  />

                  <Flex
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Text>Warranty</Text>
                    <FormToggleControl name="hasWarranty" />
                  </Flex>
                  {values.hasWarranty && (
                    <Flex
                      alignItems="center"
                      flexDirection="row"
                      justifyContent="space-between"
                    >
                      <Text>Lifetime Warranty</Text>
                      <FormToggleControl name="isLifetimeWarranty" />
                    </Flex>
                  )}

                  {values.hasWarranty && !values.isLifetimeWarranty && (
                    <Flex>
                      <DatePicker
                        onDateSelected={(date) =>
                          setFieldValue("warrantyExpirationDate", date)
                        }
                        defaultDate={values.warrantyExpirationDate}
                        label="Warranty Expiration Date"
                      />
                    </Flex>
                  )}

                  <FormInputControl
                    label="Memo"
                    name="memo"
                    placeholder="A note to myself"
                  />

                  <Flex
                    w="100%"
                    flexDirection="row"
                    justifyContent="space-between"
                    mb={6}
                  >
                    <Box>
                      <FormControl>
                        <FormControl.Label>Attachments</FormControl.Label>
                        <ImagePreview
                          imagePath={imagePath}
                          fileDetail={existingReceipt?.fileDetail}
                          onRemove={removeImage}
                          onAdd={() => onAddImage(values)}
                        />
                      </FormControl>
                    </Box>
                  </Flex>

                  <Stack space={4} alignItems="center">
                    <Button
                      width="100%"
                      variant="primary"
                      isLoading={isLoading}
                      onPress={handleSubmit}
                    >
                      Save
                    </Button>
                    <Button width="100%" variant="secondary" onPress={onBack}>
                      Cancel
                    </Button>
                  </Stack>
                </Stack>
              </>
            )}
          </Formik>
        </>
      </KeyboardAvoidingWrapper>
    </>
  );
};
