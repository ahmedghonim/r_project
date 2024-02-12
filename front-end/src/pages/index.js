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
import SectionTitle from "@/components/Common/SectionTitle";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Header />
      <ScrollUp />
      <Hero />
      <SectionTitle title="The Story Behind Us " center />
      <Slider
        slidesPerView={1}
        breakpoints={{
          200: { slidesPerView: 1 },
        }}
        data={[
          {
            src: "/1-1.jpg",
            subTitle: [
              "Initially, we relied on manual conversions by memorizing the equations and, in some cases, using the previous Cochrane sheet. Our goal was to centralize conversions, streamline data handling, and save time.  ",
            ],
          },
          {
            src: "/2.jpg",
            subTitle: [
              'This led to the development of an "Excel conversion sheet," collecting crucial conversions for meta-analysis data preparation. ',
              "It included the following conversions: ",
              "Mean and standard error (SE), mean and confidence interval (CI), median and inter-quartile range (IQR), and median and range to [mean and standard deviation (SD)]. Also, correlation coefficient calculation and mean and standard deviation (SD) change calculation from mean and SD pre- and post-treatment were available. Finally, it contained the conversion of P value or CI of difference between groups to SD for both groups. ",
            ],
          },
          {
            src: "/1.jpg",

            subTitle: [
              "Although this sheet improved data preparation a lot, it converted data individually: Intervention & control groups, pre- & post-intervention, and then calculating mean and SD change (that will be used in the meta-analysis), which required a lot of time and effort and, may lead to some errors.  ",
            ],
          },
          {
            src: "/3.jpg",

            subTitle: [
              'We needed a tool offering several conversions combined with simultaneous conversion of outcome data per study in a single step. This sparked the development of the "ACR conversion software," condensing 5-10 steps into one as a single-step conversion of many data types to mean and SD for any outcome per study. Also, we added some other conversations as the combination of mean and SD for two or more groups',

              "Although ACR software significantly improved the data preparation step, it still converted one outcome study at a time, and it was for Windows only. ",
            ],
          },
          {
            src: "/4.jpg",

            subTitle: [
              'Therefore, we solved all of the previous problems and added other conversions and advanced meta-analysis techniques by developing our new tool, "TreatMeta',
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
    <div className="relative  bg-[#e2e8f0] w-full h-[60vh] grid grid-cols-2 justify-center gap-7 items-center">
      <Image
        height={577}
        width={2000}
        className="h-full w-full"
        src={src || Mawjood}
        alt={title}
      />

      <ul className="pr-24">
        {subTitle.map((item, index) => (
          <li
            className="text-lg leading-relaxed mt-0 mb-4 text-blueGray-600 "
            key={index}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
