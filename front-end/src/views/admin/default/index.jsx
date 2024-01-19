import { IoDocuments } from "react-icons/io5";
import { MdBarChart } from "react-icons/md";
import Widget from "components/widget/Widget";
import { Table } from "components/table";
import Select from "react-select";
import InputField from "components/fields/InputField";
import Switch from "components/switch";
import { useState } from "react";
import { useGetQuery } from "hooks/useQueryHooks";
import { usePostQuery } from "hooks/useQueryHooks";

const Dashboard = () => {
  const [firstInput, setFirstInput] = useState({
    current_prepost: 0,
    current_groups: 0,
  });
  const { mutateAsync, isLoading } = usePostQuery({
    url: "/eligible_functions",
  });
  function handleFirstInput() {
    try {
      mutateAsync(firstInput);
    } catch (e) {
      console.log(e);
    }
  }
  const data = useGetQuery("/health-check", "/health-check", {});

  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Earnings"}
          subtitle={"$340.5"}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Spend this month"}
          subtitle={"$642.39"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Sales"}
          subtitle={"$574.34"}
        />
      </div>

      <div className="my-10 flex flex-grow items-end gap-14">
        <div className="flex items-center gap-3">
          <Switch
            id="current_prepost"
            name="current_prepost"
            onChange={(e) => {
              console.log(e.target.checked);

              setFirstInput({
                ...firstInput,
                current_prepost: e.target.checked,
              });
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
            value={firstInput.current_groups}
            type="number"
            onChange={(e) => {
              setFirstInput({
                ...firstInput,
                current_groups: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <button
            onClick={handleFirstInput}
            href=""
            className="linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
          >
            Next
          </button>
        </div>
        <div>
          <label
            htmlFor={"colors"}
            className={`text-sm text-navy-700 dark:text-white `}
          >
            Category
          </label>

          <Select
            isMulti
            name="colors"
            options={[]}
            className="basic-multi-select w-[300px] "
            classNamePrefix="select"
          />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <Table />
      </div>

      {/* Tables & Charts */}
    </div>
  );
};

export default Dashboard;
