import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    // If it's a mobile layout, bind click events properly
    const isMobileLayout = window.innerWidth <= 900 || ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
    if (isMobileLayout) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          O QU<span className="hat-h2">E</span>
          <div>
            FAZ<span className="do-h2">EMOS</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>SOCIAL MEDIA</h3>
              <h4>Gestão & Estratégia</h4>
              <p>
                Transformamos sua presença digital com planejamento estratégico, gestão de conteúdo e análise de métricas. Atendemos Rondon do Pará, Abel Figueiredo, Marabá, Dom Eliseu, Imperatriz e região.
                <br /><br />
                <strong>Política:</strong> 100% do pagamento na contratação.
              </p>
              <h5>Expertise</h5>
              <div className="what-content-flex">
                <div className="what-tags">Instagram</div>
                <div className="what-tags">Facebook</div>
                <div className="what-tags">TikTok</div>
                <div className="what-tags">Linkedin</div>
                <div className="what-tags">Estratégia</div>
                <div className="what-tags">Copywriting</div>
                <div className="what-tags">Tráfego Pago</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>DESIGN & VÍDEO</h3>
              <h4>Visual Memorável</h4>
              <p>
                Criação de identidades visuais impactantes e edições de vídeo profissionais que captam a essência da sua marca.
              </p>
              <h5>Ferramentas</h5>
              <div className="what-content-flex">
                <div className="what-tags">Canva</div>
                <div className="what-tags">CapCut</div>
                <div className="what-tags">Photoshop</div>
                <div className="what-tags">Premiere</div>
                <div className="what-tags">After Effects</div>
                <div className="what-tags">Identidade Visual</div>
                <div className="what-tags">Motion Design</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
