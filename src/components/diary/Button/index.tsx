import { Box, Button, Text } from "@chakra-ui/react";
import { ReactNode, MouseEvent } from "react";

interface DiaryButtonProps {
  children: ReactNode;
  icon: ReactNode;
  color?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const DiaryButton: React.FC<DiaryButtonProps> = ({
  children,
  icon,
  color,
  onClick,
}) => {
  return (
    <Box>
      <Button
        alignItems="normal"
        justifyContent="flex-start"
        position="relative"
        bg={color ? color : "pointColor"}
        minWidth={172}
        h={114}
        p={0}
        paddingTop="12px"
        px={4}
        textAlign="justify"
        fontSize={14}
        fontWeight={400}
        whiteSpace="pre"
        onClick={onClick}
        borderRadius={13}
        boxShadow="0px 4px 4px 0px #d4d7e13b"
      >
        {children}

        <Box position="absolute" top={68} right={4}>
          {icon}
        </Box>
      </Button>
    </Box>
  );
};

export default DiaryButton;
