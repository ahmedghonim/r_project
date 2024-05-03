import { useRef } from "react";
import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.css";

// register Handsontable's modules

/**
 * A strongly typed Table component that uses Handsontable library.
 *
 * @param {Object} props - The props object.
 * @param {React.Dispatch<React.SetStateAction<any[]>>} props.setGetDataTable - The function to set the getDataTable state.
 * @param {CategoryType[]} props.selectedCategory - The selected category.
 * @param {any[]} props.getDataTable - The getDataTable.
 * @param {CategoryType[]} props.autoComplete - The autoComplete.
 * @return {React.ReactElement} The Table component.
 */
const HandsonTable = ({
  setGetDataTable,
  selectedCategory,
  getDataTable,
  autoComplete,
}: {
  setGetDataTable: any;
  selectedCategory: any;
  getDataTable?: any[];
  autoComplete: any[];
}): React.ReactElement => {
  registerAllModules();
  const hotRef = useRef<any>(null);

  return (
    <>
      <HotTable
        data={getDataTable}
        autoColumnSize
        autoRowSize
        colHeaders={selectedCategory.map((item: any) => item.label)}
        ref={hotRef}
        startRows={1}
        columns={autoComplete}
        colWidths={100}
        width="100%"
        startCols={selectedCategory.map((item: any) => item.label).length}
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

export default HandsonTable;
