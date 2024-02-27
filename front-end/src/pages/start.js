import { useState, useEffect } from "react";
import { usePostQuery, useGetQuery } from "@/hooks/useQueryHooks";
import Table from "@/components/table";
import InputField from "@/components/fields/InputField";
import Switch from "@/components/switch";
import ReactSelect from "react-select";
import Header from "@/components/Header";
import ScrollUp from "@/components/Common/ScrollUp";
import { keys, zipObject } from "lodash";
import { HotColumn, HotTable } from "@handsontable/react";
import "handsontable/dist/handsontable.full.min.css";
import { registerAllModules } from "handsontable/registry";

export default function Home() {
  registerAllModules();
  const [firstInput, setFirstInput] = useState({
    current_prepost: "0",
  });
  const [openSelect, setOpenSelect] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectTypes, setSelectTypes] = useState([]);
  const [inputParams, setInputParams] = useState(null);
  const [funcIdsValues, setFuncIdsValues] = useState(null);
  const [outputVariables, setOutputVariables] = useState(null);
  const [localCategoryResult, setLocalCategoryResult] = useState([]);
  const [localSelectedCategory, setLocalSelectedCategory] = useState([]);
  const [localDataResult, setLocalDataResult] = useState([]);
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
  useEffect(() => {
    const oldLocalGetDataTable = localStorage.getItem("getDataTable");
    const oldLocalData = localStorage.getItem("tableResult");
    const oldLocalSelectedCategory = localStorage.getItem("selectedCategory");
    if (oldLocalGetDataTable) {
      setLocalCategoryResult(JSON.parse(oldLocalGetDataTable));
    }
    if (oldLocalData) {
      setLocalDataResult(JSON.parse(oldLocalData));
    }
    if (oldLocalSelectedCategory) {
      setLocalSelectedCategory(JSON.parse(oldLocalSelectedCategory));
    }
  }, [tableResult]);

  async function handleScripts() {
    const values = selectedCategory.map((item) => item.value);
    console.log("getDataTable >>>> ", getDataTable);
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
      // save in local storage for later use
      const oldLocalGetDataTable = localStorage.getItem("getDataTable");

      if (oldLocalGetDataTable) {
        const oldLocalData = JSON.parse(oldLocalGetDataTable);
        oldLocalData.push(getDataTable); // Add the new getDataTable to the array

        localStorage.setItem("getDataTable", JSON.stringify(oldLocalData)); // Store the updated array
      } else {
        localStorage.setItem(
          "getDataTable",
          JSON.stringify([getDataTable]) // Wrap the getDataTable in an array if it's not an array already
        );
      }

      const oldLocal = localStorage.getItem("tableResult");
      if (oldLocal) {
        const oldLocalData = JSON.parse(oldLocal);
        oldLocalData.push(data); // Add the new data to the array
        localStorage.setItem("tableResult", JSON.stringify(oldLocalData)); // Store the updated array
      } else {
        localStorage.setItem("tableResult", JSON.stringify([data])); // Wrap the data in an array if it's not an array already
      }
      const oldSelectedCategory = localStorage.getItem("selectedCategory");
      if (oldSelectedCategory) {
        const oldLocalData = JSON.parse(oldSelectedCategory);
        oldLocalData.push(data); // Add the new data to the array
        localStorage.setItem("selectedCategory", JSON.stringify(oldLocalData)); // Store the updated array
      } else {
        localStorage.setItem(
          "selectedCategory",
          JSON.stringify([selectedCategory])
        ); // Wrap the data in an array if it's not an array already
      }
    } catch (e) {
      console.log(e);
    }
  }

  // a renderer component
  const ColRenderer = ({ value, isFalse, col }) => {
    const color = isFalse && "#FF4136";

    return <span style={{ color }}>{value === "NA" ? "" : value}</span>;
  };
  function clearAllLocaStorage() {
    localStorage.removeItem("getDataTable");
    localStorage.removeItem("tableResult");
    setLocalCategoryResult([]);
    setLocalDataResult([]);
  }

  return (
    <div className="relative z-10 min-h-screen bg-gray-dark">
      <Header className={"bg-gray-dark"} />
      <ScrollUp />

      <div className="px-20 relative z-10 pt-28 w-full  h-full">
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
              <div className="my-5 w-full ">
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
          {!outputVariables && getDataTable.length > 1 && (
            <div className="my-6 w-full">
              <HotTable
                colHeaders={selectedCategory.map((item) => item.label)}
                data={getDataTable}
                autoWrapCol={true}
                rowHeaders={true}
                width="100%"
                height="auto"
                manualColumnResize={true}
                autoWrapRow={true}
                licenseKey="non-commercial-and-evaluation"
              />
            </div>
          )}

          <div className="my-5 w-full">
            {tableResult.length > 1 && (
              <HotTable
                colHeaders={selectedCategory.map((item) => item.label)}
                data={tableResult}
                autoWrapCol={true}
                rowHeaders={true}
                width="100%"
                height="auto"
                manualColumnResize={true}
                autoWrapRow={true}
                licenseKey="non-commercial-and-evaluation"
              />
            )}
          </div>
          {localDataResult.length !== 0 && (
            <div className="border-t mt-10 bg-dark h-full flex flex-col gap-8 pb-10">
              <button
                className="linear rounded-[20px] mt-10 me-auto bg-red-500 px-4 py-2 text-base font-medium  transition duration-200 hover:bg-brand-800 active:bg-brand-700 text-dark "
                onClick={clearAllLocaStorage}
              >
                Remove Local Storage
              </button>
              <div className="grid grid-cols-3 justify-center gap-9">
                {localCategoryResult.map((_, index) => (
                  <SingleConversion
                    setSelectedCategory={setSelectedCategory}
                    setGetDataTable={setGetDataTable}
                    setTableResult={setTableResult}
                    categoryValues={localCategoryResult[index]}
                    localSelectedCategory={localSelectedCategory[index]}
                    id={index}
                    tableResult={localDataResult[index]}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const SingleConversion = ({
  categoryValues,
  tableResult,
  id,
  setGetDataTable,
  setTableResult,
  setSelectedCategory,
  localSelectedCategory,
}) => {
  return (
    <>
      <div
        onClick={() => {
          setGetDataTable(categoryValues);
          setTableResult(tableResult);
          setSelectedCategory(localSelectedCategory);
        }}
        className="wow rounded-xl  flex flex-col gap-4 justify-start items-start  h-full  group relative overflow-hidden shadow-lg duration-300 bg-primary cursor-pointer hover:shadow-xl hover:shadow-white"
        data-wow-delay=".1s"
      >
        <span className=" right-6 top-6 z-20 inline-flex items-center justify-center rounded-full  bg-dark m-4 px-4 py-2 text-sm font-semibold capitalize text-white br">
          {id + 1}
        </span>

        <div className="border-opacity-10 flex flex-wrap gap-4 text-base font-medium text-white	p-3">
          {tableResult?.map(
            (para, index) =>
              index === 0 &&
              Object.keys(para).map((item, i) => (
                <span
                  key={i}
                  className="block mb-4 shadow-lg p-2 rounded-lg bg-dark"
                >
                  {item}
                </span>
              ))
          )}
        </div>
      </div>
    </>
  );
};
