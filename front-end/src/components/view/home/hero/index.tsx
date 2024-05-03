"use client";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import React from "react";
import TextLogo from "@/svg/text_logo.svg";
import SiteInfo from "./site-info";
import ArrowDown from "@/svg/arrow-down.svg";
import Link from "next/link";
import { useScroll, motion, useTransform } from "framer-motion";
function Hero() {
  const target = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: target,
    offset: ["end end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  return (
    <div className="relative flex flex-col items-center h-screen gap-4">
      <div className="pt-[169px] flex justify-center items-center flex-col gap-4">
        <TextLogo width={192} height={20} />
        <Text variant="white">Where Data Gets The Treatment IT Deserves</Text>
      </div>
      <div className="mt-[58px] space-y-5 text-center">
        <Text variant="default" size="f2" center>
          Forget About the nightmare of handling multiple data formats
        </Text>

        <Text variant="default" center>
          Lorem ipsum dolor sit amet consectetur. Tristique in maecenas
          convallis orci turpis viverra felis auctor
        </Text>
      </div>
      <div className="flex items-center gap-3 mt-[28px]">
        <Link href="/start">
          <Button className="min-w-[155px]">Get Start</Button>
        </Link>
        <Button className="min-w-[155px]" variant="ghost">
          Explore Now{" "}
          <ArrowDown width={18} height={18} className="stroke-current" />
        </Button>
      </div>
      <div className="absolute bottom-0  md:left-[-118px] -left-6 md:w-[70%]">
        <SiteInfo />
      </div>
    </div>
  );
}

export default Hero;
