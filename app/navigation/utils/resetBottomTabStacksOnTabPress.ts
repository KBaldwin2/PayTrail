import { StackActions } from "@react-navigation/native";

const TABS_TO_RESET: string[] = ["Home", "Receipts", "Deals", "Settings"];

interface IProps {
  navigation: any;
  route: any;
}

export const resetBottomTabStacksOnTabPress = ({ navigation }: IProps) => ({
  blur: () => {
    const state = navigation.getState();

    // @ts-ignore
    state.routes.forEach((route, tabIndex) => {
      if (state?.index !== tabIndex && route.state?.index > 0) {
        navigation.dispatch(StackActions.popToTop());
      }
    });
  },
  tabPress: (e: any) => {
    const state = navigation.dangerouslyGetState();

    if (state) {
      // Grab all the tabs that are NOT the one we just pressed
      const nonTargetTabs = state.routes.filter((r: any) => r.key !== e.target);

      nonTargetTabs.forEach((tab: any) => {
        // Find the tab we want to reset and grab the key of the nested stack
        const tabName = tab?.name;
        const stackKey = tab?.state?.key;

        if (stackKey && TABS_TO_RESET.includes(tabName)) {
          // Pass the stack key that we want to reset and use popToTop to reset it
          navigation.dispatch({
            ...StackActions.popToTop(),
            target: stackKey,
          });
        }
      });
    }
  },
});
