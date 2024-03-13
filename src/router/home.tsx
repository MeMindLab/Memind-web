import { Container, Box, Flex, HStack } from "@chakra-ui/react";
import DiaryButton from "../components/diary/Button";
import { IconPen, IconTrashCan } from "../components/icons";
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
    <Box p={5} bgColor="mainBg">
      <Flex direction="column" gap="10px">
        <Container p={0}>
          <MainCalendar
            onDateSelect={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </Container>
        <HStack spacing="9px">
          <DiaryButton
            onClick={handleTrash}
            color="white"
            icon={<IconTrashCan />}
          >
            지금 당장 쏟아내고픈{"\n"}감정이 있나요?
          </DiaryButton>
          <DiaryButton onClick={handleDiary} icon={<IconPen />}>
            오늘의 기억을 {"\n"}이야기해주세요!
          </DiaryButton>
        </HStack>
      </Flex>
    </Box>
  );
}
