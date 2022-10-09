import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

interface IProps {
  onSelectImage: (uri: string) => void;
}

export default function useImagePicker({ onSelectImage }: IProps) {
  const requestAccess = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Sorry, we need camera roll permissions to make this work!"
        );
      }
      return status === "granted";
    } catch (err) {
      console.log("err", err);
      Alert.alert(`Error: ${err}`);
    }
  };

  const openImagePicker = async () => {
    const hasAccess = await requestAccess();
    if (hasAccess) {
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
        });

        if (!result.cancelled) {
          onSelectImage(result.uri);
        }
      } catch (err) {
        console.log("err", err);
        Alert.alert(`Error: ${err}`);
      }
    }
  };

  return { openImagePicker };
}
