import ScrollUp from "@/components/Common/ScrollUp";
import Header from "@/components/Header";
import React, { useState } from "react";

function guide() {
  const [openIndex, setOpenIndex] = useState(0);
  const [openSubIndex, setOpenSubIndex] = useState({});

  const content = [
    {
      title: "Mean and standard deviation (SD) conversions",
      content: [
        {
          id: "a_1",
          title: "Change calculation",
          pdf: "./guide/mean_conversion/change_calculation.pdf",
        },
        {
          id: "a_2",
          title: "Mean & Confidence intervals:",
          pdf: "./guide/mean_conversion/median_cI.pdf",
        },
        {
          id: "a_3",
          title: "Median & Inter-quartile range",
          pdf: "./guide/mean_conversion/Median_IQR.pdf",
        },
        {
          id: "a_4",
          title: "Median & Range",
          pdf: "./guide/mean_conversion/Median_Range.pdf",
        },
        {
          id: "a_5",
          title: "Mean & Confidence intervals",
          pdf: "./guide/mean_conversion/Median_SE.pdf",
        },
        {
          id: "a_6",
          title: "Mean & SD Conversions",
          pdf: "./guide/mean_conversion/P_value.pdf",
        },
      ],
    },
    {
      title: "Indirect Meta-Analysis",
      content: [
        {
          id: "b_1",
          title: "Change calculation",
          pdf: "./guide/Indirect_Meta-Analysis/Indirect_Meta-Analysis.pdf",
        },
      ],
    },
    {
      title: "Indvidual data into mean& Standard deviation",
      content: [
        {
          id: "c_1",
          title: "From data for each patient into mean and SD",
          pdf: "./guide/Indvidual_data_into/Indvidual_data.pdf",
        },
      ],
    },
    {
      title: "Data combination",
      content: [
        {
          id: "d_1",
          title: "From two or more groups into single mean and SD",
          pdf: "./guide/Combine_mean/Combination.pdf",
        },
      ],
    },
  ];
  return (
    <div className="bg-black min-h-screen">
      <Header />
      <ScrollUp />
      <div className="relative z-10 grid grid-cols-12 pt-40 text-white">
        <h2 className="text-4xl text-center p-4 col-span-12">Guide</h2>
        <div className="col-span-2 border-r relative">
          <div className="flex flex-col justify-between  p-4 sticky top-40 right-0">
            {content.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4"
              >
                <h1
                  onClick={() => setOpenIndex(index)}
                  className={`cursor-pointer ${
                    openIndex === index ? "text-primary" : ""
                  }`}
                >
                  {item.title}
                </h1>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-10 pr-10">
          <div className="flex mt-10">
            <div className="flex flex-col justify-between w-full p-4">
              <h1 className="text-4xl border-b-2 w-full p-4">
                {content[openIndex].title}
              </h1>
              <div className="p-4">
                {content[openIndex].content.map((subItem, index) => (
                  <div key={index} className="p-4">
                    <h2
                      className={` text-2xl py-4 cursor-pointer`}
                      onClick={() =>
                        setOpenSubIndex({
                          ...openSubIndex,
                          [subItem.id]: !openSubIndex[subItem.id],
                        })
                      }
                    >
                      {subItem.title}{" "}
                      <span className="text-primary">
                        {openSubIndex[subItem.id] ? "-" : "+"}
                      </span>
                    </h2>
                    <div
                      className={`w-full h-[88vh] border-2 border-primary rounded-lg duration-200 ${
                        openSubIndex[subItem.id]
                          ? "block"
                          : "!h-0 overflow-hidden duration-200"
                      }`}
                    >
                      <iframe src={subItem.pdf} className="w-full h-[88vh]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default guide;
