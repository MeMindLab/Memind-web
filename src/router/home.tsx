import { Container, Box, Flex, VStack } from "@chakra-ui/react";
import DiaryButton from "../components/diary/Button";
import { IconPen, IconTrashCan } from "../components/icons";
import { MainCalendar } from "../components/Calendar";

export default function EmotionMain() {
  return (
    <Box h="100vh">
      <Flex direction="column" gap={3}>
        <Container>
          <MainCalendar
            onDateSelect={function (dateStr: string): void {
              throw new Error("Function not implemented.");
            }}
          />
        </Container>
        <VStack spacing={3}>
          <DiaryButton icon={<IconPen />}>
            미마인드에게 오늘의 기억을 이야기해주세요!
          </DiaryButton>
          <DiaryButton color="white" icon={<IconTrashCan />}>
            미마인드에게 오늘의 기억을 이야기해주세요!
          </DiaryButton>
        </VStack>
      </Flex>
    </Box>
  );
}
