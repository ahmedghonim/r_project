"use client";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import React from "react";
import TextLogo from "@/svg/text_logo";
import SiteInfo from "./site-info";
import ArrowDown from "@/svg/arrow-down";
import Link from "next/link";

function Hero() {
  return (
    <div className="relative flex flex-col items-center h-screen gap-4 pt-[20vh]">
      <div className="py-6 px-8 flex justify-center items-center flex-col gap-4">
        <TextLogo width={192} height={20} />
        <Text variant="white" >Where Data Gets the Treatment it Deserves</Text>
      </div>
      <div className="mt-[4vh] space-y-5 text-center">
        <Text variant="default" size="teb" center>
          Forget about the nightmare of handling multiple data formats
        </Text>

        <Text variant="default" center>
          Lorem ipsum dolor sit amet consectetur. Tristique in maecenas
          convallis orci turpis viverra felis auctor
        </Text>
      </div>
      <div className="flex items-center gap-3 mt-[28px]">
        <Link href="/start/default">
          <Button className="min-w-[155px]">Get Start</Button>
        </Link>
        <Button
          className="min-w-[155px]"
          variant="ghost"
          onClick={() => window.scrollTo({ top: 1000, behavior: "smooth" })}
        >
          Explore Now{" "}
          <ArrowDown width={18} height={18} className="stroke-current" />
        </Button>
      </div>
      <div className="absolute bottom-0 left-[-118px] max-w-[768px] md:w-[70%]">
        <SiteInfo />
      </div>
    </div>
  );
}

export default Hero;
