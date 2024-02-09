import React, { useCallback, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { cn } from "@/lib/utils";

export function Slider({
  Component,
  data = [],
  slidesPerView = 10,
  withoutNavigator = false,
  className,
  breakpoints = {
    200: { slidesPerView: 2 },
    600: { slidesPerView: 4 },
    900: { slidesPerView: 5 },
    1200: { slidesPerView: 7 },
    1400: { slidesPerView: 8 },
    1600: { slidesPerView: 9 },
    1800: { slidesPerView: 10 },
  },
}) {
  const sliderRef = useRef(null);

  const btnClass =
    "absolute disabled:opacity-50 sm:flex justify-center items-center disabled:cursor-not-allowed translate-x-[20%] top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full sm:p-[14px] p-[12px] sm:w-[60px] sm:h-[60px] h-[20px] w-[20px] z-10";
  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <div className={"relative"}>
      {!withoutNavigator ? (
        <button
          className={cn(btnClass, {
            "right-3 !translate-x-0 sm:right-5": slidesPerView === 1,
          })}
          onClick={handlePrev}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 -translate-y-1/2 translate-x-1/2 sm:h-9 sm:w-9 sm:translate-x-0 sm:translate-y-0"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M12.9206 24.9185L11.0821 23.08L18.1629 15.9992L11.0821 8.91846L12.9206 7.07998L21.8398 15.9992L12.9206 24.9185Z"
              fill="#545353"
            />
          </svg>
        </button>
      ) : (
        ""
      )}

      <Swiper
        ref={sliderRef}
        centeredSlidesBounds={true}
        spaceBetween={16}
        autoplay={{
          delay: 1000,
          disableOnInteraction: true,
        }}
        breakpoints={breakpoints}
        slidesPerView={slidesPerView}
        pagination={{
          clickable: true,
        }}
        className={`${slidesPerView !== 1 ? "!px-2 !py-5" : ""} ${className}`}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <Component {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
      {!withoutNavigator ? (
        <button
          onClick={handleNext}
          className={cn("left-0 !-translate-x-[20%]", btnClass, {
            "left-3 !translate-x-0 sm:left-5": slidesPerView === 1,
          })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 -translate-y-1/2 translate-x-1/2 sm:h-9 sm:w-9 sm:translate-x-0 sm:translate-y-0"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M19.0794 7.08154L20.9179 8.92002L13.8371 16.0008L20.9179 23.0815L19.0794 24.92L10.1602 16.0008L19.0794 7.08154Z"
              fill="#545353"
            />
          </svg>
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
