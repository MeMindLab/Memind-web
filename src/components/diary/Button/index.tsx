import { Box, Button } from "@chakra-ui/react";
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
        h={104}
        p={0}
        paddingTop="13px"
        px={5}
        textAlign="justify"
        fontSize={18}
        fontWeight={400}
        whiteSpace="pre"
        onClick={onClick}
        borderRadius={13}
        boxShadow="0px 4px 4px 0px #d4d7e13b"
        sx={{
          _hover: {
            bg: color ? color : "pointColor",
            color: "inherit",
          },
        }}
      >
        {children}

        <Box position="absolute" top={42} right={0}>
          {icon}
        </Box>
      </Button>
    </Box>
  );
};

export default DiaryButton;
