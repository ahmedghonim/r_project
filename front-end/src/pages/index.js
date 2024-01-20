import Image from "next/image"
import { Inter } from "next/font/google"
import { useState } from "react"
import { useGetQuery, usePostQuery } from "@/hooks/useQueryHooks"
import { Table } from "@/components/table"
import InputField from "@/components/fields/InputField"
import Switch from "@/components/switch"
import ReactSelect from "react-select"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const [firstInput, setFirstInput] = useState({})
  const [selectedCategory, setSelectedCategory] = useState([])
  const { mutateAsync, isLoading } = usePostQuery({
    url: "/eligible_functions",
  })
  console.log("selectedCategory >>>> ", selectedCategory)
  const [category, setCategory] = useState([])
  async function handleFirstInput() {
    try {
      const { data } = await mutateAsync(firstInput)
      console.log("data >>>> ", data)
      const keys = data[0][1]
      const values = data[0][0]
      const categoryValue = keys.map((key, i) => {
        return { value: values[i], label: key }
      })
      console.log("categoryValue >>>> ", categoryValue)
      setCategory(categoryValue)
    } catch (e) {
      console.log(e)
    }
  }
  const data = useGetQuery("/health-check", "/health-check", {})

  return (
    <div>
      {/* Card widget */}

      <div className="my-10 flex flex-grow items-end gap-14">
        <div className="flex items-center gap-3">
          <Switch
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
            className="cursor-pointer text-base font-medium text-navy-700 dark:text-white"
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
              href=""
              className="linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
            >
              Next
            </button>
          </div>
        )}
        {category.length !== 0 && (
          <div>
            <label
              htmlFor={"colors"}
              className={`text-sm text-navy-700 dark:text-white `}
            >
              Category
            </label>

            <ReactSelect
              isMulti
              name="colors"
              value={selectedCategory}
              options={category}
              onChange={(e) => {
                setSelectedCategory(e)
              }}
              className="basic-multi-select w-[300px] "
              classNamePrefix="select"
            />
          </div>
        )}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <Table />
      </div>

      {/* Tables & Charts */}
    </div>
  )
}
