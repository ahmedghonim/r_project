import Image from "next/image";
import { Inter } from "next/font/google";
import ScrollUp from "@/components/Common/ScrollUp";
import Hero from "@/components/Hero";

import Brands from "@/components/Brands";
import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Testimonials from "@/components/Testimonials";
import Conversions from "@/components/Conversions";
import Contact from "@/components/Contact";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Slider } from "@/components/ui/slider";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Header />
      <ScrollUp />
      <Hero />
      <Slider
        slidesPerView={1}
        breakpoints={{
          200: { slidesPerView: 1 },
        }}
        data={[
          {
            src: "/logo.jpg",
            title:
              'Initially, we relied on various websites and manual conversion tools like the Cochrane sheet. Ourgoal was to centralize conversions, streamlining data handling and saving time. This led to thedevelopment of an "Excel conversion sheet," collecting crucial conversions for meta-analysis data prep. Itincluded',
            subTitle: [
              "M&SE to M&SD",
              "M&CI to M&SD",
              "M&IQR to M&SD",
              "M & range",
              "Correlation coefficient calculation",
              "M & SD change calculation per group",
              "P value to SD (between groups)",
              "Cl to SD (between groups)",
            ],
          },
          {
            src: "/logo.jpg",
            title:
              'While this sheet improved data prep, like other tools, it converted values individually: \n Intervention & control groups, pre- & post-intervention, then calculating M & SD change. We needed a tool offering several conversions combined with simultaneous conversion of an outcome data per study in a single step. This sparked the development of the "IMedRA-ACR conversion tool," condensing 5-10steps into one. It featured:',
            subTitle: [
              "Single-step conversion of all data types to M & SD for any outcome per study (intervention/control, pre/post, M & SD change calculation)",
              "Calculation of M & SD from data per 1 patient",
              "Data combination of 2+ groups",
              "Measurement unit conversion (e.g., mg to gm)",
            ],
          },
          {
            src: "/logo.jpg",
            title:
              'The "IMedRA-ACR conversion tool" significantly improved data prep.',
            subTitle: [
              'However, using the previous method, we still need to convert one outcome per one study and was Windows-only. To further streamline and broaden accessibility, we developed the "TreatMeta" website. It condenses over 100 steps into one, allowing conversion of all study outcome values simultaneously, not just study-by-study. Moreover, our website will allow conducting advanced analytical techniques like indirect meta-analysis, Prevalence meta-analysis, and much more!',
            ],
          },
        ]}
        Component={(data) => <Banner {...data} />}
      />

      <Conversions />
      <Brands />
      <Testimonials />
      <Contact />
      <ScrollToTop />
    </div>
  );
}
function Banner({ src, title, subTitle }) {
  return (
    <div className="relative h-[125px] w-full sm:h-[75vh]">
      <Image
        height={577}
        width={2000}
        className="h-full w-full"
        src={src || Mawjood}
        alt={title}
      />
      <div className="absolute inset-[0] flex w-fit flex-col  items-start justify-center gap-3 capitalize ltr:ms-[12%] rtl:ms-[50%] sm:-top-24 sm:ms-[20%] sm:gap-7">
        <h1 className="text-2xl mb-2 font-semibold leading-normal">{title}</h1>
        <ul>
          {subTitle.map((item, index) => (
            <li
              className="text-lg leading-relaxed mt-0 mb-4 text-blueGray-600 list-disc"
              key={index}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
