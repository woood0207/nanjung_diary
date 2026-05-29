import { DatePicker } from "./components/DatePicker.js";
import { DiaryCard } from "./components/DiaryCard.js";
import { YearTabs } from "./components/YearTabs.js";
import {
  formatSolar,
  getEntriesBySolarDate,
  getRandomEntry,
  getStats,
  parseDateInput,
  todayMonthDay,
} from "./lib/diary.js";

const { useEffect, useMemo, useState } = React;

function App() {
  const initialDate = todayMonthDay();
  const [entries, setEntries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [selectedYear, setSelectedYear] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("./diary.json")
      .then((response) => {
        if (response.ok) return response;
        return fetch("./public/diary.json");
      })
      .then((response) => response.json())
      .then((data) => setEntries(data))
      .finally(() => setIsLoading(false));
  }, []);

  const matches = useMemo(
    () => getEntriesBySolarDate(entries, selectedDate.month, selectedDate.day),
    [entries, selectedDate],
  );

  useEffect(() => {
    setSelectedYear(matches[0]?.year || null);
  }, [matches]);

  const selectedEntry =
    matches.find((entry) => entry.year === selectedYear) || matches[0] || null;
  const fallbackEntry = useMemo(
    () => getRandomEntry(entries, selectedDate.month, selectedDate.day),
    [entries, selectedDate],
  );
  const stats = useMemo(() => getStats(entries), [entries]);

  function handleDateChange(value) {
    setSelectedDate(parseDateInput(value));
  }

  return React.createElement(
    "main",
    {
      className:
        "min-h-screen bg-[#F4F1EA] bg-[radial-gradient(circle_at_top,rgba(139,0,0,0.08),transparent_34%),linear-gradient(90deg,rgba(26,26,26,0.035)_1px,transparent_1px)] bg-[length:auto,34px_34px] px-4 py-8 font-serif text-[#1A1A1A] sm:px-6 lg:py-12",
    },
    React.createElement(
      "section",
      { className: "mx-auto flex max-w-3xl flex-col gap-6" },
      React.createElement(
        "header",
        { className: "text-center" },
        React.createElement(
          "p",
          {
            className:
              "mb-3 text-sm font-bold tracking-[0.35em] text-[#8B0000]",
          },
          "忠武公 李舜臣",
        ),
        React.createElement(
          "h1",
          {
            className:
              "text-4xl font-bold leading-tight text-[#1A1A1A] sm:text-6xl",
          },
          "오늘의 난중일기",
        ),
        React.createElement(
          "p",
          { className: "mx-auto mt-4 max-w-xl text-base leading-7 text-[#333333]/75" },
          "양력 월일을 기준으로 같은 날의 기록을 찾아, 음력 날짜와 함께 보여줍니다.",
        ),
      ),
      React.createElement(
        "div",
        {
          className:
            "rounded-sm border border-[#1A1A1A]/10 bg-[#FBF8EF]/70 px-5 py-4 shadow-sm backdrop-blur",
        },
        React.createElement(DatePicker, {
          month: selectedDate.month,
          day: selectedDate.day,
          onChange: handleDateChange,
        }),
        React.createElement(
          "div",
          {
            className:
              "mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-[#333333]/70",
          },
          React.createElement(
            "span",
            null,
            `선택한 양력 날짜: ${formatSolar(selectedDate.month, selectedDate.day)}`,
          ),
          React.createElement(
            "span",
            null,
            stats.years.length
              ? `${stats.years[0]}-${stats.years.at(-1)}년 · ${entries.length}편 · ${stats.days}일`
              : "자료를 읽는 중",
          ),
        ),
      ),
      matches.length > 1 &&
        React.createElement(YearTabs, {
          entries: matches,
          selectedYear,
          onSelect: setSelectedYear,
        }),
      isLoading
        ? React.createElement(
            "div",
            {
              className:
                "rounded-sm border border-[#1A1A1A]/15 bg-[#FBF8EF] p-10 text-center text-lg",
            },
            "일기를 펼치는 중입니다.",
          )
        : React.createElement(DiaryCard, {
            entry: selectedEntry || fallbackEntry,
            selectedMonth: selectedDate.month,
            selectedDay: selectedDate.day,
            isFallback: !selectedEntry,
          }),
    ),
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
