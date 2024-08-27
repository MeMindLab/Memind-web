import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";
import colors from "../colors";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors,
  semanticTokens: {
    colors: {
      pointColor: colors.babyBlue,
      dateColor: colors.babyBlue,
      mainBg: colors.blue1,
      buttonColor: colors.blue2,
    },
  },
});

type Props = { children: React.ReactNode | React.ReactNode[] };

export function ProviderTheme({ children }: Props) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
