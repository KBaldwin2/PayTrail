import { Box, Flex, Image, ScrollView, Stack, Text } from "native-base";
import { useMemo, useRef } from "react";
import { Animated, Dimensions, SafeAreaView } from "react-native";
import { ExpandingDot } from "react-native-animated-pagination-dots";
import PagerView, {
  PagerViewOnPageScrollEventData,
} from "react-native-pager-view";
import { Button } from "../../components/Button";

const data = [{ key: "1" }, { key: "2" }, { key: "3" }, { key: "4" }];

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

interface IProps {
  onFinish: () => void;
}

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const OnboardingScreen = ({ onFinish }: IProps) => {
  const ref = useRef<PagerView>(null);
  const scrollOffsetAnimatedValue = useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = useRef(new Animated.Value(0)).current;
  const inputRange = [0, data.length];
  const scrollX = Animated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue
  ).interpolate({
    inputRange,
    outputRange: [0, data.length * width],
  });

  const onPageScroll = useMemo(
    () =>
      Animated.event<PagerViewOnPageScrollEventData>(
        [
          {
            nativeEvent: {
              offset: scrollOffsetAnimatedValue,
              position: positionAnimatedValue,
            },
          },
        ],
        {
          useNativeDriver: false,
        }
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <AnimatedPagerView
        initialPage={0}
        ref={ref}
        style={{ flex: 1 }}
        onPageScroll={onPageScroll}
      >
        <Box height="1000px">
          <ScrollView key="1" flex={1} pt={3} px={4}>
            <Image
              height={width * 0.5}
              alt="printing"
              source={require("./assets/printing.png")}
            />
            <Box my={10}>
              <Text textAlign="center" fontWeight="500" fontSize="2xl">
                Welcome to the
              </Text>
              <Text textAlign="center" fontWeight="700" fontSize="4xl">
                No Print Zone
              </Text>
              <Text textAlign="center" mt={4}>
                Skip the mountain of paper receipts and start storing everything
                in one universal location
              </Text>
            </Box>
            <Stack space={4}>
              <Button onPress={() => ref.current?.setPage(1)} variant="primary">
                Get Started
              </Button>
              <Button onPress={onFinish} variant="ghost">
                I already have an account
              </Button>
            </Stack>
          </ScrollView>
        </Box>

        <ScrollView key="2" pt={6} px={4}>
          <Image
            mb={10}
            height={width * 0.6}
            alt="printing"
            source={require("./assets/inbox.png")}
          />
          <Text mb={4} fontSize="lg" fontWeight="500" textAlign="center">
            PayTrail Email
          </Text>
          <Text mb={4} textAlign="center">
            Transfer receipts directly from the till to your phone using:
          </Text>
          <Text mb={3} fontSize="lg" fontWeight="500" textAlign="center">
            Your Phone Number@mypaytrail.com
          </Text>
          <Box>
            <Button onPress={() => ref.current?.setPage(2)} variant="primary">
              Continue
            </Button>
          </Box>
        </ScrollView>
        <ScrollView key="3" pt={6} px={4}>
          <Image
            mb={10}
            height={width * 0.6}
            alt="printing"
            source={require("./assets/capture.png")}
          />
          <Text mb={4} fontSize="lg" fontWeight="500" textAlign="center">
            All Your Receipts. One Location
          </Text>

          <Text mb="56px" textAlign="center">
            Scan, create and transfer all your receipts to your Paytrail library
          </Text>

          <Box>
            <Button onPress={() => ref.current?.setPage(3)} variant="primary">
              Continue
            </Button>
          </Box>
        </ScrollView>
        <ScrollView key="4" pt={6} px={4}>
          <Image
            mb={10}
            height={width * 0.6}
            alt="printing"
            source={require("./assets/cleanup.png")}
          />

          <Text mb={4} fontSize="lg" fontWeight="500" textAlign="center">
            Skip the Spam
          </Text>
          <Text mb="36px" textAlign="center">
            We keep your receipt library organized by separating deals and
            receipt emails. Find email promotions categorized by store in your
            deals page!
          </Text>

          <Box>
            <Button onPress={onFinish} variant="primary">
              Sign Up
            </Button>
          </Box>
        </ScrollView>
      </AnimatedPagerView>
      <Box height="40px">
        <ExpandingDot
          data={data}
          expandingDotWidth={30}
          //@ts-ignore
          scrollX={scrollX}
          inActiveDotOpacity={0.6}
          activeDotColor="#015045"
          inActiveDotColor="#71717a"
          dotStyle={{
            width: 10,
            height: 10,
            backgroundColor: "#015045",
            borderRadius: 5,
            marginHorizontal: 5,
          }}
          containerStyle={{
            marginBottom: 5,
          }}
        />
      </Box>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
