export const Button = {
  baseStyle: {
    borderRadius: "md",
    fontSize: "md",
  },
  variants: {
    primary: (props: Record<string, any>) => {
      return {
        backgroundColor:
          props.colorScheme === "primary"
            ? `${props.colorScheme}.800`
            : `${props.colorScheme}.500`,
        _text: {
          color: "white",
        },
        _pressed: {
          opacity: 0.8,
        },
      };
    },
    secondary: (props: Record<string, any>) => {
      return {
        borderColor:
          props.colorScheme === "primary"
            ? `${props.colorScheme}.800`
            : `${props.colorScheme}.600`,
        borderWidth: "1px",
        _text: {
          color:
            props.colorScheme === "primary"
              ? `${props.colorScheme}.800`
              : `${props.colorScheme}.600`,
        },
        _pressed: {
          opacity: 0.8,
        },
      };
    },
  },
  sizes: {
    lg: {
      minHeight: "42px",
      minWidth: "95px",
    },
  },
};
