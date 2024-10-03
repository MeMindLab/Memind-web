import dayjs, { Dayjs } from "dayjs";
import { MouseEvent, useMemo, useState } from "react";

export type ActiveDate = {
  date: string;
  emotion?:
    | "happy"
    | "joyful"
    | "comfortable"
    | "sad"
    | "annoyed"
    | "lethargic";
};

type Options =
  | {
      initialDateStr?: string;
      onViewChange?(dtStr: string): void;
      onDateSelect?(dtStr: string): void;
      activeDates?: ActiveDate[];
    }
  | undefined;

type Day = {
  date: number;
  day: number;
  iso: string;
  isPast: boolean;
  isCurrentMonth: boolean;
  isToday: boolean;
  active: boolean;
  emotion?:
    | "happy"
    | "joyful"
    | "comfortable"
    | "sad"
    | "annoyed"
    | "lethargic";
};

export const useCalendar = (options: Options) => {
  const { initialDateStr, onViewChange, onDateSelect, activeDates } =
    options || {};

  const [viewDate, setViewDate] = useState<Dayjs>(dayjs(initialDateStr));

  const today = useMemo(() => dayjs(), []);

  const startOfWeeks = useMemo(
    () => dayjs(viewDate).startOf("M").startOf("w"),
    [viewDate]
  );

  const monthStr = useMemo(() => viewDate.format("YYYY.MM"), [viewDate]);

  const dayStrs = useMemo(() => ["일", "월", "화", "수", "목", "금", "토"], []);

  const dates = useMemo(() => {
    const result = [];
    let dt = dayjs(startOfWeeks);
    const currM = viewDate.month();
    const nextM = viewDate.add(1, "M").month();
    while (dt.month() !== nextM) {
      const week: Day[] = [];
      for (let i = 0; i < 7; i++) {
        const date = dt.date();
        const day = dt.day();
        const m = dt.month();
        const isCurrentMonth = m === currM;
        const iso = dt.format("YYYY-MM-DD");
        const isPast = dt.isBefore(today, "day");
        const isToday = dt.isSame(today, "day");

        const emotion = activeDates?.find((ad) => ad.date === iso)?.emotion; // Assuming activeDates has emotion
        const activeDate = activeDates?.find((ad) => ad.date === iso);

        const active = !!activeDate;

        week.push({
          date,
          day,
          iso,
          isCurrentMonth,
          isPast,
          isToday,
          active,
          emotion,
        });
        // advance to next day
        dt = dt.add(1, "d");
      }
      // add week to result
      result.push(week);
    }
    return result;
  }, [startOfWeeks, viewDate, today, activeDates]);

  const handlers = useMemo(
    () => ({
      _triggerViewChange: (viewDate: Dayjs) => (
        onViewChange?.(viewDate.format("YYYY-MM")), viewDate
      ),
      nextMonth: () =>
        setViewDate((d) => handlers._triggerViewChange(d.add(1, "M"))),
      prevMonth: () =>
        setViewDate((d) => handlers._triggerViewChange(d.subtract(1, "M"))),
      handleDateClick: (e: MouseEvent<HTMLButtonElement>) => {
        const dtStr = e.currentTarget.getAttribute("data-iso");
        if (!dtStr || !onDateSelect) return;
        onDateSelect(dtStr);
      },
    }),
    [onDateSelect, onViewChange]
  );
  return { dates, handlers, monthStr, dayStrs };
};

export type CalendarHook = ReturnType<typeof useCalendar>;
