import { extendTheme } from "native-base";
import { Button } from "./components/button";
import { FormControlErrorMessage } from "./components/formControlErrorMessage";
import { FormControlLabel } from "./components/formControlLabel";
import { Input } from "./components/input";
import { ModalBody } from "./components/modalBody";
import { ModalContent } from "./components/modalContent";
import { Select } from "./components/select";
import { Text } from "./components/text";

const theme = extendTheme({
  fontConfig: {
    Roboto: {
      400: {
        normal: "Roboto_400Regular",
        italic: "Roboto_400Regular_Italic",
      },
      500: {
        normal: "Roboto_500Medium",
        italic: "Roboto_500Medium_Italic",
      },
      700: {
        normal: "Roboto_700Bold",
        italic: "Roboto_700Bold_Italic",
      },
    },
  },
  fonts: {
    heading: "Roboto",
    body: "Roboto",
    mono: "Roboto",
  },
  colors: {
    input: {
      bgColor: "rgb(246, 250, 250)",
      borderColor: "rgb(235, 238, 241)",
    },
    blackish: {
      "50": "black",
      "100": "black",
      "200": "black",
      "300": "black",
      "400": "black",
      "600": "black",
      "700": "black",
      "500": "black",
      "800": "black",
      "900": "black",
    },
    primary: {
      "50": "#EEF7F2",
      "100": "#CFE7DB",
      "200": "#B0D8C3",
      "300": "#92C9AC",
      "400": "#73BA95",
      "500": "#015045",
      "600": "#015045",
      "700": "#015045",
      "800": "#015045",
      "900": "#112219",
    },
    blue: {
      50: "#e7effe",
      100: "#bacef6",
      200: "#8daef0",
      300: "#608dec",
      400: "#396ce8",
      500: "#2854d0",
      600: "#1e41a1",
      700: "#152e72",
      800: "#0b1c44",
      900: "#010918",
    },
  },
  components: {
    IconButton: {
      baseStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    },
    Button,
    Select,
    FormControlLabel,
    Input,
    FormControlErrorMessage,
    ModalBody,
    ModalContent,
    Text,
  },
});

export default theme;
