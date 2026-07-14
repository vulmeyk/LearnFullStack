import { useState, useRef } from "react";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import "./TableWidget.css";
import type { TableWidgetProps, Row, CellIndex, SelectedRange } from "./types";

export default function TableWidget(props: TableWidgetProps) {
  // console.log("               ");
  const [activeCell, setActiveCell] = useState<CellIndex | null>(null);
  const [selectedRange, setSelectedRange] = useState<SelectedRange | null>(
    null,
  );
  const isSelecting = useRef<boolean>(false);
  const [rows, setRows] = useState<Row[]>(props.rows);

  const handleCopy = async () => {
    console.log("copied");
  };

  return (
    <div
      className="table"
      style={{ gridTemplateColumns: `repeat(${props.columns.length}, auto)` }}
      onCopy={handleCopy}
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
