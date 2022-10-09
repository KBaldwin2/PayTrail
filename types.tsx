/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NavigatorScreenParams } from "@react-navigation/native";
import { IReceipt } from "./app/models/receipt";

export type RootStackParamList = {
  Root: NavigatorScreenParams<BottomTabParamList>;
  ScanReceiptsScreen: ScanReceiptScreenProps | undefined;
  NotFound: undefined;
};

export type ScanReceiptScreenProps = {
  receipt: IReceipt | undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Receipts: NavigatorScreenParams<ReceiptsParamList>;
  Deals: undefined;
  Settings: undefined;
};

export type AuthTabParamList = {
  SignIn: undefined;
  SignUp: undefined;
  VerifyPhone: undefined;
  Forgot: undefined;
};

export type HomeParamList = {
  HomeScreen: undefined;
};

export type AddReceiptsProps = {
  imgUri?: string;
  receipt?: IReceipt;
  initView?: boolean;
};

export type ReceiptsParamList = {
  ReceiptsScreen: undefined;
  AddReceiptsScreen: AddReceiptsProps | undefined;
};

export type DealsParamList = {
  DealsScreen: undefined;
};

export type SettingsParamList = {
  SettingsScreen: undefined;
};

export type ErrorResponse = {
  message: string;
};
