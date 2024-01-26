import Image from "next/image"
import { Inter } from "next/font/google"
import { useState } from "react"
import { useGetQuery, usePostQuery } from "@/hooks/useQueryHooks"
import Table from "@/components/table"
import InputField from "@/components/fields/InputField"
import Switch from "@/components/switch"
import ReactSelect from "react-select"
import Header from "@/components/Header"
import ScrollUp from "@/components/Common/ScrollUp"
import { zipObject } from "lodash"
const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const [firstInput, setFirstInput] = useState({
    current_prepost: "0",
  })
  const [selectedCategory, setSelectedCategory] = useState([])
  const [selectTypes, setSelectTypes] = useState([])
  const [inputParams, setInputParams] = useState(null)
  const [funcIdsValues, setFuncIdsValues] = useState(null)
  const [outputVariables, setOutputVariables] = useState(null)

  const [getDataTable, setGetDataTable] = useState([])
  const { mutateAsync, isLoading } = usePostQuery({
    url: "/eligible_functions",
  })

  const { mutateAsync: mutateFuncId, isLoading: isLoadingFuncId } =
    usePostQuery({
      url: "/Func_IDs",
    })
  const {
    mutateAsync: mutateHandleOutputVariables,
    isLoading: isLoadingOutputVariables,
  } = usePostQuery({
    url: "/Output_variables",
  })

  const { mutateAsync: mutateHandleScripts, isLoading: isLoadingScripts } =
    usePostQuery({
      url: "/scripts/Task_manager",
    })

  const [category, setCategory] = useState([])

  async function handleFirstInput() {
    try {
      const { data } = await mutateAsync(firstInput)
      const keys = data[0][1]
      const values = data[0][0]
      const categoryValue = keys.map((key, i) => {
        return { value: values[i], label: key }
      })
      setInputParams(data[1])

      setCategory(categoryValue)
      setSelectTypes(data[2])
    } catch (e) {
      console.log(e)
    }
  }

  async function handleFunc_IDs() {
    const categoryValue = selectedCategory.map((item) => {
      return item.value
    })
    try {
      const { data } = await mutateFuncId({
        user_inputs: JSON.stringify(categoryValue),
        input_params: JSON.stringify(inputParams),
      })
      setFuncIdsValues(data)

      const { data: outputVariables } = await mutateHandleOutputVariables({
        funcIDs: JSON.stringify(data[1]),
      })
      setOutputVariables(outputVariables)
    } catch (e) {
      console.log(e)
    }
  }

  async function handleScripts() {
    const values = selectedCategory.map((item) => item.value)
    const df = getDataTable.map((row) => {
      const newRow = row.map((item) => item || "NA")

      return zipObject(values, newRow)
    })

    console.log("df >>>> ", df)
    try {
      const { data } = await mutateHandleScripts({
        df: JSON.stringify(df),
        funcIDs: JSON.stringify(funcIdsValues[1]),
        current_outputs: JSON.stringify(outputVariables),
        current_prepost: firstInput.current_prepost,
      })
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className="relative z-10 h-screen bg-gray-dark">
      <Header className={"bg-gray-dark"} />
      <ScrollUp />

      <div className="px-20 relative z-10 pt-28">
        <div className=" flex flex-grow items-end gap-14">
          <div className="flex items-center gap-3">
            <Switch
              color="blue"
              id="current_prepost"
              name="current_prepost"
              onChange={(e) => {
                console.log(e.target.checked)

                setFirstInput({
                  ...firstInput,
                  current_prepost: e.target.checked ? "1" : "0",
                })
              }}
            />
            <label
              for="current_prepost"
              className="cursor-pointer text-base font-medium text-dark"
            >
              Current Prepost
            </label>
          </div>
          <div className="w-[150px]">
            <InputField
              label="Current Groups"
              name="current_groups"
              max={10}
              min={0}
              value={+firstInput.current_groups}
              type="number"
              onChange={(e) => {
                setFirstInput({
                  ...firstInput,
                  current_groups: e.target.value.toString(),
                })
              }}
            />
          </div>
          {category.length === 0 && (
            <div>
              <button
                onClick={handleFirstInput}
                className="linear rounded-[20px] bg-blue-500 px-4 py-2 text-base font-medium  transition duration-200 hover:bg-brand-800 active:bg-brand-700 text-dark "
              >
                Next
              </button>
            </div>
          )}

          {category.length !== 0 && (
            <div>
              <label
                htmlFor={"colors"}
                className={`text-sm text-navy-700 text-white `}
              >
                Category
              </label>

              <ReactSelect
                isMulti
                name="colors"
                value={selectedCategory}
                // filter if add in selectedCategory
                options={category.filter(
                  (item) => !selectedCategory.includes(item)
                )}
                onChange={(e) => {
                  setSelectedCategory(e)
                }}
                className="basic-multi-select w-[400px] z-10"
                classNamePrefix="select"
              />
            </div>
          )}
          {selectedCategory.length !== 0 && (
            <div>
              <button
                onClick={() => {
                  handleFunc_IDs()
                }}
                className="linear rounded-[20px] bg-blue-500 px-4 py-2 text-base font-medium  transition duration-200 hover:bg-brand-800 active:bg-brand-700 text-dark "
              >
                Next
              </button>
            </div>
          )}
        </div>

        <div className="mt-5 w-full">
          <Table
            selectedCategory={selectedCategory}
            setGetDataTable={setGetDataTable}
            selectTypes={selectTypes}
          />
        </div>
        <button
          // className="linear rounded-[20px] bg-blue-500 px-4 py-2 text-base font-medium  transition duration-200 hover:bg-brand-800 active:bg-brand-700 text-dark "
          onClick={handleScripts}
        >
          Submit
        </button>
      </div>
    </div>
  )
}
