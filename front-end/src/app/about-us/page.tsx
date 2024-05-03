import React from "react";

import AboutMission from "@/components/view/about/about-mission";
import AboutHero from "@/components/view/about/about-hero";
import AboutVision from "@/components/view/about/about-vision";
import TreatmentSection from "@/components/view/about/treatmeta";
function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutMission />
      <AboutVision />
      <TreatmentSection />
    </>
  );
}

export default AboutPage;
