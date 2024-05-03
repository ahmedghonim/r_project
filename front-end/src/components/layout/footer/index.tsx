import React from "react";
import FooterContactUsSection from "./footer-contact-us";
import FooterSiteMap from "./footer-site-map";
import FooterInfo from "./footer-info";
import Social from "./social";
import CopyRight from "./copy-right";

function Footer() {
  return (
    <div className="flex flex-col justify-end gap-6 md:h-screen bg-background">
      <FooterContactUsSection />
      <div className="md:w-[80%] mx-auto md:mt-16 mt-11 w-full">
        <FooterSiteMap />
      </div>
      <div className="mt-11">
        <FooterInfo />
      </div>
      <div className="md:mt-[100px] mt-11">
        <Social />
      </div>
      <div className="md:mt-16 mt-11">
        <CopyRight />
      </div>
    </div>
  );
}

export default Footer;
