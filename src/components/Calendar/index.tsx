import React from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Text,
  Stack,
  HStack,
} from "@chakra-ui/react";
import {
  IconCalChevronLeft,
  IconCalChevronRight,
  IconHappy,
  IconJoyful,
  IconSad,
  IconLethargic,
  IconComfortable,
  IconAnnoyed,
} from "../icons";
import { SCalendar } from "./styles";
import { useCalendar, ActiveDate } from "../../lib/hooks/useCalendar";

const emotionIcons = {
  happy: IconHappy,
  joyful: IconJoyful,
  comfortable: IconComfortable,
  sad: IconSad,
  annoyed: IconAnnoyed,
  lethargic: IconLethargic,
};

type Props = {
  initialDateStr?: string;
  onDateSelect(dateStr: string): void;
  onViewChange?: (monthStr: string) => void;
  activeDates?: ActiveDate[];
};

export const MainCalendar = ({
  initialDateStr,
  onDateSelect,
  activeDates,
  onViewChange,
}: Props) => {
  const { dates, handlers, monthStr, dayStrs } = useCalendar({
    initialDateStr,
    onDateSelect,
    activeDates,
    onViewChange,
  });

  return (
    <Box
      margin={0}
      padding={0}
      borderRadius={13}
      bg="white"
      boxShadow="0px 4px 4px 0px rgba(212, 215, 225, 0.23)"
    >
      <SCalendar spacing={0} p={0} m={0}>
        <Box py="14px" px="19px" paddingLeft="18px">
          <Flex justify="space-between">
            <Button
              w="103px"
              h="36px"
              py="7px"
              borderRadius={50}
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg={"buttonColor"}
              sx={{
                _hover: {
                  color: "inherit",
                },
              }}
            >
              <Text fontWeight={600} marginRight="4px" color="#626262">
                {monthStr}
              </Text>
            </Button>

            <HStack spacing={2}>
              <Button
                p={0}
                m={0}
                bg={"buttonColor"}
                borderRadius="50%"
                cursor="default"
                onClick={handlers.prevMonth}
                size="sm"
                sx={{
                  _hover: {
                    color: "inherit",
                  },
                }}
              >
                <IconCalChevronLeft />
              </Button>

              <Button
                m={0}
                p={0}
                bg={"buttonColor"}
                cursor="default"
                borderRadius="50%"
                onClick={handlers.nextMonth}
                size="sm"
                sx={{
                  _hover: {
                    color: "inherit",
                  },
                }}
              >
                <IconCalChevronRight />
              </Button>
            </HStack>
          </Flex>
        </Box>

        <Flex justifyContent="space-between" wrap="nowrap" mb="2" px="19px">
          {dayStrs.map((d, i) => (
            <Text key={d} color={i === 0 ? "red" : "#313131"} fontWeight={500}>
              {d}
            </Text>
          ))}
        </Flex>

        <Stack mx="19px">
          <Divider
            variant="solid"
            borderWidth="1px"
            color={`linear-gradient(0deg, #CCC 0%, #CCC 100%), #FFF`}
          />
        </Stack>

        {dates.map((week, i) => {
          return (
            <Flex
              key={i}
              justify="space-around"
              wrap="nowrap"
              mb={i === dates.length - 1 ? "33px" : "24px"}
              mt={i === 0 ? "10px" : "0"}
            >
              {week.map(
                ({ date, isCurrentMonth, iso, isToday, active, emotion }) =>
                  !isCurrentMonth ? (
                    <div className="cell" key={iso} />
                  ) : (
                    <div
                      key={iso}
                      className={[
                        "cell",
                        active ? "active" : "",
                        isToday ? "today" : "",
                      ].join(" ")}
                    >
                      <Button
                        w="28px"
                        h="28px"
                        minW="28px"
                        borderRadius="50%"
                        m={0}
                        p={0}
                        data-iso={iso}
                        onClick={handlers.handleDateClick}
                      >
                        <Text className={isToday ? "today" : ""}>{date}</Text>
                      </Button>

                      {active && (
                        <Box
                          className={
                            emotion
                              ? "icon" // 감정이 있을 때는 "icon" 클래스를 추가
                              : ["offset", isToday ? "today" : ""].join(" ")
                          }
                        >
                          {emotion &&
                            React.createElement(emotionIcons[emotion])}
                        </Box>
                      )}
                    </div>
                  )
              )}
            </Flex>
          );
        })}
      </SCalendar>
    </Box>
  );
};
