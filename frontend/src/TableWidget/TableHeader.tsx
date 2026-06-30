export function TableHeader({ columns, setActiveCell }) {
  return columns.map((column, colIndex) => (
    <div
      className="header"
      key={colIndex}
      onClick={() => {
        setActiveCell(null);
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
