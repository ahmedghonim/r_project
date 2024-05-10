"use client";
import Empty from "@/components/view/history/empty";
import ResearchHistory from "@/components/view/history/research-history";
import React, { useEffect, useState } from "react";

function StartPAge() {
  const [oldLocalData, setOldLocalData] = useState<any>([]);
  useEffect(() => {
    setOldLocalData(JSON.parse(localStorage.getItem("tableResult") || "[]"));
  }, []);
  return (
    <div>{oldLocalData.length !== 0 ? <ResearchHistory /> : <Empty />}</div>
  );
}

export default StartPAge;
