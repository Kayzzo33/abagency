import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  const JKAYZZ_WA = "https://wa.me/5573988027104?text=Vi%20o%20seu%20portf%C3%B3lio%20da%20AB%20Agency%20e%20me%20interessei%20em%20saber%20como%20posso%20estar%20desenvolvendo%20o%20meu%20site%20com%20voc%C3%AA.";
  const AB_AGENCY_WA = "https://wa.me/5599992055510?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20AB%20Agency%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.";

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contato</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>E-mail</h4>
            <p>
              <a href="mailto:anasilvateruko@gmail.com" data-cursor="disable">
                anasilvateruko@gmail.com
              </a>
            </p>
            <h4>Telefone / WhatsApp</h4>
            <p>
              <a href={AB_AGENCY_WA} target="_blank" data-cursor="disable">
                +55 99 9 9205-5510
              </a>
            </p>
            <h4>Regiões</h4>
            <p>
              Rondon do Pará, Abel Figueiredo, Marabá, Dom Eliseu, Imperatriz do Maranhão, Bom Jesus e região.
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href={AB_AGENCY_WA}
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              WhatsApp <MdArrowOutward />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Instagram <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Desenvolvido Por <br /> <a href={JKAYZZ_WA} target="_blank" data-cursor="disable"><span>JKayzz</span></a>
            </h2>
            <h5>
              <MdCopyright /> 2025
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
