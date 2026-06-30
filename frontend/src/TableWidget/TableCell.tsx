export function TableCell(value, rowIndex, colIndex, status, setActiveCell) {
  return (
    <div
      key={`${rowIndex}-${colIndex}`}
      className="cell"
      data-status={status}
      onMouseDown={() => setActiveCell({ rowIndex, colIndex })}
    >
      {value}
    </div>
  );
}
