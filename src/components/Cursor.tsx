import { useEffect, useRef, useState } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    let hover = false;
    const cursor = cursorRef.current;
    if (!cursor) return;
    
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };
    
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };
    
    document.addEventListener("mousemove", handleMouseMove);
    
    let reqId: number;
    const loop = () => {
      if (!hover) {
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        gsap.to(cursor, { x: cursorPos.x, y: cursorPos.y, duration: 0.1 });
      }
      reqId = requestAnimationFrame(loop);
    };
    reqId = requestAnimationFrame(loop);

    const handleMouseOver = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const element = target;

      if (element.dataset.cursor === "icons") {
        cursor.classList.add("cursor-icons");
        gsap.to(cursor, { x: rect.left, y: rect.top, duration: 0.1 });
        cursor.style.setProperty("--cursorH", `${rect.height}px`);
        hover = true;
      }
      if (element.dataset.cursor === "disable") {
        cursor.classList.add("cursor-disable");
      }
    };

    const handleMouseOut = () => {
      cursor.classList.remove("cursor-disable", "cursor-icons");
      hover = false;
    };

    const interactiveElements = document.querySelectorAll("[data-cursor]");
    interactiveElements.forEach((item) => {
      item.addEventListener("mouseover", handleMouseOver);
      item.addEventListener("mouseout", handleMouseOut);
    });

    return () => {
      cancelAnimationFrame(reqId);
      document.removeEventListener("mousemove", handleMouseMove);
      interactiveElements.forEach((item) => {
        item.removeEventListener("mouseover", handleMouseOver);
        item.removeEventListener("mouseout", handleMouseOut);
      });
    };
  }, [isMobile]);

  if (isMobile) return null;

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
