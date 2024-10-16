import { Container, Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";

import DiaryButton from "../components/diary/Button";
import {
  IconCalChevronRight,
  IconPen,
  IconTrashCan,
} from "../components/icons";
import { MainCalendar } from "../components/Calendar";
import EmotionBox from "../components/Calendar/MoodTracker";
import { useHome } from "../lib/hooks/useHome";

declare global {
  interface Window {
    flutter_inappwebview: any;
  }
}

export default function EmotionMain() {
  const { dateStr, handlers, activeDates } = useHome();

  return (
    <Box p={5} bgColor="mainBg" h="100vh">
      <Flex direction="column" gap="10px">
        <Container p={0}>
          <VStack spacing="9px" align="stretch">
            {/*<EmotionBox score={89} change={-5.2} />*/}
            <MainCalendar
              onDateSelect={handlers.handleDateSelect}
              onViewChange={handlers.setMonthStr}
              activeDates={activeDates}
            />
          </VStack>
        </Container>
        <HStack spacing="9px">
          <DiaryButton onClick={handlers.handleDiary} icon={<IconPen />}>
            <Flex>
              <Text lineHeight={"25px"}>일기 쓰기</Text>
              <IconCalChevronRight />
            </Flex>
          </DiaryButton>
          <DiaryButton
            onClick={handlers.handleTrash}
            color="white"
            icon={<IconTrashCan />}
          >
            <Flex>
              <Text lineHeight={"25px"}>감정 쓰레기통</Text>
              <IconCalChevronRight />
            </Flex>
          </DiaryButton>
        </HStack>
      </Flex>
    </Box>
  );
}
