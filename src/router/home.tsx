import { useEffect, useState } from "react";
import { Container, Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import axios from "axios";

import DiaryButton from "../components/diary/Button";
import {
  IconCalChevronRight,
  IconPen,
  IconTrashCan,
} from "../components/icons";
import { MainCalendar } from "../components/Calendar";
import EmotionBox from "../components/Calendar/MoodTracker";

declare global {
  interface Window {
    flutter_inappwebview: any;
  }
}

export default function EmotionMain() {
  const [token, setToken] = useState("");
  //const [selectedDate, setSelectedDate] = useState(
  //  new Date().toISOString().split("T")[0]
  //);

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

  // 로그인 후 토큰을 가져오는 함수
  const fetchToken = async () => {
    try {
      const response = await axios.post(
        "https://backend-wandering-glitter-8053.fly.dev/auth/login",
        {
          email: "test@test.com",
          password: "test1234",
        }
      );
      setToken(response.data.access_token);
      return response.data.access_token;
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };

  const getToken = () => {
    if (window && window.flutter_inappwebview) {
      window.flutter_inappwebview
        .callHandler("requestToken", "Tokenhandler")
        .then((arg: any) => {
          console.log("Received token from Flutter:", arg);
          setToken(arg); // 토큰 상태 업데이트
        })
        .catch((error: any) => {
          console.error("Error receiving token:", error);
        });
    }
  };

  const handleDateSelect = (dateStr: string) => {
    //setSelectedDate(dateStr);
  };

  const handleViewChanged = (monthStr: string) => {
    console.log("handle monthstr");
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <Box p={5} bgColor="mainBg" h="100vh">
      <Flex direction="column" gap="10px">
        <Container p={0}>
          <VStack spacing="9px" align="stretch">
            <EmotionBox score={89} change={-5.2} />
            <MainCalendar
              onDateSelect={handleDateSelect}
              onViewChange={handleViewChanged}
              token={token}
            />
          </VStack>
        </Container>
        <HStack spacing="9px">
          <DiaryButton onClick={handleDiary} icon={<IconPen />}>
            <Flex>
              <Text lineHeight={"25px"}>일기 쓰기</Text>
              <IconCalChevronRight />
            </Flex>
          </DiaryButton>
          <DiaryButton
            onClick={handleTrash}
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
