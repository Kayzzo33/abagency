import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          Formação <span>&</span>
          <br /> Especialização
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Especialista em Canva</h4>
                <h5>Design & Criatividade</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Curso avançado de Canva focado em criação de identidades visuais e artes para redes sociais de alto impacto.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Design para Redes Sociais</h4>
                <h5>Visual Ads</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Especialização em design voltado para conversão e engajamento em plataformas como Instagram, Facebook e TikTok.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Social Media Marketing</h4>
                <h5>Digital Strategy</h5>
              </div>
              <h3>AGORA</h3>
            </div>
            <p translate="no">
              Aplicação de estratégias de posicionamento e gestão de redes sociais para transformar perfis comuns em marcas memoráveis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
