import { useReducer } from "react";
import { tableReducer } from "./TableState";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import "./TableWidget.css";
import type { TableWidgetProps } from "./types";

export default function TableWidget(props: TableWidgetProps) {
  // console.log("               ");
  const [state, dispatch] = useReducer(tableReducer, {
    activeCell: null,
    selectedRange: null,
    rows: props.rows,
  });

  const { rows } = state;

  const handleCopy = (e: React.ClipboardEvent) => {
    // console.log("start copy");
    if (state.activeCell?.editingValue != null) return;

    let startRowIndex: number;
    let endRowIndex: number;
    let startColIndex: number;
    let endColIndex: number;

    if (state.activeCell && !state.selectedRange) {
      startRowIndex = state.activeCell.rowIndex;
      endRowIndex = state.activeCell.rowIndex;
      startColIndex = state.activeCell.colIndex;
      endColIndex = state.activeCell.colIndex;
    } else if (state.selectedRange) {
      startRowIndex = state.selectedRange.start.rowIndex;
      endRowIndex = state.selectedRange.end.rowIndex;
      startColIndex = state.selectedRange.start.colIndex;
      endColIndex = state.selectedRange.end.colIndex;
    } else return;

    let plainTextRows = [];
    let htmlTextRows = [];

    for (let r = startRowIndex; r <= endRowIndex; r++) {
      let plainTextRow = [];
      let htmlTextRow = [];

      for (let c = startColIndex; c <= endColIndex; c++) {
        plainTextRow.push(rows[r].values[c] ?? "");
        htmlTextRow.push(`<td>${rows[r].values[c] ?? ""}</td>`);
      }
      plainTextRows.push(plainTextRow.join("\t"));
      htmlTextRows.push(`<tr>${htmlTextRow.join("")}</tr>`);
    }

    let plainText = plainTextRows.join("\n");
    let htmlText = `<table>${htmlTextRows.join("")}</table>`;

    const clipboardData = e.clipboardData;

    if (clipboardData) {
      e.preventDefault();

      clipboardData.setData("text/plain", plainText);
      clipboardData.setData("text/html", htmlText);
      // console.log("copied");
    } else {
      console.error("copy error");
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    dispatch({
      type: "PASTE_CELLS",
      payload: { plainText: e.clipboardData.getData("text/plain") },
    });
  };
  return (
    <div
      className="table"
      tabIndex={0}
      style={{ gridTemplateColumns: `repeat(${props.columns.length}, auto)` }}
      onCopy={handleCopy}
      onPaste={handlePaste}
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
