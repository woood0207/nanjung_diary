import fs from "node:fs";
import path from "node:path";

const SOURCE =
  process.argv[2] || "/Users/chanu/Downloads/난중일기.txt";
const OUTPUT =
  process.argv[3] || path.join(process.cwd(), "public", "diary.json");

const ganjiYear = {
  임진: 1592,
  계사: 1593,
  갑오: 1594,
  을미: 1595,
  병신: 1596,
  정유: 1597,
  무술: 1598,
};

const ganjiDayPattern =
  "갑자|을축|병인|정묘|무진|기사|경오|신미|임신|계유|갑술|을해|병자|정축|무인|기묘|경진|신사|임오|계미|갑신|을유|병술|정해|무자|기축|경인|신묘|임진|계사|갑오|을미|병신|정유|무술|기해|경자|신축|임인|계묘|갑진|을사|병오|정미|무신|기유|경술|신해|임자|계축|갑인|을묘|병진|정사|무오|기미|경신|신유|임술|계해";

const monthHeader = /^([가-힣]{2})년\s+(\d{1,2})월(?:\s*\((\d{4})년)?/;

const entryPatterns = [
  /^(?:(\d{4})년\s*)?(윤?\d{1,2})월\s*(?:초)?(\d{1,2})일(?:\d+\))?\s*\[\s*양력\s*(\d{1,2})월\s*(\d{1,2})일\s*\]\s*(?:<([^>)]*)[>)]\s*)?(.*)$/,
  /^(?:(\d{4})년\s*)?(윤?\d{1,2})월\s*(?:초)?(\d{1,2})일(?:\d+\))?\s*\[\s*([^/\]]+)\/\s*(?:(\d{4})년\s*)?(\d{1,2})월\s*(\d{1,2})일\s*\]\s*(.*)$/,
  /^\[\s*([^/\]]+)\/\s*(?:(\d{4})년\s*)?(\d{1,2})월\s*(\d{1,2})일\s*\]\s*(.*)$/,
];

function cleanLine(line) {
  return line.replace(/\f/g, "").replace(/\s+$/g, "");
}

function toNumber(value) {
  const normalized = String(value || "").replace(/[^\d]/g, "");
  return normalized ? Number(normalized) : null;
}

function normalizeBody(lines) {
  return [
    lines
    .map((line) => line.trim())
    .filter(Boolean)
      .join(" ")
      .replace(/\s{2,}/g, " "),
  ]
    .filter(Boolean)
    .join("\n");
}

function isValidSolarDate(year, month, day) {
  if (!year || !month || !day) return false;
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

function shouldSkipContent(text) {
  return (
    /^[-\s]+$/.test(text) ||
    /^(\d+\)|[①-⑳])/.test(text) ||
    /^『/.test(text) ||
    /^그래서 날짜는/.test(text)
  );
}

function parseEntry(line, currentYear, currentLunarMonth) {
  for (const pattern of entryPatterns) {
    const match = line.match(pattern);
    if (!match) continue;

    if (pattern === entryPatterns[0]) {
      const [, explicitYear, lunarMonthRaw, lunarDay, solarMonth, solarDay, ganji, rest] =
        match;
      const year = toNumber(explicitYear) || currentYear;
      return {
        year,
        lunarMonth: lunarMonthRaw,
        lunarDay: toNumber(lunarDay),
        solarMonth: toNumber(solarMonth),
        solarDay: toNumber(solarDay),
        ganji: ganji?.trim() || "",
        firstLine: rest?.trim() || "",
      };
    }

    if (pattern === entryPatterns[1]) {
      const [
        ,
        explicitYear,
        lunarMonthRaw,
        lunarDay,
        ganji,
        explicitSolarYear,
        solarMonth,
        solarDay,
        rest,
      ] = match;
      const year = toNumber(explicitSolarYear) || toNumber(explicitYear) || currentYear;
      return {
        year,
        lunarMonth: lunarMonthRaw,
        lunarDay: toNumber(lunarDay),
        solarMonth: toNumber(solarMonth),
        solarDay: toNumber(solarDay),
        ganji: ganji?.trim() || "",
        firstLine: rest?.trim() || "",
      };
    }

    const [, ganji, explicitSolarYear, solarMonth, solarDay, rest] = match;
    const solarYear = toNumber(explicitSolarYear) || currentYear;
    return {
      year: solarYear,
      lunarMonth: currentLunarMonth ? String(currentLunarMonth) : "",
      lunarDay: null,
      solarMonth: toNumber(solarMonth),
      solarDay: toNumber(solarDay),
      ganji: ganji?.trim() || "",
      firstLine: rest?.trim() || "",
    };
  }

  return null;
}

function looksLikeEntry(line) {
  const normalized = line.replace(/\s/g, "");
  return (
    /^\d{4}년/.test(line) ||
    /^윤?\d{1,2}월/.test(normalized) ||
    new RegExp(`^\\[(${ganjiDayPattern})\\/`).test(normalized)
  );
}

function parseDiary(text) {
  const lines = text.split(/\r?\n/).map(cleanLine);
  const entries = [];
  let currentYear = null;
  let currentLunarMonth = null;
  let active = null;

  function flush() {
    if (!active) return;
    active.content = normalizeBody(active.bodyLines);
    delete active.bodyLines;
    if (
      isValidSolarDate(active.year, active.solarMonth, active.solarDay) &&
      active.content
    ) {
      active.id = `${active.year}-${String(active.solarMonth).padStart(2, "0")}-${String(
        active.solarDay,
      ).padStart(2, "0")}-${entries.length}`;
      active.solarKey = `${String(active.solarMonth).padStart(2, "0")}-${String(
        active.solarDay,
      ).padStart(2, "0")}`;
      active.lunarLabel = `${active.lunarMonth}월${
        active.lunarDay ? ` ${active.lunarDay}일` : ""
      }`;
      entries.push(active);
    }
    active = null;
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    const header = line.match(monthHeader);
    if (header) {
      const [, ganji, month, yearText] = header;
      const parsedYear = toNumber(yearText);
      currentYear =
        parsedYear && parsedYear >= 1500 && parsedYear <= 1600
          ? parsedYear
          : ganjiYear[ganji] || currentYear;
      currentLunarMonth = toNumber(month);
      continue;
    }

    const parsed = parseEntry(line, currentYear, currentLunarMonth);
    if (parsed) {
      flush();
      active = {
        ...parsed,
        bodyLines: parsed.firstLine ? [parsed.firstLine] : [],
      };
      delete active.firstLine;
      continue;
    }

    if (!active || shouldSkipContent(line)) continue;
    if (looksLikeEntry(line)) continue;
    active.bodyLines.push(line);
  }

  flush();
  return entries.sort(
    (a, b) =>
      a.solarMonth - b.solarMonth ||
      a.solarDay - b.solarDay ||
      a.year - b.year,
  );
}

const sourceText = fs.readFileSync(SOURCE, "utf8");
const entries = parseDiary(sourceText);
fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
fs.writeFileSync(OUTPUT, `${JSON.stringify(entries, null, 2)}\n`, "utf8");

console.log(`Parsed ${entries.length} diary entries`);
console.log(`Wrote ${OUTPUT}`);
