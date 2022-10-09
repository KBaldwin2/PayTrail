import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import React, { useEffect } from "react";

interface IProps {
  material: MaterialTopTabBarProps;
  setIndex: (index: number) => void;
}

export const AuthStackNavigationHandler = ({ material, setIndex }: IProps) => {
  useEffect(() => {
    setIndex(material.state.index);
  }, [material]);
  return <></>;
};
