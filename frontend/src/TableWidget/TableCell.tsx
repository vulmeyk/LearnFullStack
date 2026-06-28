export function TableCell(
  rows,
  setRows,
  columns,
  rowIndex,
  colIndex,
  value,
  status,
  activeCell,
  setActiveCell,
  setEditingCell,
  setSelectedRange,
  isSelecting
) {
  switch (status) {
    case "edit":
      return (
        <input
          contentEditable="true"
          key={`${rowIndex}-${colIndex}`}
          className="cell"
          defaultValue={value}
          data-status={status}
          type={columns[colIndex].type ?? "string"}
          autoFocus
          onBlur={(e) => {
            const newRows = [...rows];
            newRows[rowIndex].values[colIndex] = e.target.value;
            setRows(newRows);
            setEditingCell(null);
          }}
        />
      );
    case "active":
      console.log("Нашли активную ячейку");
      return (
        <div
          key={`${rowIndex}-${colIndex}`}
          className="cell"
          data-status={status}
          onDoubleClick={() => {
            setEditingCell(activeCell);
          }}
          onMouseDown={() => {
            console.log("Нажатие на активную кнопку");
            console.log("Включаем выделение");
            isSelecting.current = true;
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
            console.log("   Нажатие на пустую кнопку");
            setActiveCell({ rowIndex: rowIndex, colIndex: colIndex });
            console.log("Фиксируем начало выделения");
            setSelectedRange({
              startRow: rowIndex,
              startColumn: colIndex,
              endRow: rowIndex,
              endColumn: colIndex,
            });
            console.log("Включаем выделение");
            isSelecting.current = true;
          }}
          onMouseEnter={() => {
            if (!isSelecting.current) return;
            console.log("Фиксируем конец выделения");
            setSelectedRange((prev) => ({
              ...prev,
              endRow: rowIndex,
              endColumn: colIndex,
            }));
          }}
        >
          {value}
        </div>
      );
  }
}
