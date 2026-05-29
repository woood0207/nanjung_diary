import { CalendarIcon, SearchIcon } from "./Icons.js";

export function DatePicker({ month, day, onChange }) {
  const months = Array.from({ length: 12 }, (_, index) => index + 1);
  const daysInMonth = new Date(2024, month, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  function handleMonthChange(event) {
    const nextMonth = Number(event.target.value);
    const nextMaxDay = new Date(2024, nextMonth, 0).getDate();
    onChange(nextMonth, Math.min(day, nextMaxDay));
  }

  function handleDayChange(event) {
    onChange(month, Number(event.target.value));
  }

  return React.createElement(
    "div",
    {
      className:
        "flex flex-col gap-3 border-y border-[#1A1A1A]/10 py-5 sm:flex-row sm:items-center sm:justify-between",
    },
    React.createElement(
      "label",
      {
        className:
          "flex items-center gap-2 text-sm font-semibold tracking-[0.22em] text-[#8B0000]",
      },
      React.createElement(CalendarIcon),
      "양력 날짜 선택",
    ),
    React.createElement(
      "div",
      { className: "flex w-full gap-2 sm:w-auto" },
      React.createElement(
        "select",
        {
          value: month,
          onChange: handleMonthChange,
          className:
            "h-12 flex-1 rounded border border-[#1A1A1A]/20 bg-[#FBF8EF] px-4 font-serif text-base text-[#1A1A1A] shadow-inner outline-none transition focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 sm:w-28 sm:flex-none",
          "aria-label": "월 선택",
        },
        months.map((value) =>
          React.createElement("option", { key: value, value }, `${value}월`),
        ),
      ),
      React.createElement(
        "select",
        {
          value: day,
          onChange: handleDayChange,
          className:
            "h-12 flex-1 rounded border border-[#1A1A1A]/20 bg-[#FBF8EF] px-4 pr-10 font-serif text-base text-[#1A1A1A] shadow-inner outline-none transition focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 sm:w-28 sm:flex-none",
          "aria-label": "일 선택",
        },
        days.map((value) =>
          React.createElement("option", { key: value, value }, `${value}일`),
        ),
      ),
      React.createElement(
        "span",
        {
          className: "hidden place-items-center text-[#8B0000] sm:grid",
        },
        React.createElement(SearchIcon),
      ),
    ),
  );
}
