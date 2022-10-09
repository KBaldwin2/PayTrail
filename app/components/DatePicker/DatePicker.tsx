import { Feather } from "@expo/vector-icons";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { Box, Button, Flex, FormControl, Input } from "native-base";
import React, { useState } from "react";
import { Modal, Platform } from "react-native";
import { InputControl } from "../forms/InputControl";

interface IProps {
  onDateSelected: (date: Date | undefined) => void;
  defaultDate?: Date;
  maximumDate?: Date;
  label?: string;
}

export const DatePicker = ({
  onDateSelected,
  defaultDate,
  maximumDate,
  label,
}: IProps) => {
  const [date, setDate] = useState<Date | undefined>(defaultDate);
  const [show, setShow] = useState(false);

  const onCancelPress = () => {
    setDate(defaultDate);
    setShow(false);
  };

  const onDonePress = () => {
    onDateSelected(date);
    setShow(false);
  };

  const onChangeIos = (e: Event, date?: Date) => {
    setDate(date!);
  };

  const onChangeAndroid = (e: Event, date?: Date) => {
    setShow(false);
    setDate(date!);
    onDateSelected(date!);
  };

  const renderDatePicker = () => (
    <DateTimePicker
      textColor="black"
      value={date ?? new Date()}
      mode="date"
      display={Platform.OS === "ios" ? "spinner" : "default"}
      maximumDate={maximumDate}
      onChange={Platform.OS === "ios" ? onChangeIos : onChangeAndroid}
    />
  );

  return (
    <>
      <FormControl>
        {label && <FormControl.Label>{label}</FormControl.Label>}
        <InputControl
          size="md"
          onPressIn={() => setShow(true)}
          value={date?.toDateString() ?? ""}
          isDisabled
          InputLeftElement={
            <Button
              width="44px"
              height="100%"
              backgroundColor="primary.800"
              roundedRight={0}
              roundedLeft="md"
              onPress={() => setShow(true)}
            >
              <Feather name="calendar" size={20} color="white" />
            </Button>
          }
        />
      </FormControl>

      {Platform.OS !== "ios" && show && renderDatePicker()}

      {Platform.OS === "ios" && (
        <Modal
          visible={show}
          transparent={true}
          animationType="slide"
          supportedOrientations={["portrait"]}
          onRequestClose={() => setShow(false)}
        >
          <Flex flex={1} justifyContent="flex-end">
            <Box
              backgroundColor="gray.50"
              borderTopWidth="1px"
              borderTopColor="gray.200"
            >
              <Flex
                position="absolute"
                width="100%"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Button variant="unstyled" onPress={onCancelPress}>
                  Cancel
                </Button>

                <Button variant="unstyled" onPress={onDonePress}>
                  Done
                </Button>
              </Flex>
              <Box mt={8}>{renderDatePicker()}</Box>
            </Box>
          </Flex>
        </Modal>
      )}
    </>
  );
};
