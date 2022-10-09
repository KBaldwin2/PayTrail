import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { Button, Flex, Icon, IconButton } from "native-base";
import React, { useRef, useState } from "react";
import { Alert } from "react-native";
import useImagePicker from "../hooks/useImagePicker";
import { PicturePreview } from "./PicturePreview";
import * as Device from "expo-device";
import { ImageManipulator } from "expo-image-crop";

interface IProps {
  onUsePicture: (uri: string) => void;
  onCancel: () => void;
}

export const ScanReceipt = ({ onCancel, onUsePicture }: IProps) => {
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [isCameraReady, setIsCameraReady] = useState(!Device.isDevice);
  let cameraRef = useRef<Camera>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const { openImagePicker } = useImagePicker({
    onSelectImage: setCapturedImage,
  });
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(true);

  const onTakePicture = async () => {
    if (!cameraRef.current) {
      return;
    }

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0,
      });
      setCapturedImage(photo.uri);
    } catch (err) {
      console.error(`Error trying to take a picture`, err);
      // @ts-ignore
      Alert.alert("Error trying to take a picture", err?.toString());
    }
  };

  const switchCamera = () => {
    if (cameraType === Camera.Constants.Type.back) {
      setCameraType(Camera.Constants.Type.front);
    } else {
      setCameraType(Camera.Constants.Type.back);
    }
  };

  const handleFlashMode = () => {
    if (flashMode === Camera.Constants.FlashMode.on) {
      setFlashMode(Camera.Constants.FlashMode.off);
    } else if (flashMode === Camera.Constants.FlashMode.off) {
      setFlashMode(Camera.Constants.FlashMode.on);
    } else {
      setFlashMode(Camera.Constants.FlashMode.auto);
    }
  };

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  if (capturedImage) {
    return (
      <PicturePreview picture={capturedImage}>
        <ImageManipulator
          photo={{ uri: capturedImage }}
          isVisible={isEditorOpen}
          onPictureChoosed={({ uri }: { uri: string }) => setCapturedImage(uri)}
          onToggleModal={() => setIsEditorOpen(false)}
        />
        <Flex
          position="absolute"
          width="100%"
          bottom="0"
          zIndex={99}
          backgroundColor="#000000BF"
          justifyContent="space-between"
          flexDirection="row"
          pt={6}
          pb={8}
          px={4}
        >
          <Button
            backgroundColor="transparent"
            onPress={() => setCapturedImage(null)}
          >
            Retake
          </Button>

          <Button
            backgroundColor="transparent"
            onPress={() => onUsePicture(capturedImage)}
          >
            Use Photo
          </Button>
        </Flex>
      </PicturePreview>
    );
  }

  return (
    <Camera
      type={cameraType}
      flashMode={flashMode}
      onCameraReady={onCameraReady}
      style={{ flex: 1, width: "100%" }}
      ref={cameraRef}
    >
      <Flex
        position="absolute"
        top="0"
        height="100px"
        width="100%"
        backgroundColor="#000"
      >
        <IconButton
          disabled={!isCameraReady}
          position="absolute"
          top="50px"
          left="10px"
          backgroundColor="transparent"
          onPress={handleFlashMode}
          icon={
            flashMode === Camera.Constants.FlashMode.on ? (
              <Icon as={Ionicons} name="ios-flash" size="24px" color="white" />
            ) : (
              <Icon
                as={Ionicons}
                name="ios-flash-off"
                size="24px"
                color="white"
              />
            )
          }
        />
        <IconButton
          position="absolute"
          top="50px"
          right="10px"
          backgroundColor="transparent"
          onPress={openImagePicker}
          icon={<Icon as={Feather} name="image" size="24px" color="white" />}
        />
      </Flex>

      <Flex
        position="absolute"
        width="100%"
        bottom="0"
        zIndex={99}
        backgroundColor="#000000BF"
        justifyContent="space-between"
        flexDirection="row"
        alignItems="center"
        pt={6}
        pb={12}
        px={4}
      >
        <Button onPress={onCancel} width="100px" backgroundColor="transparent">
          Cancel
        </Button>
        <IconButton
          disabled={!isCameraReady}
          onPress={onTakePicture}
          width="76px"
          height="76px"
          rounded="full"
          backgroundColor="primary.800"
          icon={
            <Icon as={FontAwesome5} name="camera" size="36px" color="white" />
          }
        />
        <IconButton
          width="100px"
          backgroundColor="transparent"
          icon={
            <Icon as={Ionicons} name="ios-sync" size="24px" color="white" />
          }
          onPress={switchCamera}
        />
      </Flex>
    </Camera>
  );
};
