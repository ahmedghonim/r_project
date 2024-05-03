import { Text } from "@/components/ui/text";
import React from "react";
import CheckIcon from "@/svg/check.svg";
import Image from "next/image";
import TreatmetaCircle from "@/svg/treatmeta_circle.svg";
import TreatmetaSquare from "@/svg/treatmeta_square.svg";
import treatmetaImage from "@/assets/img/treatmeta.png";
import { Button } from "@/components/ui/button";
import RightArrow from "@/svg/right-arrow.svg";
import Link from "next/link";

function TreatmentSection() {
  return (
    <div className="grid grid-cols-12 h-screen items-center relative bg-[#1E3040] md:bg-transparent -mx-6 px-6 pt-20 md:p-0 md:m-0 ">
      <div className="bg-[#1E3040] absolute  top-0 w-screen h-screen -left-[118px]  z-0"></div>{" "}
      <div className="md:col-span-6 col-span-12 z-10 space-y-3 order-1 md:order-first md:pr-[20%]">
        <Text variant="white" size="fe" as="h2">
          Get Involved with Treatmeta
        </Text>
        <ul className="items-start flex flex-col gap-3">
          <Text as="li" className="flex items-center justify-start gap-4">
            <span className="size-5 bg-primary rounded-full">
              <CheckIcon />
            </span>
            <span>
              Discover how you can become actively involved in Treatmeta
            </span>
          </Text>
          <Text as="li" className="flex items-center justify-start gap-4">
            <span className="size-5 bg-primary rounded-full">
              <CheckIcon />
            </span>
            <span>
              ke the first step towards making a lasting impact on healthcare by
              getting involved with Treatmeta.
            </span>
          </Text>
          <Text as="li" className="flex items-center justify-start gap-4">
            <span className="size-5 bg-primary rounded-full">
              <CheckIcon />
            </span>
            <span>Take action today and make a meaningful difference </span>
          </Text>
        </ul>
        <div className="flex  gap-4 pt-4 justify-center md:justify-start">
          <Button className="min-w-[155px]" variant="ghost">
            Learn More <RightArrow className="stroke-current" />
          </Button>
          <Link href="/start">
            <Button className="min-w-[155px]">Get Started</Button>
          </Link>
        </div>
      </div>
      <div className="md:col-span-6 col-span-12 ">
        <div className="relative bg-black w-fit mx-auto">
          <TreatmetaCircle className="absolute top-0 translate-y-[-50%] translate-x-1/2 right-0 z-30 size-[129px]" />
          <TreatmetaSquare className="absolute bottom-0 translate-y-[50%] -translate-x-1/2 left-0 z-30 size-[129px]" />
          <Image
            src={treatmetaImage}
            width={510}
            height={510}
            className=""
            alt="treatmeta image"
          />
        </div>
      </div>
    </div>
  );
}

export default TreatmentSection;
