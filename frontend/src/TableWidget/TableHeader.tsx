export function TableHeader({ columns, setSelectedRange, setActiveCell }) {
  return columns.map((column, colIndex) => (
    <div
      className="header"
      key={colIndex}
      onClick={() => {
        setActiveCell(null);
        setSelectedRange({
          startRow: 0,
          startColumn: colIndex,
          endRow: Infinity,
          endColumn: colIndex,
        });
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        console.log("ПКМ");
      }}
    >
      {column["header"]}
    </div>
  ));
}
