import { PropsWithChildren, useEffect, useState } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import Testimonials from "./Testimonials";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";
import { useLoading } from "../context/LoadingProvider";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { smoother } from "./Navbar";

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  const { isLoading } = useLoading();

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isDesktopView]);

  // Global refresh after loading
  useEffect(() => {
    if (!isLoading) {
      if (smoother) smoother.paused(false);
      
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <WhatIDo />
            <Career />
            <Work />
            <Testimonials />
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
