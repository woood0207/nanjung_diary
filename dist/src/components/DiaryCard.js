import { BookOpenIcon, SealIcon } from "./Icons.js";
import { formatSolar } from "../lib/diary.js";

export function DiaryCard({ entry, selectedMonth, selectedDay, isFallback }) {
  const paragraphs = entry?.content.split("\n").filter(Boolean) || [];

  return React.createElement(
    "article",
    {
      className:
        "relative overflow-hidden rounded-sm border border-[#1A1A1A]/15 bg-[#FBF8EF] px-6 py-8 shadow-[0_24px_80px_rgba(26,26,26,0.14)] sm:px-10 sm:py-12",
    },
    React.createElement("div", {
      className:
        "pointer-events-none absolute inset-y-0 left-5 w-px bg-[#8B0000]/20",
    }),
    React.createElement("div", {
      className:
        "pointer-events-none absolute inset-y-0 right-5 w-px bg-[#8B0000]/20",
    }),
    React.createElement(
      "div",
      { className: "relative z-10 space-y-7" },
      React.createElement(
        "div",
        { className: "flex items-start justify-between gap-5" },
        React.createElement(
          "div",
          { className: "space-y-3" },
          React.createElement(
            "div",
            {
              className:
                "inline-flex items-center gap-2 text-sm font-semibold tracking-[0.26em] text-[#8B0000]",
            },
            React.createElement(BookOpenIcon),
            isFallback ? "무작위 일기 구절" : "오늘의 난중일기",
          ),
          React.createElement(
            "h1",
            {
              className:
                "text-4xl font-bold leading-tight text-[#1A1A1A] sm:text-5xl",
            },
            entry
              ? `${formatSolar(entry.solarMonth, entry.solarDay)}`
              : `${formatSolar(selectedMonth, selectedDay)}`,
            entry &&
              React.createElement(
                "span",
                {
                  className:
                    "mt-3 block text-lg font-normal text-[#333333]/75 sm:inline sm:pl-3",
                },
                `(음력 ${entry.lunarLabel})`,
              ),
          ),
        ),
        React.createElement(
          "div",
          {
            className:
              "grid h-16 w-16 shrink-0 place-items-center rounded-sm border-2 border-[#8B0000] text-[#8B0000]",
            title: "인장",
          },
          React.createElement(SealIcon),
        ),
      ),
      isFallback &&
        React.createElement(
          "div",
          {
            className:
              "rounded-sm border border-[#8B0000]/20 bg-[#8B0000]/5 px-4 py-3 text-base font-semibold text-[#8B0000]",
          },
          "오늘은 기록이 없는 날입니다.",
        ),
      entry &&
        React.createElement(
          "div",
          { className: "flex flex-wrap items-center gap-3 text-sm text-[#333333]/70" },
          React.createElement("span", null, `${entry.year}년 기록`),
          entry.ganji && React.createElement("span", null, "·"),
          entry.ganji && React.createElement("span", null, `${entry.ganji}일`),
        ),
      React.createElement(
        "div",
        {
          className:
            "space-y-5 text-[1.08rem] leading-9 text-[#1A1A1A] sm:text-xl sm:leading-10",
        },
        paragraphs.map((paragraph, index) =>
          React.createElement("p", { key: index }, paragraph),
        ),
      ),
    ),
  );
}
