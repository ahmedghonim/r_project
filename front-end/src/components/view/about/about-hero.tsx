import React from "react";
import { Text } from "@/components/ui/text";
import AboutImage from "@/assets/img/about.png";
import Image from "next/image";
import AboutCircle from "@/svg/about_circle.svg";
function AboutHero() {
  return (
    <div className="grid grid-cols-12 items-center h-screen gap-7 pt-[10%] pd:mt-0">
      <div className="md:col-span-7 col-span-12 order-2  md:order-first">
        <div className="flex flex-col items-start gap-1">
          <div className="relative">
            <AboutCircle className="absolute -top-2.5 -left-2.5" />
            <Text variant="primary" size="base" as="h1">
              About us
            </Text>
          </div>
          <Text variant="white" size="fe" as="h2">
            Discovering Tomorrow&apos;s
          </Text>
          <Text variant="white" size="fe" as="h2">
            Treatments Today
          </Text>
        </div>
        <Text>
          Welcome to Treatmeta, where our mission is to revolutionize the
          landscape of medical research and treatment discovery. Founded on the
          principle of collaboration, we bring together leading researchers,
          clinicians, and patients to accelerate the development of innovative
          therapies.
        </Text>
      </div>
      <div className="md:col-span-5 col-span-12">
        <Image src={AboutImage} width={456} height={468} alt="about image" />
      </div>
    </div>
  );
}

export default AboutHero;
