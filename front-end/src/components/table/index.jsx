import { useState, useRef } from "react"
import { HotTable } from "@handsontable/react"
import { registerAllModules } from "handsontable/registry"
import "handsontable/dist/handsontable.full.css"

// register Handsontable's modules
registerAllModules()

export const Table = () => {
  const hotRef = useRef(null)
  const [output, setOutput] = useState('Click "Load" to load data from server')

  const saveClickCallback = () => {
    setOutput("Data saved")
    console.log("The POST request is only used here for the demo purposes")
  }

  return (
    <div className="flex flex-col">
      <HotTable
        ref={hotRef}
        startRows={8}
        startCols={6}
        rowHeaders={true}
        colHeaders={true}
        height="auto"
        autoWrapRow={true}
        autoWrapCol={true}
        licenseKey="non-commercial-and-evaluation"
      />

      <div className="controls">
        &nbsp;
        <button
          className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-blueSecondary p-1 text-white transition duration-200 hover:cursor-pointer  active:bg-opacity-70"
          id="save"
          onClick={(...args) => saveClickCallback(...args)}
        >
          Save data
        </button>
      </div>
    </div>
  )
}
