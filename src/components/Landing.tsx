import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Olá! Somos a</h2>
            <h1>
              AB
              <br />
              <span>AGENCYS</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3 className="landing-h3">Transformo perfis comuns em</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Resultados Reais</div>
            </h2>
            <div className="typing-box-container">
              <div className="typing-box">
                <span className="typing-text">estratégia que gera impacto</span>
                <span className="typing-cursor"></span>
                <div className="typing-handle typing-handle-left"></div>
                <div className="typing-handle typing-handle-right"></div>
              </div>
            </div>
          </div>
          <div className="landing-ana-photo">
            <img src="/images/Ana.png" alt="Ana" />
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
