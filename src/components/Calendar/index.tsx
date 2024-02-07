import { Box, Button, Divider, Flex, Text, Stack } from "@chakra-ui/react";
import { IconCalChevronLeft, IconCalChevronRight } from "../icons";
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

  return (
    <Box
      margin={0}
      padding={0}
      borderRadius={4}
      bg="white"
      shadow="0px 4px 4px 0px rgba(212, 215, 225, 0.23)"
    >
      <SCalendar spacing={0} p={0} m={0}>
        <Box p={3} pr={0}>
          <Flex justify="space-between">
            <Text fontWeight={500}>{monthStr}</Text>

            <Box>
              <Button
                p={0}
                m={0}
                bgColor="transparent"
                cursor="default"
                _hover={{ bgColor: "transparent" }}
                onClick={handlers.prevMonth}
                size="sm"
              >
                <IconCalChevronLeft />
              </Button>

              <Button
                m={0}
                p={0}
                bgColor="transparent"
                cursor="default"
                _hover={{ bgColor: "transparent" }}
                onClick={handlers.nextMonth}
                size="sm"
              >
                <IconCalChevronRight />
              </Button>
            </Box>
          </Flex>
        </Box>

        <Flex justifyContent="space-between" wrap="nowrap" mb={3} px={3}>
          {dayStrs.map((d, i) => (
            <Text key={d} color={i === 0 ? "red" : undefined} fontSize="sm">
              {d}
            </Text>
          ))}
        </Flex>
        <Stack mx={4}>
          <Divider />
        </Stack>

        {dates.map((week, i) => (
          <Flex key={i} justify="space-between" wrap="nowrap">
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
                    {active ? (
                      <Box>active 아이콘</Box>
                    ) : (
                      <Text fontSize={18} className={isToday ? "today" : ""}>
                        {date}
                      </Text>
                    )}
                  </Button>
                  {active && (
                    <Text
                      className={["offset", isToday ? "today" : ""].join(" ")}
                      fontSize={14}
                    >
                      {date}
                    </Text>
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
