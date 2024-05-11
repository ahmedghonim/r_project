import React from "react";
import Logo from "@/svg/logo";

import { Text } from "@/components/ui/text";
function FooterInfo() {
  return (
    <div className="flex flex-col md:flex-row justify-between h-full gap-5">
      <div className="flex flex-col items-start md:w-1/3 gap-5">
        <Logo width={59} height={55} />
        <Text size={"sm"}>
          Lorem ipsum dolor sit amet consectetur. Curabitur volutpat auctor non
          volutpat at enim.
        </Text>
      </div>

      <div className="flex flex-col items-end justify-between md:w-1/3 h-full ">
        <span className="block bg-white h-px w-[45px]"></span>
        <div className="relative flex flex-col items-end justify-end h-full gap-1">
          <Text>+91 123 456 7890</Text>

          <Text>example@example.com</Text>
        </div>
      </div>
    </div>
  );
}

export default FooterInfo;
