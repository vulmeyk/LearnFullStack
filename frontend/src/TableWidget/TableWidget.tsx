import { useReducer } from "react";
import { tableReducer } from "./TableState";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import "./TableWidget.css";
import type { TableWidgetProps } from "./types";

export default function TableWidget(props: TableWidgetProps) {
  console.log("               ");
  const [state, dispatch] = useReducer(tableReducer, {
    activeCell: null,
    editCell: null,

    selectedRange: null,
    rows: props.rows,
  });

  const { rows } = state;

  // const handleCopy = (e: React.ClipboardEvent) => {
  //   // console.log("start copy");
  //   if (editCell) return;

  //   let startRowIndex: number;
  //   let endRowIndex: number;
  //   let startColIndex: number;
  //   let endColIndex: number;

  //   if (activeCell && !selectedRange) {
  //     startRowIndex = activeCell.rowIndex;
  //     endRowIndex = activeCell.rowIndex;
  //     startColIndex = activeCell.colIndex;
  //     endColIndex = activeCell.colIndex;
  //   } else if (selectedRange) {
  //     startRowIndex = selectedRange.start.rowIndex;
  //     endRowIndex = selectedRange.end.rowIndex;
  //     startColIndex = selectedRange.start.colIndex;
  //     endColIndex = selectedRange.end.colIndex;
  //   } else return;

  //   let plainTextRows = [];
  //   let htmlTextRows = [];

  //   for (let r = startRowIndex; r <= endRowIndex; r++) {
  //     let plainTextRow = [];
  //     let htmlTextRow = [];

  //     for (let c = startColIndex; c <= endColIndex; c++) {
  //       plainTextRow.push(rows[r].values[c] ?? "");
  //       htmlTextRow.push(`<td>${rows[r].values[c] ?? ""}</td>`);
  //     }
  //     plainTextRows.push(plainTextRow.join("\t"));
  //     htmlTextRows.push(`<tr>${htmlTextRow.join("")}</tr>`);
  //   }

  //   let plainText = plainTextRows.join("\n");
  //   let htmlText = `<table>${htmlTextRows.join("")}</table>`;

  //   const clipboardData = e.clipboardData;

  //   if (clipboardData) {
  //     e.preventDefault();

  //     clipboardData.setData("text/plain", plainText);
  //     clipboardData.setData("text/html", htmlText);
  //     // console.log("copied");
  //   } else {
  //     console.error("copy error");
  //   }
  // };

  // const handlePaste = (e: React.ClipboardEvent) => {
  //   // console.log("start paste");
  //   if (!activeCell) return;

  //   e.preventDefault();

  //   const plainText = e.clipboardData.getData("text/plain");

  //   if (!plainText) return;

  //   setRows((prevRows) => {
  //     const newRows = prevRows.map((row: Row) => ({
  //       values: [...row.values],
  //       valids: [...row.valids],
  //     }));

  //     plainText.split("\n").forEach((rowString: string, rowIndex: number) => {
  //       const targetRowIndex = activeCell.rowIndex + rowIndex;
  //       if (targetRowIndex >= props.rows.length) return;
  //       rowString.split("\t").forEach((cellValue: string, colIndex: number) => {
  //         const targetColIndex = activeCell.colIndex + colIndex;
  //         if (targetColIndex >= props.columns.length) return;
  //         newRows[targetRowIndex].values[targetColIndex] = cellValue;
  //         newRows[targetRowIndex].valids[targetColIndex] = true;
  //       });
  //     });
  //     return newRows;
  //   });
  //   // console.log("pasted");
  // };
  return (
    <div
      className="table"
      tabIndex={0}
      style={{ gridTemplateColumns: `repeat(${props.columns.length}, auto)` }}
      // onCopy={handleCopy}
      // onPaste={handlePaste}
    >
      <TableHeader
        columns={props.columns}
        dispatch={dispatch}
        maxRowIndex={rows.length - 1}
      />
      <TableBody columns={props.columns} state={state} dispatch={dispatch} />
    </div>
  );
}
