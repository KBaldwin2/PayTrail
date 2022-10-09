import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { isSameMonth } from "date-fns";
import { matchSorter } from "match-sorter";
import {
  Actionsheet,
  Box,
  ChevronDownIcon,
  Flex,
  Icon,
  IconButton,
  Pressable,
  ScrollView,
  Text,
  useDisclose,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Dimensions, RefreshControl } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { Button } from "../../../../components/Button";
import { CenteredLoadingIndicator } from "../../../../components/LoadingIndicator/CenteredLoadingIndicator";
import { SearchInput } from "../../../../components/SearchInput/SearchInput";
import { ServerError } from "../../../../components/ServerError/ServerError";
import { IReceipt } from "../../../../models/receipt";
import { IReceiptCategory } from "../../../../models/receiptCategory";
import { useReceiptCategoriesGetAll } from "../../../../services/receiptCategories/queries/useReceiptCategoriesGetAll";
import { useReceiptsGetAll } from "../../../../services/receipts/queries/useReceiptsGetAll";
import { EmptyReceiptList } from "./components/EmptyReceiptList";
import { ItemIcon } from "./components/ItemIcon";
import { ReceiptListActions } from "./components/ReceiptListActions/ReceiptListActions";
import { ReceiptListItem } from "./components/ReceiptListItem/ReceiptListItem";
import { ReceiptListSectionHeader } from "./components/ReceiptListSectionHeader";

const windowHeight = Dimensions.get("window").height;

interface IReceiptByDate {
  date: string;
  data: IReceipt[];
  total: number;
  key: string;
}

interface IProps {
  onAddReceipt: () => void;
  onViewReceipt: (receipt: IReceipt) => void;
}

export const ReceiptList = ({ onAddReceipt, onViewReceipt }: IProps) => {
  const [search, setSearch] = useState<string>("");
  const [filteredReceipts, setFilteredReceipts] = useState<IReceiptByDate[]>(
    []
  );
  const [filterCategories, setFilterCategories] = useState<IReceiptCategory[]>(
    []
  );
  const [manualRefetch, setManualRefetch] = useState<boolean>(false);

  const { isLoadingReceipts, receipts, errorReceipts, refetch, isRefetching } =
    useReceiptsGetAll();

  const selectedCategoriesCount = (filterCategories ?? []).length;

  const {
    isLoadingReceiptCategories,
    receiptCategories,
    errorReceiptCategories,
  } = useReceiptCategoriesGetAll();

  const [showSearchInput, setShowSearchInput] = useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useDisclose();

  const onRefresh = () => {
    setManualRefetch(true);
    refetch();
  };

  useEffect(() => {
    if (!isRefetching) {
      setManualRefetch(false);
    }
  }, [isRefetching]);

  useEffect(() => {
    let filteredReceipts: IReceipt[] = [];
    if (search) {
      filteredReceipts = matchSorter(receipts ?? [], search, {
        keys: ["total", "store"],
      });
    } else {
      filteredReceipts = (receipts ?? []).sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }

    if (filterCategories.length > 0) {
      filteredReceipts = filteredReceipts.filter((x) =>
        filterCategories.find((y) => y.id === x.receiptCategoryId)
      );
    }

    let groupedFilteredReceipts = filteredReceipts.reduce((acc, curr) => {
      let found = acc.find((item) =>
        isSameMonth(new Date(item.date), new Date(curr.date))
      );
      if (found) {
        found.data.push(curr);
        found.total += curr.total ?? 0;
      } else {
        acc.push({
          key: curr.date,
          date: curr.date,
          data: [curr],
          total: curr.total ?? 0,
        });
      }
      return acc;
    }, [] as IReceiptByDate[]);
    setFilteredReceipts(groupedFilteredReceipts);
  }, [receipts, search, filterCategories]);

  if (isLoadingReceipts) {
    return <CenteredLoadingIndicator />;
  }

  if (errorReceipts) {
    return <ServerError message={errorReceipts} />;
  }

  if (!(receipts ?? []).length) {
    return <EmptyReceiptList onAddReceipt={onAddReceipt} />;
  }

  return (
    <>
      <Flex height="100%">
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
          ml={2}
        >
          {filterCategories.length ? (
            <Button variant="primary" width="100px" onPress={onOpen}>
              <Box display="flex" alignItems="center" flexDirection="row">
                <Text color="white">Filter ({selectedCategoriesCount})</Text>{" "}
                <ChevronDownIcon size={5} color="white" />
              </Box>
            </Button>
          ) : (
            <Button variant="secondary" width="100px" onPress={onOpen}>
              <Box display="flex" alignItems="center" flexDirection="row">
                <Text color="green.800">Filter</Text>{" "}
                <ChevronDownIcon size={5} color="green.800" />
              </Box>
            </Button>
          )}
          <Box flexGrow={1}>
            {showSearchInput && (
              <SearchInput ml={2} onChangeText={setSearch} value={search} />
            )}
          </Box>
          {!showSearchInput ? (
            <IconButton
              onPress={() => {
                setShowSearchInput(true);
              }}
              width="44px"
              height="44px"
              mx={2}
              icon={
                <Icon
                  as={<Feather name="search" />}
                  size={5}
                  color="gray.500"
                  mx={4}
                />
              }
            />
          ) : (
            <Button
              ml={2}
              variant="ghost"
              onPress={() => {
                setShowSearchInput(false);
                setSearch("");
              }}
            >
              cancel
            </Button>
          )}
        </Flex>

        <Box flex={1}>
          <SwipeListView
            refreshControl={
              <RefreshControl
                refreshing={manualRefetch}
                onRefresh={onRefresh}
              />
            }
            useSectionList
            stickySectionHeadersEnabled
            renderSectionHeader={({ section }) => (
              <ReceiptListSectionHeader
                date={section.date}
                total={section.total}
              />
            )}
            keyExtractor={(item) => item.id!}
            contentContainerStyle={{ paddingBottom: 20 }}
            sections={filteredReceipts}
            renderItem={(data, rowMap) => (
              <ReceiptListItem
                onViewReceipt={onViewReceipt}
                receipt={data.item}
              />
            )}
            renderHiddenItem={(data, rowMap) => (
              <ReceiptListActions
                receiptId={data.item.id!}
                onClose={() => {
                  if (rowMap[data.item.id!]) {
                    rowMap[data.item.id!].closeRow();
                  }
                }}
              />
            )}
            previewOpenDelay={2500}
            previewOpenValue={-40}
            rightOpenValue={-60}
          />
        </Box>
      </Flex>
      <Actionsheet
        height="100%"
        maxHeight="100%"
        minH="100%"
        isOpen={isOpen}
        onClose={onClose}
        size="full"
      >
        <Actionsheet.Content height={windowHeight * 0.8}>
          {!!selectedCategoriesCount && (
            <Flex
              alignItems="center"
              width="100%"
              pl={4}
              pr={0}
              flexDirection="row"
              justifyContent="space-between"
            >
              <Text>
                {selectedCategoriesCount}{" "}
                {selectedCategoriesCount > 1 ? "categories" : "category"}{" "}
                selected
              </Text>
              <Button
                variant="ghost"
                onPress={() => {
                  setFilterCategories([]);
                  onClose();
                }}
              >
                clear
              </Button>
            </Flex>
          )}
          <ScrollView flex={1} width="100%">
            {(receiptCategories ?? [])
              .sort((a, b) => a.description.localeCompare(b.description))
              .map((x) => {
                const isChecked = !!filterCategories.find((y) => x.id === y.id);
                return (
                  <Pressable
                    key={x.id}
                    w="60"
                    justifyContent="center"
                    _pressed={{
                      bg: "gray.200",
                      opacity: 0.8,
                    }}
                    height="50px"
                    width="100%"
                    borderRadius="4px"
                    py={4}
                    px={2}
                    my={1}
                    onPress={() =>
                      setFilterCategories((prev) =>
                        isChecked
                          ? [...prev.filter((y) => y.id !== x.id)]
                          : [...prev, x]
                      )
                    }
                  >
                    <Flex
                      flexDirection="row"
                      justifyContent="space-between"
                      alignItems="center"
                      flexGrow={1}
                    >
                      <ItemIcon receiptCategory={x} />
                      <Text mx={4} flexGrow={1} fontSize="lg">
                        {x.description}
                      </Text>
                      {isChecked && (
                        <Icon
                          color="green.800"
                          as={FontAwesome5}
                          name="check-circle"
                          size={5}
                        />
                      )}
                    </Flex>
                  </Pressable>
                );
              })}
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};
