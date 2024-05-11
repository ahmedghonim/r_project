"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import Arrow from "@/svg/right-arrow";

function ScrollTop() {
  //scroll top

  const [appearnce, setApperance] = useState<boolean>(false);
  // scroll to top of the page
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // show and hide scroll button
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (scrollY > 500) {
        setApperance(true);
      } else setApperance(false);
    });
  }, []);
  return (
    <Button
      onClick={scrollTop}
      variant="ghost"
      className={`size-[60px] border border-primary rounded-full fixed right-16 bottom-6 duration-500 z-[100]  
        // appearnce ? "opacity-1" : "opacity-0"
      `}
    >
      <Arrow className="-rotate-90" />
    </Button>
  );
}

export default ScrollTop;
