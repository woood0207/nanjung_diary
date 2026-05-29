import { CalendarIcon, SearchIcon } from "./Icons.js";
import { formatDateInput } from "../lib/diary.js";

export function DatePicker({ month, day, onChange }) {
  const handleChange = (event) => onChange(event.target.value);

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
      { className: "relative w-full sm:w-64" },
      React.createElement("input", {
        type: "date",
        value: formatDateInput(month, day),
        onChange: handleChange,
        onInput: handleChange,
        className:
          "h-12 w-full rounded border border-[#1A1A1A]/20 bg-[#FBF8EF] px-4 pr-11 font-serif text-base text-[#1A1A1A] shadow-inner outline-none transition focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20",
      }),
      React.createElement(
        "span",
        {
          className:
            "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8B0000]",
        },
        React.createElement(SearchIcon),
      ),
    ),
  );
}
