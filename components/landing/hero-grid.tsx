const CELL = 101;
const COLUMNS = 13;
const ROWS = 5;

const CELLS: { col: number; row: number }[] = [];

for (let col = 0; col < COLUMNS; col += 1) CELLS.push({ col, row: 0 });
for (const row of [1, 2]) {
  CELLS.push({ col: 0, row }, { col: COLUMNS - 1, row });
}
for (const row of [3, 4]) {
  for (const col of [0, 1, 2, 10, 11, 12]) CELLS.push({ col, row });
}

const MARKS: { col: number; row: number; kind: "dot" | "square" }[] = [
  { col: 1, row: 0, kind: "dot" },
  { col: 4, row: 0, kind: "square" },
  { col: 8, row: 0, kind: "dot" },
  { col: 11, row: 0, kind: "square" },
  { col: 0, row: 2, kind: "dot" },
  { col: 12, row: 1, kind: "dot" },
  { col: 1, row: 4, kind: "dot" },
  { col: 11, row: 3, kind: "square" },
];

function Joint({ x, y }: { x: number; y: number }) {
  return (
    <svg
      aria-hidden
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
      style={{ left: x, top: y }}
      width="47"
      height="47"
      viewBox="0 0 47 47"
      fill="none"
    >
      <circle cx="23.5" cy="23.5" r="23" fill="#f9f9f9" stroke="#ededed" />
      <path
        d="M24 18C24 21.3137 26.6863 24 30 24H34V25H30C26.6863 25 24 27.6863 24 31V35H23V31C23 27.6863 20.3137 25 17 25H13V24H17C20.3137 24 23 21.3137 23 18V14H24V18Z"
        fill="#2563eb"
      />
    </svg>
  );
}

export function HeroGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-0 left-1/2 hidden h-full w-screen -translate-x-1/2 overflow-hidden lg:block"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: CELL * COLUMNS, height: CELL * ROWS }}
      >
        {CELLS.map(({ col, row }) => (
          <span
            key={`${col}-${row}`}
            className="absolute rounded-[7px] border border-border"
            style={{
              left: col * CELL,
              top: row * CELL,
              width: CELL + 1,
              height: CELL + 1,
            }}
          />
        ))}
        {MARKS.map((mark) => (
          <span
            key={`${mark.kind}-${mark.col}-${mark.row}`}
            className={
              mark.kind === "dot"
                ? "absolute size-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/20"
                : "absolute size-[5px] -translate-x-1/2 -translate-y-1/2 bg-black/15"
            }
            style={{
              left: mark.col * CELL + CELL / 2,
              top: mark.row * CELL + CELL / 2,
            }}
          />
        ))}
        <Joint x={3 * CELL} y={CELL} />
        <Joint x={10 * CELL} y={CELL} />
      </div>
    </div>
  );
}
