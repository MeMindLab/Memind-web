import { Container, Box, Flex, HStack } from "@chakra-ui/react";
import DiaryButton from "../components/diary/Button";
import { IconPen, IconTrashCan } from "../components/icons";
import { MainCalendar } from "../components/Calendar";

export default function EmotionMain() {
  const handleTrash = () => {
    console.log("Click Trash Button");

    if (localStorage.getItem("trash") === "webview") {
      if (window && window.flutter_inappwebview) {
        window.flutter_inappwebview
          .callHandler("clickTrash")
          .then((arg: any) => {
            console.log(arg);
            console.log("웹!");
          });
      }
    }
  };

  const handleDiary = () => {};

  return (
    <Box h="100vh" p={5} bgColor="mainBg">
      <Flex direction="column" gap={3}>
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
