import { Box, Flex, Heading } from "native-base";
import { useEffect, useCallback, useState } from "react";
import { CenteredLoadingIndicator } from "../../components/LoadingIndicator/CenteredLoadingIndicator";
import Screen from "../../components/Screen";
import { ServerError } from "../../components/ServerError/ServerError";
import { IAd } from "../../models/ad";
import { useAdsGetAll } from "../../services/ads/queries/useAdsGetAll";
import { AdList } from "./components/AdList";
import { EmptyAdsList } from "./components/EmptyAdsList";

export interface IAdByStore {
  store: string;
  key: string;
  data: IAd[];
}

export default function DealsScreen() {
  const [adsByStore, setAdsByStore] = useState<IAdByStore[]>([]);
  const [manualRefetch, setManualRefetch] = useState<boolean>(false);
  const { isLoadingAds, ads, errorAds, refetch, isRefetching } = useAdsGetAll();

  const onRefresh = useCallback(() => {
    setManualRefetch(true);
    refetch();
  }, []);

  useEffect(() => {
    if (!isRefetching) {
      setManualRefetch(false);
    }
  }, [isRefetching]);

  useEffect(() => {
    let groupedAds = (ads ?? []).reduce((acc, curr) => {
      let store = curr.store ?? "Unknown";
      let found = acc.find((x) => x.store === store);
      if (found) {
        found.data.push(curr);
      } else {
        acc.push({
          store,
          key: store,
          data: [curr],
        });
      }
      return acc;
    }, [] as IAdByStore[]);
    setAdsByStore(groupedAds);
  }, [ads]);

  return (
    <Screen>
      {isLoadingAds ? (
        <CenteredLoadingIndicator />
      ) : errorAds ? (
        <ServerError message={errorAds} />
      ) : !(ads ?? []).length ? (
        <EmptyAdsList />
      ) : (
        <Box flex={1} mt={4}>
          <AdList
            isRefreshing={manualRefetch}
            data={adsByStore}
            onRefresh={onRefresh}
          />
        </Box>
      )}
    </Screen>
  );
}
