# 오늘의 난중일기

`난중일기.txt`를 파싱해 양력 월/일 기준으로 같은 날의 일기를 보여주는 React 데모입니다.

## 실행

```bash
node scripts/parseDiary.mjs
node server.mjs
```

브라우저에서 `http://localhost:4173`을 엽니다.

## 구조

- `scripts/parseDiary.mjs`: 원문 텍스트를 `public/diary.json`으로 변환합니다.
- `src/lib/diary.js`: 오늘 날짜, 양력 키 검색, 무작위 구절 선택 로직입니다.
- `src/components/DatePicker.js`: 양력 날짜 선택기입니다.
- `src/components/YearTabs.js`: 같은 양력 날짜의 여러 연도 기록 선택 탭입니다.
- `src/components/DiaryCard.js`: 두루마리/책 느낌의 일기 표시 카드입니다.
- `src/components/Icons.js`: 패키지 설치 없이 쓰는 Lucide 스타일 SVG 아이콘입니다.
- `src/App.js`: 전체 데이터 로딩과 화면 상태를 연결합니다.
