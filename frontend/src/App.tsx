// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import "./App.css";
import TableWidget from "./TableWidget/TableWidget";

function App() {
  const tableColumns = [
    { header: "Столбец_1", type: "number" },
    { header: "Столбец_2", type: "text" },
    { header: "Столбец_3", type: "text" },
    { header: "Столбец_4", type: "text" },
    { header: "Столбец_4", type: "text" },
    { header: "Столбец_5", type: "number" },
    { header: "Столбец_6", type: "text" },
    { header: "Столбец_7", type: "text" },
    { header: "Столбец_8", type: "text" },
    { header: "Столбец_9", type: "text" },
    { header: "Столбец_10", type: "number" },
    { header: "Столбец_11", type: "text" },
    { header: "Столбец_12", type: "text" },
    { header: "Столбец_13", type: "text" },
  ];
  const tableRows = Array.from({ length: 50 }, () => ({
    values: Array(tableColumns.length).fill(""),
    valids: Array(tableColumns.length).fill(true),
  }));

  return (
    <>
      <h1>Заголовок</h1>
      <TableWidget columns={tableColumns} rows={tableRows} />
    </>
  );
}

export default App;
