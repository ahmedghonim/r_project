"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Text } from "@/components/ui/text";
import Image from "next/image";
import React from "react";
import our_story from "@/assets/img/our_story.jpg";
import { useScroll, motion } from "framer-motion";
function OurStory() {
  const target = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: target,
    offset: ["end end", "end start"],
  });

  return (
    <motion.div className="relative flex items-center h-screen">
      <div className="flex-1 space-y-7 z-30 w-full">
        <Text variant="stroke-title">Our Story</Text>
        <Carousel className="z-20  mx-auto w-[85%]">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between w-full">
                  <div className="flex flex-col gap-3 md:max-w-[60%]">
                    <Text variant="white" size="te">
                      Mean and standard error (SE), mean and confidence interval
                      (CI)
                    </Text>
                    <Text>
                      median and inter-quartile range (IQR), and median and
                      range to [mean and standard deviation (SD)]. Also,
                      correlation coefficient calculation and mean and standard
                      deviation (SD) change calculation from mean and SD pre-
                      and post-treatment were available. Finally, it contained
                      the conversion of P value or CI of difference between
                      groups to SD for both groups.
                    </Text>
                  </div>
                  <motion.div ref={target} className="md:w-[360px]  h-auto">
                    <Image
                      src={our_story}
                      className="w-full h-auto"
                      alt="text logo"
                      width={360}
                      height={526}
                    />
                  </motion.div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="md:w-[325px] w-[180px] absolute md:right-[-118px] -right-6 bg-[#1E3040] h-screen top-0 z-10"></div>
    </motion.div>
  );
}

export default OurStory;
