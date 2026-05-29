export function todayMonthDay() {
  const today = new Date();
  return {
    month: today.getMonth() + 1,
    day: today.getDate(),
  };
}

export function keyOf(month, day) {
  return `${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function formatSolar(month, day) {
  return `${month}월 ${day}일`;
}

export function formatDateInput(month, day) {
  const year = 2024;
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function parseDateInput(value) {
  if (!value) return todayMonthDay();
  const [, month, day] = value.split("-").map(Number);
  return { month, day };
}

export function getEntriesBySolarDate(entries, month, day) {
  const key = keyOf(month, day);
  return entries.filter((entry) => entry.solarKey === key);
}

export function getRandomEntry(entries, month, day) {
  if (!entries.length) return null;
  const seed = month * 100 + day;
  const index = (seed * 37 + 11) % entries.length;
  return entries[index];
}

export function getStats(entries) {
  const years = Array.from(new Set(entries.map((entry) => entry.year))).sort();
  const days = new Set(entries.map((entry) => entry.solarKey)).size;
  return { years, days };
}
