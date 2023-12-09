import { Box, Button } from "@chakra-ui/react";
import { ReactNode } from "react";

interface DiaryButtonProps {
  children: ReactNode;
  icon: ReactNode;
  color?: string;
}

const DiaryButton: React.FC<DiaryButtonProps> = ({ children, icon, color }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg={color ? color : "pointColor"}
      w="100%"
      minW={353}
      h={53}
      p={4}
      paddingLeft={7}
      borderRadius={13}
    >
      <Button fontSize={14} fontWeight={400} bg="null" p={0}>
        {children}
      </Button>

      <Box textAlign="center">{icon}</Box>
    </Box>
  );
};

export default DiaryButton;
