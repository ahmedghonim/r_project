"use client";
import Empty from "@/components/view/history/empty";
import ResearchHistory from "@/components/view/history/research-history";
import React from "react";

function StartPAge() {
  const oldLocalData = JSON.parse(localStorage.getItem("tableResult") || "[]");
  console.log("oldLocalData >>>> ", oldLocalData);
  return (
    <div>{oldLocalData.length !== 0 ? <ResearchHistory /> : <Empty />}</div>
  );
}

export default StartPAge;
