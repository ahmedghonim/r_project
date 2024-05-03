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
import fImg from "@/assets/img/2.jpg";
import sImg from "@/assets/img/1.jpg";
import tImg from "@/assets/img/3.jpg";
import uImg from "@/assets/img/5.png";
import vImg from "@/assets/img/4.jpg";
function OurStory() {
  const story = [
    {
      src: fImg,
      title:
        "Mean and standard error (SE), mean and confidence interval (CI), median and inter-quartile range (IQR),  and median and range to [mean and standard deviation (SD)]",
      description:
        "Also, correlation coefficient calculation and mean and standard deviation (SD) change calculation from mean and SD pre- and post-treatment were available. Finally, it contained the conversion of P value or CI of difference between groups to SD for both groups",
    },
    {
      src: sImg,
      title:
        "Although this sheet improved data preparation a lot, it converted data individually",
      description:
        "control groups, pre- & post-intervention, and then calculating mean and SD change (that will be used in the meta-analysis), which required a lot of time and effort and, may lead to some errors. ",
    },
    {
      src: tImg,
      title:
        "We needed a tool offering several conversions combined with simultaneous conversion of outcome data per study in a single step",
      description:
        'This sparked the development of the "ACR conversion software," condensing 5-10 steps into one as a single-step conversion of many data types to mean and SD for any outcome per study. Also, we added some other conversations as the combination of mean and SD for two or more groups.',
    },
    {
      src: uImg,
      title:
        "Although ACR software significantly improved the data preparation step",
      description:
        "it still converted one outcome study at a time, and it was for Windows only.",
    },
    {
      src: vImg,
      title: "TreatMeta",
      description:
        "Therefore, we solved all of the previous problems and added other conversions and advanced meta-analysis techniques by developing our new tool,",
    },
  ];
  return (
    <div className="relative flex items-center h-screen">
      <div className="z-30 flex-1 w-full space-y-7">
        <Text variant="stroke-title">Our Story</Text>
        <Carousel className="z-20  mx-auto w-[85%]">
          <CarouselContent>
            {story.map((item, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-col-reverse w-full gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-col gap-3 md:max-w-[60%]">
                    <Text variant="white" size="te">
                      {item.title}
                    </Text>
                    <Text>{item.description}</Text>
                  </div>
                  <div className="md:w-[400px]  h-auto">
                    <Image
                      src={item.src}
                      className="object-cover md:w-[400px] h-[400px] w-full "
                      alt="text logo"
                      width={360}
                      height={526}
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="md:w-[325px] w-[180px] absolute md:right-[-118px] -right-6 bg-[#1E3040] h-screen top-0 z-10"></div>
    </div>
  );
}

export default OurStory;
