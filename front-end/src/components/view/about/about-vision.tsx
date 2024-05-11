import React from "react";
import { Text } from "@/components/ui/text";
import Person from "@/svg/person";
import Light from "@/svg/light";
import Erth from "@/svg/erth";
import { cn } from "@/lib/utils";
import Zamp from "@/svg/zamp";
import Image from "next/image";
import visionImg from "@/assets/img/vision.jpg";

function AboutVision() {
  return (
    <div className="grid grid-cols-12 items-center md:h-screen  relative w-full md:pt-40 md:gap-[80px] gap-6 mb-10 md:mb-0">
      <div className="md:col-span-7 col-span-12 h-full relative pt-10">
        <div className="md:text-end text-center">
          <Text variant="stroke-title">Our Vision</Text>
        </div>
        <div className="mt-5">
          <Text variant="white" size="fe" as="h2">
            Our Vision at Treatmeta
          </Text>
          <Text className="w-[90%]">
            At Treatmeta, our vision is to lead the way in shaping a future
            where every patient receives personalized, effective, and
            compassionate care.
          </Text>
        </div>
        <Zamp className="absolute md:block -right-[9%] top-[34%] hidden" />
        <Image
          className="md:ms-auto  md:me-0 mx-auto mt-[8%]"
          src={visionImg}
          width={243}
          height={256}
          alt="our vision image"
        />
      </div>

      <div className="md:col-span-4 col-span-12 space-y-5">
        <Item
          icon={Light}
          title="Innovative Treatment Solutions"
          desc="Describe how Treatmeta envisions a future where innovative treatment solutions are accessible to all"
        />
        <Item
          isPrimary
          icon={Person}
          title="Patient-Centered Care"
          desc="Emphasize the importance of patient-centered care in Treatmeta's vision, highlighting a commitment to personalized medicine, holistic wellness, and empowerment"
        />
        <Item
          title="Global Impact"
          desc="Treatmeta's aspiration to make a global impact in healthcare, addressing healthcare disparities"
          icon={Erth}
        />
      </div>
    </div>
  );
}

function Item({
  title,
  desc,
  icon: Icon,
  isPrimary,
}: {
  title: string;
  desc: string;
  icon: any;
  isPrimary?: boolean;
}) {
  return (
    <div
      className={cn("flex gap-3 rounded items-center p-3 bg-secondary/30", {
        "bg-primary": isPrimary,
      })}
    >
      <span>
        <Icon />
      </span>
      <div className="flex flex-col items-start">
        <Text size="et" variant="white">
          {title}
        </Text>
        <Text size="sm">{desc}</Text>
      </div>
    </div>
  );
}

export default AboutVision;
