import { Ionicons } from "@expo/vector-icons";
import { Box, Flex, Icon, IconButton, Image, Modal } from "native-base";
import { Dimensions } from "react-native";
import WebView from "react-native-webview";
import { FileCategoryEnum } from "../../models/fileDetail";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface IProps {
  fileCategory: FileCategoryEnum;
  imagePath: string;
  isOpen: boolean;
  onClose: () => void;
}

export const FileViewer = ({
  fileCategory,
  imagePath,
  isOpen,
  onClose,
}: IProps) => {
  if (fileCategory === FileCategoryEnum.IMAGE) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <Box
          style={{
            height: windowHeight,
            width: windowWidth,
            flex: 1,
            flexDirection: "column",
          }}
        >
          <IconButton
            position="absolute"
            top="30px"
            right="20px"
            zIndex={9999}
            onPress={onClose}
            color="black"
            width="40px"
            height="40px"
            icon={<Icon as={Ionicons} name="close-sharp" />}
          />
          <Flex
            backgroundColor="rgb(242, 242, 246)"
            height="65px"
            width="100%"
          />
          <Flex backgroundColor="rgb(242, 242, 246)" height="100%" width="100%">
            <ReactNativeZoomableView
              maxZoom={30}
              minZoom={1}
              zoomStep={0.5}
              initialZoom={1}
              bindToBorders={true}
              style={{ zIndex: 99999 }}
            >
              <Image
                alt="image"
                source={{ uri: imagePath }}
                style={{ width: "100%", height: "100%", resizeMode: "contain" }}
              />
            </ReactNativeZoomableView>
          </Flex>
        </Box>
      </Modal>
    );
  }

  if (fileCategory === FileCategoryEnum.HTML) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <Box
          style={{
            height: windowHeight,
            width: windowWidth,
            flex: 1,
            flexDirection: "column",
          }}
        >
          <IconButton
            position="absolute"
            top="30px"
            right="20px"
            zIndex={9999}
            onPress={onClose}
            color="black"
            width="40px"
            height="40px"
            icon={<Icon as={Ionicons} name="close-sharp" />}
          />
          <Flex
            backgroundColor="rgb(242, 242, 246)"
            height="70px"
            width="100%"
          ></Flex>
          <WebView
            onMessage={(event) => {}}
            injectedJavaScript={`
                        let insert = false;
                        let meta = document.querySelector('meta[name="viewport"]');
                        if(!meta) {
                          insert = true;
                          meta = document.createElement('meta');
                          meta.setAttribute('name', 'viewport');
                        }
                        meta.setAttribute('content', 'width=device-width, initial-scale=1');
      
                        if(insert) {
                          document.getElementsByTagName('head')[0].appendChild(meta);
                        } 
                      `}
            scalesPageToFit={false}
            style={{ flex: 1 }}
            // @ts-ignore
            source={{
              uri: imagePath,
            }}
          />
        </Box>
      </Modal>
    );
  }
  if (fileCategory === FileCategoryEnum.PDF) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <Box
          style={{
            height: windowHeight,
            width: windowWidth,
            flex: 1,
            flexDirection: "column",
          }}
        >
          <IconButton
            position="absolute"
            top="30px"
            right="20px"
            zIndex={9999}
            onPress={onClose}
            color="black"
            width="40px"
            height="40px"
            icon={<Icon as={Ionicons} name="close-sharp" />}
          />
          <Flex
            backgroundColor="rgb(242, 242, 246)"
            height="65px"
            width="100%"
          ></Flex>
          <WebView
            javaScriptEnabled={true}
            style={{ flex: 1 }}
            // @ts-ignore
            source={{ uri: imagePath }}
          />
        </Box>
      </Modal>
    );
  }

  return null;
};
