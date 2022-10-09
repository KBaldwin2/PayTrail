import { Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { HStack, Icon, Pressable, VStack } from "native-base";
import { useEffect, useState } from "react";
import { FileCategoryEnum } from "../../../../../../models/fileDetail";
import { useAdsDelete } from "../../../../../../services/ads/mutations/useAdsDelete";
import { useAdsMoveToReceipt } from "../../../../../../services/ads/mutations/useAdsMoveToReceipt";
import * as FileSystem from "expo-file-system";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

interface IProps {
  adId: string;
  onClose: () => void;
  fileCategory: FileCategoryEnum;
  imagePath: string;
  fileName: string;
}

export const AdListActions = ({
  adId,
  onClose,
  fileCategory,
  imagePath,
  fileName,
}: IProps) => {
  const deleteAd = useAdsDelete();
  const moveToReceipt = useAdsMoveToReceipt();

  const onDelete = async () => {
    onClose();
    try {
      await deleteAd.mutateAsync(adId);
    } catch (e) {
      console.error(e);
    }
  };

  const onMoveToReceipt = async () => {
    onClose();
    try {
      await moveToReceipt.mutateAsync(adId);
    } catch (e) {
      console.error(e);
    }
  };

  const onDownload = async () => {
    if (fileCategory === FileCategoryEnum.HTML) {
      try {
        let response = await fetch(imagePath!);
        const { uri } = await Print.printToFileAsync({
          html: await response.text(),
        });
        Sharing.shareAsync(uri, {
          UTI: ".pdf",
          mimeType: "application/pdf",
        });
      } catch (e) {
        console.log("ERROR", e);
      }
    } else if (fileCategory === FileCategoryEnum.PDF) {
      try {
        const downloadPath = `${FileSystem.cacheDirectory}${
          fileName ?? "receipt.pdf"
        }`;
        // 1 - download the file to a local cache directory
        const { uri: localUrl } = await FileSystem.downloadAsync(
          imagePath!,
          downloadPath
        );
        Sharing.shareAsync(localUrl);
      } catch (e) {
        console.log("ERROR", e);
      }
    }
  };

  return (
    <HStack flex="1" justifyContent="flex-end" pl="2">
      <Pressable
        w="60"
        bg="primary.500"
        justifyContent="center"
        onPress={onDownload}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <Icon as={<Feather name="share" />} color="white" size="sm" />
        </VStack>
      </Pressable>
      <Pressable
        w="60"
        bg="gray.200"
        justifyContent="center"
        onPress={onMoveToReceipt}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <Icon pl="2px" as={FontAwesome5} name="receipt" size="sm" />
        </VStack>
      </Pressable>
      <Pressable
        w="60"
        bg="red.500"
        justifyContent="center"
        onPress={onDelete}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <Icon as={<MaterialIcons name="delete" />} color="white" size="sm" />
        </VStack>
      </Pressable>
    </HStack>
  );
};
