import { Box, Button, Divider, Flex, Text } from "@chakra-ui/react";
import { IconCalChevronLeft, IconCalChevronRight, IconPen } from "../icons";
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

  console.log(monthStr, "mon st");

  return (
    <Box margin={0} mx="auto" padding={0} borderRadius="50px">
      <SCalendar spacing={0}>
        <Box p="xs">
          <Flex justify="space-between">
            <Text fontWeight={500}>{monthStr}</Text>

            <Flex>
              <Button
                bgColor="transparent"
                onClick={handlers.prevMonth}
                size="sm"
              >
                <IconCalChevronLeft />
              </Button>
              <Button
                bgColor="transparent"
                onClick={handlers.nextMonth}
                size="sm"
              >
                <IconCalChevronRight />
              </Button>
            </Flex>
          </Flex>
        </Box>

        <Flex justify="space-between" wrap="nowrap">
          {dayStrs.map((d, i) => (
            <Text key={d} color={i === 0 ? "red" : undefined} fontSize="sm">
              {d}
            </Text>
          ))}
        </Flex>
        <Divider color="gray.6" mx="xs" />
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
                    padding={0}
                    data-iso={iso}
                    onClick={handlers.handleDateClick}
                  >
                    {active ? (
                      <IconPen />
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
