import { Text } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

interface ErrorMessageProps {
  error: string | undefined;
  visible: boolean | undefined;
}

export const ErrorMessage = ({ error, visible }: ErrorMessageProps) => {
  if (!visible || !error) return null;

  return <Text style={styles.error}>{error}</Text>;
};

const styles = StyleSheet.create({
  error: { color: "red" },
});
