import { useEffect, useMemo, useState } from "react";

import dayjs from "dayjs";
import { axiosInstance } from "../axios";
import { baseMonthlyTakeUrl } from "../axios/constant";

// CalendarEntity 타입 정의
type CalendarEntity = {
  conversation_id: string;
  user_id: string;
  date: string;
};

export const useHome = () => {
  const [dateStr, setDateStr] = useState(dayjs().format("YYYY-MM-DD"));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [conversations, setConversations] = useState<CalendarEntity[]>([]);
  const [month, setMonth] = useState(dayjs().format("YYYY-MM"));

  const activeDates = useMemo(() => {
    return conversations.map((conv) => ({
      date: conv.date,
      //emotion: conv.emotion,
    }));
  }, [conversations]);

  const calendarApi = async (dateStr: string) => {
    try {
      const [year, month] = dateStr.split("-");

      const response = await axiosInstance.get(baseMonthlyTakeUrl, {
        params: { year, month },
      });

      setConversations(response.data.conversations);
    } catch (err: any) {
      console.error("Error response:", err.response?.data);

      setError("Failed to load data");
      console.error("Error fetching calendar data:", err);
    } finally {
      setLoading(false);
    }
  };

  const getToken = () => {
    setLoading(true);
    if (window && window.flutter_inappwebview) {
      window.flutter_inappwebview
        .callHandler("requestToken", "Tokenhandler")
        .then((arg: any) => {
          console.log("Received token from Flutter:", arg);

          localStorage.setItem("accessToken", arg);
          setToken(arg);
        })
        .catch((error: any) => {
          console.error("Error receiving token:", error);
        });
    }
  };

  const handleDateSelect = (dateStr: string) => {
    setDateStr(dateStr);

    if (conversations && conversations.length > 0) {
      const selectedConversation = conversations.find((conversation: any) => {
        return conversation.date === dateStr;
      });

      if (selectedConversation) {
        if (window && window.flutter_inappwebview) {
          window.flutter_inappwebview
            .callHandler("navigateToChat", JSON.stringify(selectedConversation))
            .then((result: any) => {
              console.log("Navigated to chat:", result);
            });
        }
      }
    }
  };

  const handlers = useMemo(
    () => ({
      handleTrash: () => {
        if (window && window.flutter_inappwebview) {
          window.flutter_inappwebview
            .callHandler("clickTrash", "trashButton")
            .then((arg: any) => {
              console.log(arg);
            });
        }
      },
      handleDiary: () => {
        if (window && window.flutter_inappwebview) {
          window.flutter_inappwebview
            .callHandler("clickDiary", "diaryButton")
            .then((arg: any) => {
              console.log(arg);
            });
        }
      },
      setMonthStr: (monthStr: string) => {
        setMonth(monthStr);
      },
      handleDateSelect,
    }),
    [conversations]
  );

  useEffect(() => {
    if (token) {
      calendarApi(month);
    }
  }, [month, token]);

  useEffect(() => {
    getToken();
  }, []);

  return { dateStr, handlers, activeDates, loading, error };
};
