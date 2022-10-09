import { KeyboardAvoidingView } from "native-base";
import React from "react";
import {
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";

interface IProps {
  children: JSX.Element;
  keyboardVerticalOffset?: number;
}

export const KeyboardAvoidingWrapper = ({
  children,
  keyboardVerticalOffset = Platform.OS === "ios" ? 146 : 0,
}: IProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
