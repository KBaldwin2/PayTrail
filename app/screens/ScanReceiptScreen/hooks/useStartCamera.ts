import { Camera } from "expo-camera";
import { useState } from "react";
import { Alert } from "react-native";

const useStartCamera = () => {
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [showPermissionDenied, setShowPermissionDenied] =
    useState<boolean>(false);

  const startCamera = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === "granted") {
        setShowCamera(true);
        setShowPermissionDenied(false);
      } else {
        setShowPermissionDenied(true);
      }
    } catch (err) {
      console.log("err", err);
      Alert.alert("ERROR");
    }
  };

  const onCloseCamera = () => {
    setShowCamera(false);
  };

  return { showCamera, onCloseCamera, startCamera, showPermissionDenied };
};

export default useStartCamera;
