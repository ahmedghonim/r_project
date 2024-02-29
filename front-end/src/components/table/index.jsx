import { useRef } from "react";
import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.css";

// register Handsontable's modules

const Table = ({
  setGetDataTable,
  selectedCategory,
  selectTypes,
  getDataTable,
  autoComplete,
}) => {
  registerAllModules();
  const hotRef = useRef(null);

  return (
    <>
      <HotTable
        data={getDataTable}
        autoColumnSize
        autoRowSize
        colHeaders={selectedCategory.map((item) => item.label)}
        ref={hotRef}
        startRows={1}
        columns={autoComplete}
        colWidths={100}
        width="100%"
        startCols={selectedCategory.map((item) => item.label).length}
        autoWrapCol={true}
        rowHeaders={true}
        height="auto"
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
