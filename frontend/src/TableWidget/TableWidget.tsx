import { useState, useRef } from "react";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import "./TableWidget.css";
import type { Row, IndexCell, SelectedRange } from "./types";

export default function TableWidget(props) {
  // console.log("               ");
  const [activeCell, setActiveCell] = useState<IndexCell | null>(null);
  const [selectedRange, setSelectedRange] = useState<SelectedRange | null>(
    null
  );

  const isSelecting = useRef<Boolean>(false);

  const [rows, setRows] = useState<Row[]>(props.rows);

  return (
    <div
      className="table"
      style={{ gridTemplateColumns: `repeat(${props.columns.length}, auto)` }}
      onCopy={() => console.log("111")}
    >
      <TableHeader
        columns={props.columns}
        setActiveCell={setActiveCell}
        setSelectedRange={setSelectedRange}
      />
      <TableBody
        columns={props.columns}
        rows={rows}
        setRows={setRows}
        activeCell={activeCell}
        setActiveCell={setActiveCell}
        isSelecting={isSelecting}
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
      />
    </div>
  );
}
