import { useState } from "react";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import "./TableWidget.css";
import type { Row, IndexCell } from "./types";

export default function TableWidget(props) {
  console.log("               ");
  const [activeCell, setActiveCell] = useState<IndexCell | null>(null);

  const [rows, setRows] = useState<Row[]>(props.rows);

  return (
    <div
      className="table"
      style={{ gridTemplateColumns: `repeat(${props.columns.length}, auto)` }}
    >
      <TableHeader columns={props.columns} setActiveCell={setActiveCell} />
      <TableBody
        columns={props.columns}
        rows={rows}
        setRows={setRows}
        activeCell={activeCell}
        setActiveCell={setActiveCell}
      />
    </div>
  );
}
