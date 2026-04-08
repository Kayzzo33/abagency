import { SplitText } from "gsap-trial/SplitText";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { smoother } from "../Navbar";

gsap.registerPlugin(TextPlugin);

export function initialFX() {
  document.body.style.overflowY = "auto";
  smoother.paused(false);
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0f0909",
    duration: 0.5,
    delay: 1,
  });

  const TextProps = { type: "chars,lines", linesClass: "split-h2" };

  // Static texts that appear on load (fade in once)
  const landingText = new SplitText(
    [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
    { type: "chars,lines", linesClass: "split-line" }
  );
  gsap.fromTo(
    landingText.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    { opacity: 1, duration: 1.2, ease: "power1.inOut", delay: 0.1 }
  );

  // Split all animated texts
  const purpleA = new SplitText(".landing-h2-1", TextProps); // "Resultados Reais"

  gsap.set(purpleA.chars, { opacity: 0, y: 60 });
  
  // Entrance animation for "Resultados Reais" (run only once)
  gsap.fromTo(
    purpleA.chars,
    { y: 60, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.035, delay: 1.5 }
  );

  // Typing effect loop for "Estratégia que gera impacto"
  const typingText = "estratégia que gera impacto";
  const typeTarget = document.querySelector(".typing-text");
  
  if (typeTarget) {
    // Clear initial text to prepare for typing
    typeTarget.innerHTML = "";
    
    // Create typing loop
    const typeLoop = gsap.timeline({ repeat: -1, delay: 2.5 });
    
    // Type text forward
    typeLoop.to(typeTarget, {
      text: typingText,
      duration: 1.5,
      ease: "none",
    });
    
    // Hold
    typeLoop.to({}, { duration: 3 });
    
    // Erase text backward
    typeLoop.to(typeTarget, {
      text: "",
      duration: 1.0,
      ease: "none",
    });
    
    // Wait before repeating
    typeLoop.to({}, { duration: 0.5 });
  }
}
