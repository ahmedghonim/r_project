import { useEffect, useState, useRef } from "react";
import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.css";

// register Handsontable's modules
registerAllModules();

const Table = ({ setGetDataTable, selectedCategory, selectTypes }) => {
  const hotRef = useRef(null);

  return (
    <>
      <HotTable
        colHeaders={selectedCategory.map((item) => item.label)}
        ref={hotRef}
        startRows={1}
        columns={selectedCategory.map((item, index) => ({
          [item.value]: selectTypes[index],
        }))}
        width="100%"
        startCols={selectedCategory.map((item) => item.label).length}
        autoWrapCol={true}
        rowHeaders={true}
        manualColumnResize={true}
        autoWrapRow={true}
        licenseKey="non-commercial-and-evaluation"
        afterChange={() => {
          if (hotRef.current) {
            const hot = hotRef.current?.hotInstance;
            setGetDataTable(hot.getData());
          }
        }}
      />
    </>
  );
};

export default Table;
