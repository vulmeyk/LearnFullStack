export function TableCell(
  value,
  rowIndex,
  colIndex,
  status,
  activeCell,
  setActiveCell,
  setEditCell,
  rows,
  setRows,
  isSelecting,
  setSelectedRange
) {
  switch (status) {
    case "edit":
      // console.log("render editCell");
      return (
        <input
          key={`${rowIndex}-${colIndex}`}
          className="cell"
          data-status={status}
          defaultValue={value}
          autoFocus
          onBlur={(e) => {
            // console.log("save input");
            const newRows = [...rows];
            newRows[rowIndex].values[colIndex] = e.target.value;
            setRows(newRows);
            setEditCell(null);
          }}
        ></input>
      );

    case "active":
      // console.log("render activeCell");
      return (
        <div
          key={`${rowIndex}-${colIndex}`}
          className="cell"
          data-status={status}
          onDoubleClick={() => {
            // console.log("set edit");
            setEditCell({ rowIndex, colIndex });
          }}
        >
          {value}
        </div>
      );

    default:
      return (
        <div
          key={`${rowIndex}-${colIndex}`}
          className="cell"
          data-status={status}
          onMouseDown={() => {
            // console.log("set active");
            setActiveCell({ rowIndex, colIndex });
            isSelecting.current = true;
            setSelectedRange(null);
          }}
          onMouseEnter={() => {
            if (!isSelecting.current) return;
            setSelectedRange(() => ({
              startRowIndex: Math.min(rowIndex, activeCell.rowIndex),
              startColIndex: Math.min(colIndex, activeCell.colIndex),
              endRowIndex: Math.max(rowIndex, activeCell.rowIndex),
              endColIndex: Math.max(colIndex, activeCell.colIndex),
            }));
          }}
          onDoubleClick={() => {
            // console.log("set edit");
            setEditCell({ rowIndex, colIndex });
          }}
        >
          {value}
        </div>
      );
  }
}
