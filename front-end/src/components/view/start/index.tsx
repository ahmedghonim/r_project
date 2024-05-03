import { Text } from "@/components/ui/text";
import React from "react";
import FormStart from "./form-start";
import ResearchHistory from "../history/research-history";

function Start() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Text variant="default" size="f2">
        Embark on Your Research Journey with
      </Text>
      <Text variant="white" size="f2">
        Treatmeta
      </Text>
      <Text variant="default">
        where exploration meets innovation. Begin your quest for knowledge and
        discovery as we provide the tools
      </Text>

      <FormStart />

      <ResearchHistory />
    </div>
  );
}

export default Start;
