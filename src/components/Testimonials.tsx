import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLoading } from "../context/LoadingProvider";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Testimonials.css";

const testimonials = [
  {
    text: "A AB Agencys transformou completamente a presença da minha marca nas redes sociais. Em menos de 2 meses, meu engajamento triplicou e comecei a receber clientes direto pelo Instagram.",
    name: "CARLA M.",
    role: "Empreendedora Local",
    initials: "CM",
  },
  {
    text: "Profissionalismo e criatividade em cada entrega. Os vídeos que produziram para o meu negócio ficaram incríveis — meu público amou e as vendas aumentaram de verdade.",
    name: "RODRIGO F.",
    role: "Dono de Restaurante",
    initials: "RF",
  },
  {
    text: "Antes eu não sabia como me posicionar no digital. Hoje tenho uma identidade visual forte, conteúdo consistente e clientes chegando todo dia. Recomendo demais!",
    name: "JÉSSICA L.",
    role: "Personal Trainer",
    initials: "JL",
  },
  {
    text: "O atendimento é diferenciado — prestam atenção em cada detalhe do que a gente precisa. Os resultados falam por si: meu perfil cresceu mais de 400% em 3 meses.",
    name: "MARCOS A.",
    role: "Consultor Financeiro",
    initials: "MA",
  },
  {
    text: "Minha loja nunca teve tanta visibilidade. As artes para o feed e os reels ficaram no nível das grandes marcas. Não imagino trabalhar com outra agência.",
    name: "PRISCILA R.",
    role: "Loja de Roupas",
    initials: "PR",
  },
  {
    text: "Super comprometidos com resultado. Entregaram tudo no prazo, com qualidade altíssima, e ainda foram além do que eu esperava. Parceria de longo prazo com certeza.",
    name: "ANDERSON B.",
    role: "Arquiteto & Designer",
    initials: "AB",
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isLoading } = useLoading();

  useGSAP(() => {
    if (isLoading) return;

    const cards = sectionRef.current?.querySelectorAll(".testimonial-card");
    const header = sectionRef.current?.querySelector(".testimonials-header");

    if (!cards || !header) return;

    // Header Animation
    gsap.fromTo(
      header,
      { opacity: 0, scale: 0.95, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: header,
          start: "top 85%",
          toggleActions: "play none none reverse",
          once: true,
        },
      }
    );

    // Cards "Better Emergence" Animation
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: "power3.out",
      stagger: {
        amount: 0.8,
        from: "start",
      },
      scrollTrigger: {
        trigger: ".testimonials-grid",
        start: "top 80%",
        toggleActions: "play none none reverse",
        once: true,
      },
    });
  }, [isLoading]);

  return (
    <div className="testimonials-section" ref={sectionRef} id="testimonials">
      <div className="testimonials-header">
        <h2>
          Depoi<span>mentos</span>
        </h2>
        <p>Histórias reais de clientes que transformaram suas marcas</p>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((t, i) => (
          <div className="testimonial-card" key={i}>
            <div className="test-border">
              <svg width="100%" height="100%">
                <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
              </svg>
            </div>
            <div className="test-corner"></div>

            <div className="testimonial-content-in">
              <span className="testimonial-quote-mark">"</span>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initials}</div>
                <div className="testimonial-author-info">
                  <span className="testimonial-author-name">{t.name}</span>
                  <span className="testimonial-author-role">{t.role}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
