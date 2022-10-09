import * as FileSystem from "expo-file-system";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import {
  AddIcon,
  Box,
  Center,
  Circle,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  SmallCloseIcon,
  Stack,
  Text,
  useDisclose,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Button } from "../../../../components/Button";
import { FileViewer } from "../../../../components/FileViewer";
import { FileCategoryEnum, IFileDetail } from "../../../../models/fileDetail";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import { Alert, Pressable } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useToast } from "native-base";

interface IProps {
  fileDetail?: IFileDetail;
  imagePath?: string;
  onRemove?: () => void;
  onAdd?: () => void;
}

export const ImagePreview = ({
  fileDetail,
  imagePath,
  onRemove,
  onAdd,
}: IProps) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isSharingAvailable, setSharingAvailable] = useState<boolean>(false);

  useEffect(() => {
    const checkSharingAvailability = async () => {
      const isAvailable = await Sharing.isAvailableAsync();
      setSharingAvailable(isAvailable);
    };

    checkSharingAvailability();
  }, []);

  if (
    (!fileDetail || fileDetail.fileCategory === FileCategoryEnum.IMAGE) &&
    imagePath
  ) {
    return (
      <>
        <FileViewer
          isOpen={isOpen}
          onClose={onClose}
          fileCategory={FileCategoryEnum.IMAGE}
          imagePath={imagePath!}
        />
        <Flex alignItems="flex-start">
          <Stack space={2}>
            <Pressable onPress={onOpen}>
              <Box position="relative">
                <Image
                  alt="Scanned Receipt"
                  source={{ uri: imagePath }}
                  resizeMode={"cover"}
                  width="100px"
                  height="100px"
                />

                {onRemove && (
                  <IconButton
                    rounded="full"
                    backgroundColor="primary.800"
                    position="absolute"
                    top="-5px"
                    right="50px"
                    height="25px"
                    width="25px"
                    onPress={onRemove}
                    icon={<SmallCloseIcon color="white" size={5} />}
                  />
                )}
              </Box>
            </Pressable>
            <HStack space={4}>
              <Button
                isLoading={isLoading}
                variant="secondary"
                onPress={async () => {
                  if (imagePath.startsWith("http")) {
                    setLoading(true);
                    let fileLocation =
                      FileSystem!.documentDirectory! + fileDetail?.fileName ??
                      "temp";
                    FileSystem.downloadAsync(imagePath, fileLocation)
                      .then(async ({ uri }) => {
                        // Saving the file in a folder name `PayTrail Receipts`
                        const { status } = await Permissions.askAsync(
                          Permissions.MEDIA_LIBRARY
                        );
                        if (status === "granted") {
                          const asset = await MediaLibrary.createAssetAsync(
                            uri
                          );
                          await MediaLibrary.createAlbumAsync(
                            "PayTrail",
                            asset,
                            false
                          );
                          toast.show({
                            render: () => {
                              return (
                                <Box
                                  bg="primary.800"
                                  px="2"
                                  py="1"
                                  rounded="sm"
                                  mb={5}
                                >
                                  Receipt Saved!
                                </Box>
                              );
                            },
                          });
                        } else {
                          Alert.alert(
                            "Permission required",
                            "To be able to download Images, you need to allow access to your media library."
                          );
                        }
                      })
                      .catch((error) => {
                        console.error(error);
                        setLoading(false);
                      })
                      .finally(() => {
                        setLoading(false);
                      });
                  } else {
                    const { status } = await Permissions.askAsync(
                      Permissions.MEDIA_LIBRARY
                    );
                    if (status === "granted") {
                      const asset = await MediaLibrary.createAssetAsync(
                        imagePath
                      );
                      await MediaLibrary.createAlbumAsync(
                        "PayTrail",
                        asset,
                        false
                      );
                      toast.show({
                        render: () => {
                          return (
                            <Box
                              bg="primary.800"
                              px="2"
                              py="1"
                              rounded="sm"
                              mb={5}
                            >
                              Receipt Saved!
                            </Box>
                          );
                        },
                      });
                    } else {
                      Alert.alert(
                        "Permission required",
                        "To be able to download Images, you need to allow access to your media library."
                      );
                    }
                  }
                }}
              >
                Download
              </Button>

              {isSharingAvailable && (
                <IconButton
                  variant="outline"
                  borderColor="primary.800"
                  onPress={async () => {
                    if (imagePath.startsWith("http")) {
                      setLoading(true);
                      let fileLocation =
                        FileSystem!.documentDirectory! + fileDetail?.fileName ??
                        "temp";
                      FileSystem.downloadAsync(imagePath, fileLocation)
                        .then(async ({ uri }) => {
                          // Saving the file in a folder name `PayTrail Receipts`
                          const { status } = await Permissions.askAsync(
                            Permissions.MEDIA_LIBRARY
                          );
                          if (status === "granted") {
                            const asset = await MediaLibrary.createAssetAsync(
                              uri
                            );
                            await MediaLibrary.createAlbumAsync(
                              "PayTrail",
                              asset,
                              false
                            );
                            await Sharing.shareAsync(fileLocation);
                          } else {
                            Alert.alert(
                              "Permission required",
                              "To be able to download Images, you need to allow access to your media library."
                            );
                          }
                        })
                        .catch((error) => {
                          console.error(error);
                          setLoading(false);
                        })
                        .finally(() => {
                          setLoading(false);
                        });
                    } else {
                      await Sharing.shareAsync(imagePath);
                    }
                  }}
                  icon={
                    <Icon
                      as={<AntDesign name="sharealt" />}
                      color="primary.800"
                      size="sm"
                    />
                  }
                />
              )}
            </HStack>
          </Stack>
        </Flex>
      </>
    );
  } else {
    switch (fileDetail?.fileCategory) {
      case FileCategoryEnum.HTML:
        return (
          <>
            <Center>
              <Stack space={2}>
                <Button variant="primary" onPress={onOpen}>
                  View Email Receipt
                </Button>
                {isSharingAvailable && (
                  <Button
                    variant="secondary"
                    onPress={async () => {
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
                    }}
                  >
                    Download
                  </Button>
                )}
              </Stack>
            </Center>
            <FileViewer
              isOpen={isOpen}
              onClose={onClose}
              fileCategory={FileCategoryEnum.HTML}
              imagePath={imagePath!}
            />
          </>
        );
      case FileCategoryEnum.PDF:
        return (
          <>
            <Center>
              <Stack space={2}>
                <Button variant="primary" onPress={onOpen}>
                  View Receipt PDF
                </Button>
                {isSharingAvailable && (
                  <Button
                    variant="secondary"
                    onPress={async () => {
                      try {
                        const downloadPath = `${FileSystem.cacheDirectory}${
                          fileDetail.fileName ?? "receipt.pdf"
                        }`;
                        // 1 - download the file to a local cache directory
                        const { uri: localUrl } =
                          await FileSystem.downloadAsync(
                            imagePath!,
                            downloadPath
                          );
                        Sharing.shareAsync(localUrl);
                      } catch (e) {
                        console.log("ERROR", e);
                      }
                    }}
                  >
                    Download
                  </Button>
                )}
              </Stack>
            </Center>
            <FileViewer
              isOpen={isOpen}
              onClose={onClose}
              fileCategory={FileCategoryEnum.PDF}
              imagePath={imagePath!}
            />
          </>
        );
    }
  }

  return (
    <>
      {onAdd ? (
        <IconButton
          onPress={onAdd}
          backgroundColor="input.bgColor"
          padding={4}
          height="100px"
          width="100px"
          borderColor="input.borderColor"
          borderWidth="1px"
          borderRadius="md"
          icon={
            <Circle backgroundColor="primary.800" p={3}>
              <AddIcon size={5} color="white" />
            </Circle>
          }
        />
      ) : (
        <Text>-</Text>
      )}
    </>
  );
};
