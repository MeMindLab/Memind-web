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
  IconCalChevronBelow,
} from "../icons";
import { SCalendar } from "./styles";
import { useCalendar } from "../../lib/hooks/useCalendar";

type Props = {
  initialDateStr?: string;
  onDateSelect(dateStr: string): void;
  onViewChange?: (monthStr: string) => void;
  activeDates?: string[];
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

  console.log(dayStrs);

  return (
    <Box
      margin={0}
      padding={0}
      borderRadius={13}
      bg="white"
      shadow="0px 4px 4px 0px rgba(212, 215, 225, 0.23)"
    >
      <SCalendar spacing={0} p={0} m={0}>
        <Box py="14px" px="19px" paddingLeft="18px">
          <Flex justify="space-between">
            <Button h="36px" py="7px" paddingLeft="9px" borderRadius={50}>
              <Text fontWeight={600} marginRight="4px" color="#626262">
                {monthStr}
              </Text>
              <IconCalChevronBelow />
            </Button>

            <HStack spacing={2}>
              <Button
                p={0}
                m={0}
                bg="#DCE1F0" //b4 color
                borderRadius="50%"
                cursor="default"
                onClick={handlers.prevMonth}
                size="sm"
              >
                <IconCalChevronLeft />
              </Button>

              <Button
                m={0}
                p={0}
                bg="#DCE1F0" //b4 color
                cursor="default"
                borderRadius="50%"
                onClick={handlers.nextMonth}
                size="sm"
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

        {dates.map((week, i) => (
          <Flex
            key={i}
            justify="space-around"
            wrap="nowrap"
            mb={i === dates.length - 1 ? "33px" : "22px"}
            mt={i === 0 ? "10px" : "0"}
          >
            {week.map(({ date, isCurrentMonth, iso, isToday, active }) =>
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
                    size="sm"
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
                      className={["offset", isToday ? "today" : ""].join(" ")}
                    ></Box>
                  )}
                </div>
              )
            )}
          </Flex>
        ))}
      </SCalendar>
    </Box>
  );
};
