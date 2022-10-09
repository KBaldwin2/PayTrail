import React from "react";
import { StyleSheet, View } from "react-native";
import { CenteredLoadingIndicator } from "./LoadingIndicator/CenteredLoadingIndicator";

interface ActivityIndicatorProps {
  visible: boolean;
}

function ActivityIndicator({ visible = false }: ActivityIndicatorProps) {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <CenteredLoadingIndicator />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    backgroundColor: "white",
    height: "100%",
    opacity: 0.8,
    width: "100%",
    zIndex: 1,
  },
});

export default ActivityIndicator;
