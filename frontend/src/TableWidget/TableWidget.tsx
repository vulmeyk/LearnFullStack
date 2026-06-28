import { useRef, useState } from "react";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import "./TableWidget.css";
import type { Row, IndexCell, SelectedRange } from "./types";

export default function TableWidget(props) {
  const isSelecting = useRef<Boolean>(false);
  const [editingCell, setEditingCell] = useState<IndexCell | null>(null);

  const [activeCell, setActiveCell] = useState<IndexCell | null>(null);

  const [selectedRange, setSelectedRange] = useState<SelectedRange | null>(
    null
  );

  const [rows, setRows] = useState<Row[]>(props.rows);

  return (
    <div
      className="table"
      style={{ gridTemplateColumns: `repeat(${props.columns.length}, auto)` }}
    >
      <TableHeader
        columns={props.columns}
        setSelectedRange={setSelectedRange}
        setActiveCell={setActiveCell}
      />
      <TableBody
        columns={props.columns}
        rows={rows}
        setRows={setRows}
        isSelecting={isSelecting}
        activeCell={activeCell}
        setActiveCell={setActiveCell}
        editingCell={editingCell}
        setEditingCell={setEditingCell}
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
      />
    </div>
  );
}
