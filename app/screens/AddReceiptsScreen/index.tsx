import {
  CompositeNavigationProp,
  StackActions,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { Flex } from "native-base";
import React, { useEffect, useState } from "react";
import { ReceiptsParamList, RootStackParamList } from "../../../types";
import { IAddFile } from "../../api/receipts/receiptAddFileDetail";
import { ICreateReceipt } from "../../api/receipts/receiptsPost";
import { IUpdateReceipt } from "../../api/receipts/receiptsPut";
import { IReceipt } from "../../models/receipt";
import { useReceiptAddFileDetail } from "../../services/receipts/mutations/useReceiptAddFileDetail";
import { useReceiptDeleteFileDetail } from "../../services/receipts/mutations/useReceiptDeleteFileDetail";
import { useReceiptsPost } from "../../services/receipts/mutations/useReceiptsPost";
import { useReceiptsPut } from "../../services/receipts/mutations/useReceiptsPut";
import { ReceiptForm } from "./components/ReceiptForm/ReceiptForm";
import { ViewReceipt } from "./components/ViewReceipt";

type Props = StackScreenProps<ReceiptsParamList, "AddReceiptsScreen">;
type addReceiptsScreenProps = CompositeNavigationProp<
  StackNavigationProp<ReceiptsParamList, "AddReceiptsScreen">,
  StackNavigationProp<RootStackParamList>
>;

export default function AddReceiptsScreen({ route }: Props) {
  const { imgUri, receipt, initView } = route.params || {};
  const [isView, setView] = useState<boolean>(initView ?? false);
  const receiptsPost = useReceiptsPost();
  const receiptsPut = useReceiptsPut();
  const receiptDeleteFileDetail = useReceiptDeleteFileDetail();
  const receiptAddFileDetail = useReceiptAddFileDetail();
  const navigation = useNavigation<addReceiptsScreenProps>();

  useEffect(() => {
    navigation.setOptions({
      title: receipt ? (isView ? "Receipt" : "Edit Receipt") : "Add Receipt",
    });
  }, [receipt, isView]);

  const onSubmit = async (values: ICreateReceipt) => {
    if (receipt?.id) {
      let updateReceipt: IUpdateReceipt = {
        id: receipt.id!,
        date: values.date!,
        ...values,
      };
      await receiptsPut.mutateAsync(updateReceipt);
    } else {
      await receiptsPost.mutateAsync(values as ICreateReceipt);
    }
    navigation.navigate("ReceiptsScreen");
  };

  const onDeleteImage = async () => {
    receiptDeleteFileDetail.mutateAsync(receipt?.id!);
  };

  return (
    <Flex pt={4} flex={1} backgroundColor="white">
      {isView && receipt ? (
        <ViewReceipt
          onEdit={() => setView(false)}
          onDeleteSuccess={() => navigation.navigate("ReceiptsScreen")}
          receipt={receipt}
        />
      ) : (
        <ReceiptForm
          onDeleteImage={onDeleteImage}
          existingReceipt={receipt}
          isLoading={receiptsPost.isLoading}
          error={receiptsPost.error ?? ""}
          onSubmit={onSubmit}
          newImage={imgUri}
          onAddImage={(values: any) =>
            navigation.navigate("ScanReceiptsScreen", { receipt: values })
          }
          onBack={() =>
            // @ts-ignore
            receipt?.id ? setView(true) : navigation.navigate("Home")
          }
          onUploadImage={async (id: string, fileDetail: string) =>
            await receiptAddFileDetail.mutateAsync({
              id,
              fileDetail,
            } as IAddFile)
          }
        />
      )}
    </Flex>
  );
}
