import { Box } from "native-base";
import React from "react";
import { ImageBackground } from "react-native";

interface IProps {
  picture: string;
  children: React.ReactNode;
}

export const PicturePreview = ({ picture, children }: IProps) => {
  return (
    <Box width="100%" height="100%" position="relative">
      <ImageBackground source={{ uri: picture }} style={{ flex: 1 }} />
      {children}
    </Box>
  );
};
