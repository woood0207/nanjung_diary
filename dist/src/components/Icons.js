const iconBase = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function CalendarIcon() {
  return React.createElement(
    "svg",
    iconBase,
    React.createElement("path", { d: "M8 2v4" }),
    React.createElement("path", { d: "M16 2v4" }),
    React.createElement("rect", { x: 3, y: 4, width: 18, height: 18, rx: 2 }),
    React.createElement("path", { d: "M3 10h18" }),
  );
}

export function BookOpenIcon() {
  return React.createElement(
    "svg",
    iconBase,
    React.createElement("path", { d: "M12 7v14" }),
    React.createElement("path", {
      d: "M3 18a1 1 0 0 1-1-1V5a2 2 0 0 1 2-2h5a3 3 0 0 1 3 3v15a3 3 0 0 0-3-3z",
    }),
    React.createElement("path", {
      d: "M21 18a1 1 0 0 0 1-1V5a2 2 0 0 0-2-2h-5a3 3 0 0 0-3 3v15a3 3 0 0 1 3-3z",
    }),
  );
}

export function SearchIcon() {
  return React.createElement(
    "svg",
    iconBase,
    React.createElement("circle", { cx: 11, cy: 11, r: 8 }),
    React.createElement("path", { d: "m21 21-4.3-4.3" }),
  );
}

export function SealIcon() {
  return React.createElement(
    "svg",
    { ...iconBase, fill: "currentColor", strokeWidth: 0 },
    React.createElement("path", {
      d: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm2.2 5.2v7.6h1.8V9.9h2v5.9h1.8V8.2H9.2Z",
    }),
  );
}
