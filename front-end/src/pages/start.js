import { useState } from "react";
import { usePostQuery, useGetQuery } from "@/hooks/useQueryHooks";
import Table from "@/components/table";
import InputField from "@/components/fields/InputField";
import Switch from "@/components/switch";
import ReactSelect from "react-select";
import Header from "@/components/Header";
import ScrollUp from "@/components/Common/ScrollUp";
import { keys, zipObject } from "lodash";
import { HotTable } from "@handsontable/react";

export default function Home() {
  const [firstInput, setFirstInput] = useState({
    current_prepost: "0",
  });
  const [openSelect, setOpenSelect] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectTypes, setSelectTypes] = useState([]);
  const [inputParams, setInputParams] = useState(null);
  const [funcIdsValues, setFuncIdsValues] = useState(null);
  const [outputVariables, setOutputVariables] = useState(null);

  const [getDataTable, setGetDataTable] = useState([]);
  const [tableResult, setTableResult] = useState([]);
  const { mutateAsync, isLoading } = usePostQuery({
    url: "/eligible_functions",
  });
  const { data: availableCategoriesData } = useGetQuery(
    "/available_categories",
    "/available_categories",
    {
      select: ({ data }) =>
        data.map((item) => ({ value: item.ID, label: item.Name })),
    }
  );

  const { data: labData } = useGetQuery("/labs", "/labs", {});

  const { mutateAsync: mutateFuncId, isLoading: isLoadingFuncId } =
    usePostQuery({
      url: "/Func_IDs",
    });

  const { mutateAsync: mutateHandleOutputVariables } = usePostQuery({
    url: "/Output_variables",
  });

  const { mutateAsync: mutateHandleScripts } = usePostQuery({
    url: "/scripts/Task_manager",
  });

  const [category, setCategory] = useState([]);

  async function handleFirstInput() {
    try {
      const { data } = await mutateAsync(firstInput);
      const keys = data[0][1];
      const values = data[0][0];
      const categoryValue = keys.map((key, i) => {
        return { value: values[i], label: key };
      });
      setInputParams(data[1]);

      setCategory(categoryValue);
      setSelectTypes(data[2]);
    } catch (e) {
      console.log(e);
    }
  }

  //FuncIDs
  async function handleFunc_IDs() {
    const categoryValue = selectedCategory.map((item) => {
      return item.value;
    });
    try {
      const { data } = await mutateFuncId({
        user_inputs: JSON.stringify(categoryValue),
        input_params: JSON.stringify(inputParams),
      });
      setFuncIdsValues(data);
      const { data: outputVariables } = await mutateHandleOutputVariables({
        funcIDs: JSON.stringify(data[1]),
      });
      setOutputVariables(outputVariables);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleScripts() {
    const values = selectedCategory.map((item) => item.value);
    const df = getDataTable.map((row) => {
      let newRow = row.map((item) => item || "NA");
      newRow = newRow.map((item) =>
        typeof item === "number" ? parseFloat(item) : item
      );
      return zipObject(values, newRow);
    });

    try {
      const { data } = await mutateHandleScripts({
        df: JSON.stringify(df),
        funcIDs: JSON.stringify(funcIdsValues[1]),
        current_outputs: JSON.stringify(outputVariables),
        current_prepost: firstInput.current_prepost,
        category: firstInput.category,
      });
      setTableResult(data);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="relative z-10 h-screen bg-gray-dark">
      <Header className={"bg-gray-dark"} />
      <ScrollUp />

      <div className="px-20 relative z-10 pt-28 w-full">
        <button
          onClick={() => {
            setFirstInput({
              current_prepost: "0",
            });
            setCategory([]);
            setSelectedCategory([]);
            setSelectTypes([]);
            setInputParams([]);
            setFuncIdsValues([]);
            setOutputVariables(null);
            setGetDataTable([]);
            setTableResult([]);
          }}
          className="linear rounded-[20px] my-10 bg-blue-500 px-4 py-2 text-base font-medium  transition duration-200 hover:bg-brand-800 active:bg-brand-700 text-dark "
        >
          Reset
        </button>
        <div className=" w-[95%] flex justify-center flex-col items-center">
          <div className="flex items-end gap-7">
            {category.length < 1 && (
              <>
                <div className="flex items-center gap-3">
                  <Switch
                    color="blue"
                    id="current_prepost"
                    name="current_prepost"
                    onChange={(e) => {
                      console.log(e.target.checked);

                      setFirstInput({
                        ...firstInput,
                        current_prepost: e.target.checked ? "1" : "0",
                      });
                    }}
                  />
                  <label
                    for="current_prepost"
                    className="cursor-pointer text-base font-medium text-white"
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
                      });
                    }}
                  />
                </div>

                <div className="min-w-[200px]">
                  <label
                    htmlFor={"colors"}
                    className={`text-sm text-navy-700 text-white `}
                  >
                    Category
                  </label>

                  <ReactSelect
                    name="Category"
                    // filter if add in selectedCategory
                    options={availableCategoriesData}
                    onChange={(e) => {
                      setFirstInput({
                        ...firstInput,
                        category: e.value.toString(),
                      });
                    }}
                    className="basic-multi-select z-10"
                    classNamePrefix="select"
                    onBlur={() => setOpenSelect(false)}
                    onFocus={() => setOpenSelect(true)}
                    menuIsOpen={openSelect}
                  />
                </div>

                <div>
                  <button
                    onClick={handleFirstInput}
                    className="linear rounded-[20px] bg-blue-500 px-4 py-2 text-base font-medium  transition duration-200 hover:bg-brand-800 active:bg-brand-700 text-dark "
                  >
                    Next
                  </button>
                </div>
              </>
            )}
            {category.length !== 0 && !outputVariables && (
              <>
                <div>
                  <label
                    htmlFor={"colors"}
                    className={`text-sm text-navy-700 text-white `}
                  >
                    Variables
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
                      setSelectedCategory(e);
                    }}
                    className="basic-multi-select w-[400px] z-10"
                    classNamePrefix="select"
                    onBlur={() => setOpenSelect(false)}
                    onFocus={() => setOpenSelect(true)}
                    menuIsOpen={openSelect}
                  />
                </div>

                <button
                  onClick={() => {
                    handleFunc_IDs();
                  }}
                  className="linear rounded-[20px] bg-blue-500 px-4 py-2 text-base font-medium  transition duration-200 hover:bg-brand-800 active:bg-brand-700 text-dark "
                >
                  Next
                </button>
              </>
            )}
          </div>
          {outputVariables && (
            <>
              <div className="my-5 w-full">
                <Table
                  selectedCategory={selectedCategory}
                  setGetDataTable={setGetDataTable}
                  selectTypes={selectTypes}
                />
              </div>
              {tableResult.length < 1 && (
                <button
                  className="linear rounded-[20px] mt-10 bg-blue-500 px-4 py-2 text-base font-medium  transition duration-200 hover:bg-brand-800 active:bg-brand-700 text-dark "
                  onClick={handleScripts}
                >
                  Submit
                </button>
              )}
            </>
          )}
          {tableResult.length > 1 && (
            <HotTable
              data={tableResult}
              columns={selectedCategory.map((item, index) => ({
                [item.value]: selectTypes[index],
              }))}
              colHeaders={keys(tableResult[0])}
              width="100%"
              licenseKey="non-commercial-and-evaluation"
            />
          )}
        </div>
      </div>
    </div>
  );
}
