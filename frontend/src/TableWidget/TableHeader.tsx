export function TableHeader({ columns, setActiveCell, setSelectedRange }) {
  return columns.map((column, colIndex) => (
    <div
      className="header"
      key={colIndex}
      onClick={() => {
        // console.log("click on header");
        setActiveCell(null);
        setSelectedRange({
          startRowIndex: 0,
          startColIndex: colIndex,
          endRowIndex: Infinity,
          endColIndex: colIndex,
        });
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        // console.log("ПКМ");
      }}
    >
      {column["header"]}
    </div>
  ));
}
