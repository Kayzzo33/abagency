import { useEffect, useState, useRef } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLoading } from "../context/LoadingProvider";

gsap.registerPlugin(useGSAP);

const projects = [
  { name: "Gestão de Redes Sociais", category: "Social Media", tools: "Instagram, Facebook, TikTok, Canva" },
  { name: "Identidade Visual", category: "Design", tools: "Canva, Photoshop, Figma" },
  { name: "Edição de Vídeo", category: "Videomaker", tools: "CapCut, Premiere, After Effects" },
  { name: "Criação de Conteúdo", category: "Marketing Digital", tools: "Canva, Copywriting, Tráfego Pago" },
  { name: "Estética Automotiva", category: "Nicho Especializado", tools: "Social Media, Design, Vídeo" },
  { name: "Restaurantes & Gastronomia", category: "Nicho Especializado", tools: "Social Media, Design, Fotografia" },
];

const isTabletOrMobile = () => window.innerWidth <= 1024;

const Work = () => {
  const { isLoading } = useLoading();
  const [isMobile, setIsMobile] = useState(isTabletOrMobile());
  const sectionRef = useRef<HTMLDivElement>(null);
  const flexRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onResize = () => setIsMobile(isTabletOrMobile());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useGSAP(() => {
    // IMPORTANTE: Esperar o site carregar e o smoother estabilizar
    if (isLoading) return;

    if (isMobile) {
      // Mobile: fade-in dos cards ao entrar no viewport
      const boxes = document.querySelectorAll(".work-section-mobile .work-box");
      boxes.forEach((box) => {
        gsap.fromTo(
          box,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: box, start: "top 85%", once: true },
          }
        );
      });
      return;
    }

    // ───────────────────────────────────────────────────────────────
    // DESKTOP: Scroll horizontal com GSAP pin: true
    //
    // O site usa ScrollSmoother que seta overflow:hidden nos pais.
    // position:sticky NÃO funciona dentro de ScrollSmoother.
    // A ÚNICA forma correta é pin:true do GSAP ScrollTrigger.
    //
    // IMPORTANTE: Só criamos o ScrollTrigger quando isLoading é false
    // para garantir que os boxes já estejam renderizados e com 
    // dimensões reais no DOM.
    // ───────────────────────────────────────────────────────────────

    const getScrollAmount = () => {
      if (!flexRef.current) return 2000;
      const boxes = flexRef.current.querySelectorAll<HTMLElement>(".work-box");
      
      let total = 0;
      if (boxes.length > 0) {
        boxes.forEach((b) => (total += b.offsetWidth));
      } else {
        // Fallback: 6 boxes * 600px
        total = 3600;
      }
      
      const amount = total - window.innerWidth;
      return Math.max(amount, 500);
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1.5,
        start: "top top",
        end: () => `+=${getScrollAmount()}`,
        id: "work",
        invalidateOnRefresh: true,
        refreshPriority: 10,  // Alta prioridade para ser calculado cedo
      },
    });

    tl.to(
      flexRef.current,
      { x: () => -getScrollAmount(), ease: "none" },
      0
    );

    // Refresh extra após um curto silêncio do layout
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      tl.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, [isMobile, isLoading]);

  // ─── MOBILE ──────────────────────────────
  if (isMobile) {
    return (
      <div className="work-section work-section-mobile" id="work" ref={sectionRef}>
        <div className="work-container section-container">
          <h2>
            Meu <span>Portfólio</span>
          </h2>
          <div className="work-flex work-flex-mobile" ref={flexRef}>
            {projects.map((project, index) => (
              <div className="work-box" key={index}>
                <div className="work-info">
                  <div className="work-title">
                    <h3>0{index + 1}</h3>
                    <div>
                      <h4>{project.name}</h4>
                      <p>{project.category}</p>
                    </div>
                  </div>
                  <h4>Ferramentas</h4>
                  <p>{project.tools}</p>
                </div>
                <WorkImage image="/images/placeholder.webp" alt={project.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ─── DESKTOP ──────────────────────────────
  return (
    <div className="work-section" id="work" ref={sectionRef}>
      <div className="work-container section-container">
        <h2>
          Meu <span>Portfólio</span>
        </h2>
        <div className="work-flex" ref={flexRef}>
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Ferramentas</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image="/images/placeholder.webp" alt={project.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
