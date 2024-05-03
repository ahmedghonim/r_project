import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Text } from "@/components/ui/text";
import Image from "next/image";
import React from "react";
import our_story from "@/assets/img/feedback.png";
import { Button } from "@/components/ui/button";

const Feedback = () => {
  return (
    <div className="flex items-center relative md:h-[850px] h-[1200px]">
      <div className="absolute md:right-16 -right-8 md:top-[20vh] top-16 z-10">
        <svg
          className="md:scale-0 scale-50"
          width="104"
          height="104"
          viewBox="0 0 104 104"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.12">
            <path
              d="M79.0651 52.7627C88.7841 52.7627 95.3337 59.6456 95.3337 69.8439C95.3337 79.0211 87.806 86.6667 77.6103 86.6667C66.4427 86.6667 58.1908 77.4895 58.1908 63.4715C58.1908 31.6097 81.0089 18.865 95.3337 17.3333V31.3513C85.6208 33.135 74.7008 43.0749 74.2118 54.0422C74.7008 53.7901 76.6384 52.7627 79.0651 52.7627ZM29.5475 52.7627C39.2541 52.7627 45.8098 59.6456 45.8098 69.8439C45.8098 79.0211 38.2822 86.6667 28.0865 86.6667C16.9189 86.6667 8.66699 77.4895 8.66699 63.4715C8.66699 31.6097 31.4851 18.865 45.8098 17.3333V31.3513C36.097 33.135 25.177 43.0749 24.6879 54.0422C25.177 53.7901 27.1146 52.7627 29.5475 52.7627Z"
              fill="#F05445"
            />
          </g>
        </svg>
      </div>
      <div className="md:w-[17%] h-auto w-1/2 absolute md:left-[-118px] md:top-[270px] top-[102vh] ">
        <div className="bg-primary/60 absolute w-full h-full" />
        <Image
          src={our_story}
          className="w-full h-auto"
          alt="text logo"
          width={360}
          height={526}
        />
      </div>
      <Carousel className="z-20  mx-auto md:w-[79%] w-full h-fit mb-auto mt-[150px]">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="flex flex-col gap-4 md:flex-row w-full items-center"
            >
              <div className="md:w-[30%] w-full  h-auto bg-red-900">
                <Image
                  src={our_story}
                  className="w-full h-auto"
                  alt="text logo"
                  width={360}
                  height={526}
                />
              </div>

              <div className="md:flex-col flex-col-reverse flex items-start md:w-[70%]">
                <Text>
                  Lorem ipsum dolor sit amet consectetur. Massa sed dapibus
                  adipiscing felis at. Integer at dictum ullamcorper magna nam
                  eget. Elementum semper ultrices quam elementum dignissim etiam
                  velit molestie diam. Netus arcu varius lectus dignissim mollis
                  lorem pulvinar tortor arcu.
                </Text>
                <div className="flex-col flex items-start">
                  <Text variant="white" size="f2">
                    Carolyn Willms
                  </Text>
                  <Text variant="white" size="sm">
                    Doctor{" "}
                  </Text>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="md:-translate-x-[54px] translate-x-[40px] md:!top-[100%] !top-[140%] md:w-[70px] w-1/2">
          <Button
            as="span"
            className="md:w-[170px] w-full justify-between px-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M6.84617 8.00243L11.3291 3.69264C11.4526 3.57425 11.5205 3.41597 11.5205 3.2472C11.5205 3.07833 11.4526 2.92014 11.3291 2.80157L10.9363 2.42412C10.8131 2.30536 10.6483 2.23999 10.4728 2.23999C10.2972 2.23999 10.1326 2.30536 10.0093 2.42412L4.67162 7.5553C4.54779 7.67425 4.47998 7.83318 4.48047 8.00214C4.47998 8.17185 4.54769 8.3306 4.67162 8.44964L10.0043 13.5759C10.1277 13.6946 10.2922 13.76 10.4679 13.76C10.6434 13.76 10.808 13.6946 10.9314 13.5759L11.3242 13.1984C11.5797 12.9527 11.5797 12.5528 11.3242 12.3073L6.84617 8.00243Z"
                fill="white"
              />
            </svg>{" "}
            Previous
          </Button>
        </CarouselPrevious>

        <CarouselNext className="md:translate-x-[50px] translate-x-[-25px] md:!top-[100%] !top-[140%] w-1/2 md:w-[110px]">
          <Button as="span" className="w-full justify-between px-4">
            Next
            <svg
              className="ml-4"
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
            >
              <path
                d="M9.65383 7.99757L5.17088 12.3074C5.04744 12.4257 4.97953 12.584 4.97953 12.7528C4.97953 12.9217 5.04744 13.0799 5.17088 13.1984L5.5637 13.5759C5.68694 13.6946 5.85169 13.76 6.02725 13.76C6.20281 13.76 6.36736 13.6946 6.4907 13.5759L11.8284 8.4447C11.9522 8.32575 12.02 8.16682 12.0195 7.99786C12.02 7.82815 11.9523 7.6694 11.8284 7.55036L6.49568 2.42414C6.37233 2.30538 6.20778 2.24001 6.03212 2.24001C5.85656 2.24001 5.69201 2.30538 5.56857 2.42414L5.17585 2.80159C4.9203 3.04725 4.9203 3.44717 5.17585 3.69275L9.65383 7.99757Z"
                fill="white"
              />
            </svg>
          </Button>
        </CarouselNext>
      </Carousel>
      <div className="md:w-[17%] h-auto w-1/2 absolute md:right-[-118px] -right-4 md:top-[270px] top-[102vh] ">
        <div className="bg-primary/60 absolute w-full h-full" />
        <Image
          src={our_story}
          className="w-full h-auto"
          alt="text logo"
          width={360}
          height={526}
        />
      </div>
      <h2 className="stroke absolute md:-bottom-5 -bottom-4">FeedBack</h2>
    </div>
  );
};

export default Feedback;
