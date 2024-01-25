import { useEffect, useState, useRef } from "react"
import { HotTable } from "@handsontable/react"
import { registerAllModules } from "handsontable/registry"
import "handsontable/dist/handsontable.full.css"

// register Handsontable's modules
registerAllModules()

const Table = ({ setGetDataTable, selectedCategory }) => {
  const hotRef = useRef(null)

  return (
    <>
      <HotTable
        colHeaders={selectedCategory.map((item) => item.label)}
        ref={hotRef}
        startRows={1}
        columns={selectedCategory.map((item) => item.label)}
        width="100%"
        startCols={selectedCategory.map((item) => item.label).length}
        autoWrapCol={true}
        rowHeaders={true}
        licenseKey="non-commercial-and-evaluation"
        afterChange={() => {
          if (hotRef.current) {
            const hot = hotRef.current?.hotInstance
            setGetDataTable(hot.getData())
          }
        }}
      />
    </>
  )
}

export default Table
