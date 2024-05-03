import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import React from "react";

function FormStart() {
  return (
    <div className="w-full space-y-3">
      <div className="grid w-full grid-cols-7 gap-6 ">
        <div className="flex col-span-5 gap-7">
          <Input />
          <Input />
        </div>
        <Button full>add</Button>
        <Button full variant="ghost">
          Reset
        </Button>
      </div>
      <Checkbox name="test" label="I agree to the terms and conditions" />
    </div>
  );
}

export default FormStart;
