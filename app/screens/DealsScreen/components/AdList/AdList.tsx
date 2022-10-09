import { format, subWeeks } from "date-fns";
import { Box, Text, useDisclose } from "native-base";
import { useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { IAdByStore } from "../..";
import { FileViewer } from "../../../../components/FileViewer";
import settings from "../../../../config/settings";
import { IAd } from "../../../../models/ad";
import { useAdsSetToRead } from "../../../../services/ads/mutations/useAdsSetToRead";
import { AdListActions } from "./components/AdListActions";
import { AdListItem } from "./components/AdListItem";
import { AdListSectionHeader } from "./components/AdListSectionHeader";
import * as Sharing from "expo-sharing";

interface IProps {
  data: IAdByStore[];
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const AdList = ({ data, onRefresh, isRefreshing }: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [selectedAd, setSelectedAd] = useState<IAd | undefined>(undefined);
  const setAdsToRead = useAdsSetToRead();

  const [isSharingAvailable, setSharingAvailable] = useState<boolean>(false);

  useEffect(() => {
    const checkSharingAvailability = async () => {
      const isAvailable = await Sharing.isAvailableAsync();
      setSharingAvailable(isAvailable);
    };

    checkSharingAvailability();
  }, []);

  const onViewAd = (ad: IAd) => {
    if (!ad.hasViewed) {
      try {
        setAdsToRead.mutateAsync(ad.id!);
      } catch (err) {
        console.error(err);
      }
    }
    setSelectedAd(ad);
    onOpen();
  };

  const handleClose = () => {
    onClose();
    setSelectedAd(undefined);
  };

  return (
    <>
      <Box
        mx={2}
        p={4}
        pb={4}
        backgroundColor="primary.800"
        borderRadius="10px"
        mb={2}
      >
        <Text color="white">Find all deals from stores you shop at.</Text>
        <Text color="white">
          We automatically purge everything older than{" "}
          <Text fontWeight="700" color="white">
            2 weeks.
          </Text>
        </Text>
        <Text mt={1} textAlign="right" color="white">
          Last purge:{" "}
          <Text fontWeight="700" color="white">
            {format(subWeeks(new Date(), 2), "PP")}
          </Text>
        </Text>
      </Box>
      <Box flex={1}>
        <SwipeListView
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
          useSectionList
          stickySectionHeadersEnabled
          renderSectionHeader={({ section }) => (
            <AdListSectionHeader store={section.store} />
          )}
          keyExtractor={(item) => item.id!}
          contentContainerStyle={{ paddingBottom: 20 }}
          sections={data}
          renderItem={(data, rowMap) => (
            <AdListItem onViewAdd={onViewAd} ad={data.item} />
          )}
          renderHiddenItem={(data, rowMap) => (
            <AdListActions
              adId={data.item.id!}
              imagePath={`${settings.apiUrl}/ads/${data.item.id}/file`}
              fileCategory={data.item.fileDetail!.fileCategory}
              fileName={data.item.fileDetail!.fileName ?? "receipt.pdf"}
              onClose={() => {
                if (rowMap[data.item.id!]) {
                  rowMap[data.item.id!].closeRow();
                }
              }}
            />
          )}
          previewOpenDelay={2500}
          previewOpenValue={-40}
          rightOpenValue={isSharingAvailable ? -180 : -120}
        />
      </Box>
      {selectedAd && (
        <FileViewer
          isOpen={isOpen}
          onClose={handleClose}
          fileCategory={selectedAd.fileDetail!.fileCategory}
          imagePath={`${settings.apiUrl}/ads/${selectedAd.id}/file`}
        />
      )}
    </>
  );
};
