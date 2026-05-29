export function YearTabs({ entries, selectedYear, onSelect }) {
  if (entries.length <= 1) return null;

  return React.createElement(
    "div",
    { className: "flex flex-wrap gap-2" },
    entries.map((entry) =>
      React.createElement(
        "button",
        {
          key: entry.id,
          type: "button",
          onClick: () => onSelect(entry.year),
          className: [
            "rounded-full border px-4 py-2 text-sm font-semibold transition",
            selectedYear === entry.year
              ? "border-[#8B0000] bg-[#8B0000] text-[#F4F1EA] shadow-sm"
              : "border-[#1A1A1A]/15 bg-transparent text-[#333333] hover:border-[#8B0000]/50 hover:text-[#8B0000]",
          ].join(" "),
        },
        `${entry.year}년`,
      ),
    ),
  );
}
