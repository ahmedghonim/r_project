import Image from "next/image";

const Hero = () => {
  return (
    <div>
      <section id="home" className="relative z-10 overflow-hidden ">
        <div className="relative h-[85vh] bg-gradient-to-tl from-blue-900 to-red-900  flex flex-col pt-32 !font-inconsolata">
          <div className="w-[300px] self-center z-10">
            <Image
              src="/logo.svg"
              alt="logo"
              width={120}
              height={120}
              className="w-full h-full z-10"
            />
          </div>
          <div className="w-[680px] self-center absolute right-10 top-[200px] z-[1] h-[500px]">
            <Image
              src="/home_1.png"
              alt="logo"
              width={500}
              height={500}
              className="w-full h-full absolute top-0 left-0 z-[10]"
            />
            <Image
              src="/home_2.png"
              alt="logo"
              width={500}
              height={500}
              className="  absolute top-0 left-0 z-[10000] w-full h-full"
            />
          </div>
          <div className="flex items-center mt-10 z-20 !font-inconsolata">
            <div className="flex flex-col gap-10 ml-[100px] ">
              <div className="flex gap-3 ">
                <div className="w-2  bg-indigo-500 rounded-3xl " />
                <div className=" w-[47%] left-[26px] top-[5px]  text-neutral-200 text-xl font-bold">
                  Forget About the nightmare of handling multiple data formats
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 bg-indigo-500 rounded-3xl ml-10" />
                <div className=" w-[47%] left-[26px] top-[5px]  text-neutral-200 text-xl font-bold">
                  Convert all study outcome values simultaneously, with a{" "}
                  <span>single click</span>{" "}
                </div>
              </div>
              <div className="flex gap-3 ">
                <div className="w-2 bg-indigo-500 rounded-3xl " />
                <div className=" w-[47%] left-[26px] top-[5px]  text-neutral-200 text-xl font-bold">
                  Easily perform advanced analytical techniques such as indirect
                  meta-analysis and prevalence meta-analysis
                </div>
              </div>
              <div className="pl-10">
                <div className="Frame1 w-fit h-11 px-11 py-1 bg-indigo-500 rounded justify-center items-center gap-2.5 inline-flex">
                  <button className="StartNow text-white text-xl font-bold leading-9">
                    Start Now
                  </button>
                </div>
                <div className="Frame2 w-fit h-10 px-16 py-0.5 bg-red-400 bg-opacity-0 rounded justify-center items-center gap-2.5 inline-flex">
                  <button className="LearnMore text-neutral-200 text-xl font-bold !font-inconsolata underline leading-9">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section class="bg-blueGray-200 -mt-24">
          <div className="flex flex-wrap">
            <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-white p-3 text-center items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
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
                  <div className="text-white p-3 text-center items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
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
                  <div className="text-white p-3 text-center items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
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
