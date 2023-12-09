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
      pointColor: colors.babyYellow,
      dateColor: colors.babyBlue,
      mainBg: colors.solitude,
    },
  },
});

type Props = { children: React.ReactNode | React.ReactNode[] };

export function ProviderTheme({ children }: Props) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
