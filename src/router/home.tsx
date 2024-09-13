import { Container, Box, Flex, HStack, Text } from "@chakra-ui/react";

import DiaryButton from "../components/diary/Button";
import { IconPen, IconTrashCan, RightArrowIcon } from "../components/icons";
import { MainCalendar } from "../components/Calendar";

declare global {
  interface Window {
    flutter_inappwebview: any;
  }
}

export default function EmotionMain() {
  const handleTrash = () => {
    console.log("Click Trash Button");

    if (window && window.flutter_inappwebview) {
      window.flutter_inappwebview
        .callHandler("clickTrash", "trashButton")
        .then((arg: any) => {
          console.log(arg);
        });
    }
  };

  const handleDiary = () => {
    console.log("Click Diary button");

    if (window && window.flutter_inappwebview) {
      window.flutter_inappwebview
        .callHandler("clickDiary", "diaryButton")
        .then((arg: any) => {
          console.log(arg);
        });
    }
  };

  return (
    <Box p={5} bgColor="mainBg" h="100vh">
      <Flex direction="column" gap="10px">
        <Container p={0}>
          <MainCalendar
            onDateSelect={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </Container>
        <HStack spacing="9px">
          <DiaryButton onClick={handleDiary} icon={<IconPen />}>
            <Flex>
              <Text lineHeight={"25px"}>일기 쓰기</Text>
              <RightArrowIcon />
            </Flex>
          </DiaryButton>
          <DiaryButton
            onClick={handleTrash}
            color="white"
            icon={<IconTrashCan />}
          >
            <Flex>
              <Text lineHeight={"25px"}>감정 쓰레기통</Text>
              <RightArrowIcon />
            </Flex>
          </DiaryButton>
        </HStack>
      </Flex>
    </Box>
  );
}
