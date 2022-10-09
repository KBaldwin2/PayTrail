import React, { ReactNode } from "react";
import { SafeAreaView, StyleSheet, View, Animated } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

interface ScreenProps {
  children: ReactNode;
  style?: Object;
}

function Screen({ children, style }: ScreenProps) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useFocusEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
    return () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    };
  });

  return (
    <Animated.View // Special animatable View
      style={{
        flex: 1,
        opacity: fadeAnim,
        transform: [
          {
            translateX: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [-50, 0],
            }),
          },
        ],
      }}
    >
      <SafeAreaView style={[styles.screen, style]}>
        <View style={[styles.view, style]}>{children}</View>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 12,
    flex: 1,
    flexGrow: 1,
    backgroundColor: "white",
  },
  view: {
    flex: 1,
    flexGrow: 1,
    height: "100%",
  },
});

export default Screen;
