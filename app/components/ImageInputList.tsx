import React, { useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ImageInput from "./ImageInput";

interface ImageInputListProps {
  imageUris: string[];
  onAddImage: (imageUri: string | null) => void;
  onRemoveImage: (imageUri: string | null) => void;
}

function ImageInputList({
  imageUris = [],
  onRemoveImage,
  onAddImage,
}: ImageInputListProps) {
  const scrollView = useRef<ScrollView>() as React.MutableRefObject<ScrollView>;

  return (
    <View>
      <ScrollView
        horizontal
        ref={scrollView}
        onContentSizeChange={() => scrollView?.current?.scrollToEnd()}
      >
        <View style={styles.container}>
          {imageUris.map((uri) => (
            <View key={uri} style={styles.image}>
              <ImageInput
                imageUri={uri}
                onChangeImage={() => onRemoveImage(uri)}
              />
            </View>
          ))}
          <ImageInput onChangeImage={(uri: string | null) => onAddImage(uri)} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    marginRight: 10,
  },
});

export default ImageInputList;
