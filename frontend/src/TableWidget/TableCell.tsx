export function TableCell(
  value,
  rowIndex,
  colIndex,
  status,
  setActiveCell,
  setEditCell,
  rows,
  setRows
) {
  switch (status) {
    case "edit":
      console.log("render editCell");
      return (
        <input
          key={`${rowIndex}-${colIndex}`}
          className="cell"
          data-status={status}
          defaultValue={value}
          autoFocus
          onBlur={(e) => {
            console.log("save input");
            const newRows = [...rows];
            newRows[rowIndex].values[colIndex] = e.target.value;
            setRows(newRows);
            setEditCell(null);
          }}
        ></input>
      );

    case "active":
      console.log("render activeCell");
      return (
        <div
          key={`${rowIndex}-${colIndex}`}
          className="cell"
          data-status={status}
          onDoubleClick={() => {
            console.log("set edit");
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
            console.log("set active");
            setActiveCell({ rowIndex, colIndex });
          }}
        >
          {value}
        </div>
      );
  }
}
