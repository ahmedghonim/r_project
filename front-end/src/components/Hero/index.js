import Link from "next/link";

const Hero = () => {
  return (
    <div>
      <section id="home" className="relative z-10 overflow-hidden ">
        <div className="relative h-[75vh] flex justify-center items-center">
          <div
            className="absolute z-1 top-0 left-0 w-full pt-16 pb-32 flex content-center items-center justify-center h-[75vh] bg-[url('/why_tm.jpg')] bg-cover bg-center"
            style={{
              backgroundRepeat: "no-repeat",
              filter: "brightness(0.4)",
            }}
          ></div>

          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold  text-5xl">
                    Why TreatMeta
                  </h1>
                  <p className="mt-4 text-lg text-white font-semibold">
                    We developed the "TreatMeta" website to streamline further
                    and broaden accessibility for using many forms of data
                    unsuitable for meta-analysis, making them suitable. It
                    condenses many steps and conversations into just one click,
                    allowing conversion of all study outcome values
                    simultaneously, not just conversion by conversion nor
                    study-by-study.
                  </p>
                  <p className="mt-4 text-lg text-white font-semibold">
                    You will get your data converted and ready for any
                    meta-analysis software; just copy and paste!{" "}
                  </p>
                  <p className="mt-4 text-lg text-white font-semibold">
                    Moreover, our website will allow conducting advanced
                    analytical techniques like indirect meta-analysis,
                    prevalence meta-analysis, and much more!
                  </p>
                  <p className="mt-4 text-lg text-white font-semibold">
                    Look forward to exciting developments in the coming months!
                  </p>
                </div>
              </div>
              <Link
                href="/start"
                className="mt-5 mx-auto text-center shadow-submit dark:shadow-submit-dark rounded-sm bg-[#f87178] px-9 py-4 text-base font-medium text-white duration-300 hover:bg-[#f87178]/90"
              >
                Start Conversions <br />
                [Treat your data here ]
              </Link>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            // style="height:70px"
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-white font-semibold fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>
        <section class="bg-blueGray-200 -mt-24">
          <div className="flex flex-wrap">
            <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                    <i className="fas fa-award"></i>
                  </div>
                  <h6 className="text-xl font-semibold">50</h6>
                  <p className="mt-2 mb-4 text-blueGray-500">Conversions</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-4/12 px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
                    <i className="fas fa-retweet"></i>
                  </div>
                  <h6 className="text-xl font-semibold">33K</h6>
                  <p className="mt-2 mb-4 text-blueGray-500">Visitors</p>
                </div>
              </div>
            </div>
            <div className="pt-6 w-full md:w-4/12 px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                    <i className="fas fa-fingerprint"></i>
                  </div>
                  <h6 className="text-xl font-semibold">22K</h6>
                  <p className="mt-2 mb-4 text-blueGray-500">New Users</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Hero;
