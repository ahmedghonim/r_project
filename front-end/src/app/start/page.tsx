"use client";
import { useState, useEffect } from "react";
import Line from "@/assets/svg/line.svg";
import { keys, zipObject } from "lodash";
import { HotTable } from "@handsontable/react";
import "handsontable/dist/handsontable.full.min.css";
import { registerAllModules } from "handsontable/registry";
import HandsonTable from "@/components/ui/handson-table";
import { Input } from "@/components/ui/input";
import { fetchData } from "@/lib/fetchData";
import Select from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

export default function StartPage() {
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");

  registerAllModules();
  const [firstInput, setFirstInput] = useState<any>({
    current_prepost: "0",
  });
  const [openSelect, setOpenSelect] = useState<any>(false);
  const [selectedCategory, setSelectedCategory] = useState<any>([]);
  const [selectTypes, setSelectTypes] = useState<any>([]);
  const [inputParams, setInputParams] = useState<any>(null);
  const [funcIdsValues, setFuncIdsValues] = useState<any>(null);
  const [outputVariables, setOutputVariables] = useState<any>(null);
  const [getDataTable, setGetDataTable] = useState<any>([]);
  const [tableResult, setTableResult] = useState<any>([]);
  const [outputColumns, setOutputColumns]= useState<any>([]);
  const [sleetedUserIndex, setSleetedUserIndex] = useState<any>([]);
  const [availableCategoriesData, setAvailableCategoriesData] = useState<any>(
    []
  );
  const [category, setCategory] = useState([]);
  const [labData, setLabData] = useState<any>([]);
  useEffect(() => {
    fetchData("/available_categories").then((data: any) => {
      setAvailableCategoriesData(
        data.data.map((item: any) => ({
          value: item.ID,
          label: item.Name,
        }))
      );

      fetchData("/labs").then((data: any) => {
        setLabData(
          data.data.map((item: any) => ({
            value: item.ID,
            label: item.Name,
          }))
        );
      });
    });
  }, []);
    //Rename variables
    async function renameVariables(prepost:boolean, groups: number, vars:Array<string>) {
      try {
        const { data } = await fetchData<any>("/Rename_variables", {
          method: "POST",
          body: {var_names:JSON.stringify(vars), 
                  current_groups:groups, 
                  current_prepost:prepost},
        });
        return data;
        
      } catch (e) {
        console.log(e);
      }
    }
  async function handleFirstInput() {
    try {
      const { data } = await fetchData<any>("/eligible_functions", {
        method: "POST",
        body: firstInput,
      });
      console.log("data >>>> ", data);
      const keys = data[0][1];
      const values = data[0][0];

      const categoryValue = keys.map((key: any, i: any) => {
        return { value: values[i], label: key };
      });
      setInputParams(data[1]);

      setCategory(categoryValue);
      setSelectTypes(data[2]);
      const selectedObject: any = {};
      data[2].forEach(
        (item: any, index: any) => (selectedObject[values[index]] = item)
      );

      setSleetedUserIndex(selectedObject);
    } catch (e) {
      console.log(e);
    }
  }

  //FuncIDs
  async function handleFunc_IDs() {
    const categoryValue = selectedCategory.map((item: any) => {
      return item.value;
    });
    try {
      const { data } = await fetchData<any>("/Func_IDs", {
        method: "POST",
        body: {
          user_inputs: JSON.stringify(categoryValue),
          input_params: JSON.stringify(inputParams),
        },
      });
      setFuncIdsValues(data);

      const { data: outputVariables } = await fetchData<any>(
        "/Output_variables",
        {
          method: "POST",
          body: {
            funcIDs: JSON.stringify(data[1]),
          },
        }
      );
      setOutputVariables(outputVariables);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    const oldLocalGetDataTable = localStorage.getItem("getDataTable");

    const oldLocalSelectedCategory = localStorage.getItem("selectedCategory");
    if (id) {
      setGetDataTable(JSON.parse(oldLocalGetDataTable || "[]")?.[id]);
      setTableResult(tableResult);
      setSelectedCategory(JSON.parse(oldLocalSelectedCategory || "[]")?.[id]);
    }
  }, [id]);

  async function handleScripts() {
    const values = selectedCategory.map((item: any) => item.value);

    const df = getDataTable.map((row: any) => {
      let newRow = row.map((item: any) => item || "NA");
      newRow = newRow.map((item: any) =>
        typeof item === "number" ? parseFloat(item as any) : item
      );

      return zipObject(values, newRow);
    });

    try {
      const { data } = await fetchData<any>("/scripts/Task_manager", {
        method: "POST",
        body: {
          df: JSON.stringify(df),
          funcIDs: JSON.stringify(funcIdsValues[1] as any),
          current_outputs: JSON.stringify(outputVariables),
          current_prepost: firstInput.current_prepost,
          category: firstInput?.category,
        },
      });
      console.log(firstInput);
      const renamedCols= await renameVariables(firstInput.current_prepost, firstInput.current_groups, Object.keys(data[0]).slice(1,-2));
      setOutputColumns(renamedCols);
      setTableResult(data.map((el:any)=> zipObject( Object.keys(el).slice(1,-2), Object.values(el).slice(1,-2))));
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
        oldLocalData.push(selectedCategory); // Add the new data to the array
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

  const autoComplete = selectedCategory.map(({ value }: { value: string }) => {
    const result = {
      type: sleetedUserIndex[value],
      strict: true,
      source: null,
    };
    if (sleetedUserIndex[value] === "autocomplete" && labData) {
      result.source = labData;
    }
    return result;
  });

  return (
    <div className="w-full  h-full pt-[170px]">
      <div className="pb-12 space-y-4 text-center">
        <div className="relative flex flex-col ">
          <Text variant="white" size="f2">
            Embark on Your{" "}
            <span className="relative mx-2">
              Research <Line className="absolute -bottom-2" />
            </span>
            Journey with
          </Text>
          <Text variant="white" size="f2">
            Treatmeta
          </Text>
        </div>
        <Text variant="default">
          where exploration meets innovation. Begin your quest for knowledge and
          discovery as we provide the tools
        </Text>
      </div>

      <div className="flex flex-col ">
        <div className="flex items-end w-full gap-7 ">
          {category.length < 1 && (
            <div className="grid items-end w-full grid-cols-12 gap-6">
              <div className="col-span-4">
                <Input
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
              <div className="col-span-4">
                <Select
                  name="Category"
                  label="Category"
                  options={availableCategoriesData}
                  onChange={(e: any) => {
                    setFirstInput({
                      ...firstInput,
                      category: e.value.toString(),
                    });
                  }}
                  className="z-10 basic-multi-select"
                  classNamePrefix="select"
                  onBlur={() => setOpenSelect(false)}
                  onFocus={() => setOpenSelect(true)}
                  menuIsOpen={openSelect}
                />
              </div>

              <div className="flex col-span-3 gap-3">
                <Button onClick={handleFirstInput} className="w-full h-[54px]">
                  Next
                </Button>
                <Button
                  className="w-full h-[54px]"
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
                    setOutputColumns([]);
                    setGetDataTable([]);
                    setTableResult([]);
                  }}
                  variant="ghost"
                >
                  Reset
                </Button>
              </div>
              <label
                htmlFor="current_prepost"
                className="flex items-center col-span-12 gap-3 text-base font-medium text-white cursor-pointer w-fit"
              >
                <Input
                  className="w-5 h-5 "
                  type="checkbox"
                  color="blue"
                  id="current_prepost"
                  name="current_prepost"
                  onChange={(e) => {
                    setFirstInput({
                      ...firstInput,
                      current_prepost: e ? "1" : "0",
                    });
                  }}
                />
                Current Prepost
              </label>
            </div>
          )}
          {category.length !== 0 && !outputVariables && (
            <div className="flex items-end w-full gap-6">
              <div className="flex-1">
                <Select
                  label="Variables"
                  isMulti
                  name="colors"
                  value={selectedCategory}
                  // filter if add in selectedCategory
                  options={category.filter(
                    (item) => !selectedCategory.includes(item)
                  )}
                  onChange={(e: any) => {
                    setSelectedCategory(e as any);
                  }}
                  className="basic-multi-select w-[400px] z-10"
                  classNamePrefix="select"
                  onBlur={() => setOpenSelect(false)}
                  onFocus={() => setOpenSelect(true)}
                  menuIsOpen={openSelect}
                />
              </div>

              <div className="flex gap-6 w-[35%]">
                <Button
                  className="w-full h-[54px]"
                  onClick={() => {
                    handleFunc_IDs();
                  }}
                >
                  Next
                </Button>
                <Button
                  className="w-full h-[54px]"
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
                    setOutputColumns([]);
                    setGetDataTable([]);
                    setTableResult([]);
                  }}
                  variant="ghost"
                >
                  Reset
                </Button>
              </div>
            </div>
          )}
        </div>
        {outputVariables && (
          <div className="mt-10 space-y-6">
            <div className="flex justify-between">
              <Text size="tee" variant="white">
                Convert your data here
              </Text>

              {tableResult.length < 1 && (
                <Button className="h-[54px]" onClick={handleScripts}>
                  Submit
                </Button>
              )}
            </div>
            <div className="w-full my-5 ">
              <HandsonTable
                selectedCategory={selectedCategory}
                setGetDataTable={setGetDataTable}
                autoComplete={autoComplete}
              />
            </div>
          </div>
        )}
        {!outputVariables && getDataTable.length > 1 && (
          <div className="w-full my-6">
            <Text size="tee" variant="white">
              Results
            </Text>

            <HotTable
              colHeaders={selectedCategory.map((item: any) => item.label)}
              data={getDataTable}
              columns={autoComplete}
              autoColumnSize
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

        <div className="w-full my-5">
          {tableResult.length > 1 && (
            <HotTable
              colHeaders={outputColumns}
              data={tableResult.map((row: any) => {
                return keys(row).map((key) =>
                  row[key] === "NA" ? "" : row[key]
                );
              })}
              columns={autoComplete}
              autoColumnSize
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
      </div>
    </div>
  );
}

interface SingleConversionProps {
  categoryValues: any;
  tableResult: any[];
  id: number;
  setGetDataTable: React.Dispatch<React.SetStateAction<any>>;
  setTableResult: React.Dispatch<React.SetStateAction<any[]>>;
  setSelectedCategory: React.Dispatch<React.SetStateAction<any>>;
  localSelectedCategory: any;
}

const SingleConversion = ({
  categoryValues,
  tableResult,
  id,
  setGetDataTable,
  setTableResult,
  setSelectedCategory,
  localSelectedCategory,
}: SingleConversionProps) => {
  return (
    <>
      <div
        onClick={() => {
          setGetDataTable(categoryValues);
          setTableResult(tableResult);
          setSelectedCategory(localSelectedCategory);
        }}
        className="relative flex flex-col items-start justify-start h-full gap-4 overflow-hidden duration-300 shadow-lg cursor-pointer wow rounded-xl group bg-primary hover:shadow-xl hover:shadow-white"
        data-wow-delay=".1s"
      >
        <span className="z-20 inline-flex items-center justify-center px-4 py-2 m-4 text-sm font-semibold text-white capitalize rounded-full  right-6 top-6 bg-dark br">
          {id + 1}
        </span>

        <div className="flex flex-wrap gap-4 p-3 text-base font-medium text-white border-opacity-10">
          {tableResult?.map(
            (para, index) =>
              index === 0 &&
              Object.keys(para).map((item, i) => (
                <span
                  key={i}
                  className="block p-2 mb-4 rounded-lg shadow-lg bg-dark"
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
