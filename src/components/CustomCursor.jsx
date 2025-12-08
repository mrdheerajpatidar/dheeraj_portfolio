import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const SELECTORS =
  "a, button, .cta-button, .contact-btn, .logo, [data-magnetic], .magnetic, input, textarea";

const CustomCursor = ({ disabled }) => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer || disabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;

    const move = ({ clientX, clientY }) => {
      gsap.to(dot, { x: clientX, y: clientY, duration: 0.2, ease: "expo.out" });
      gsap.to(ring, { x: clientX, y: clientY, duration: 0.35, ease: "expo.out" });
    };

    const show = () => setIsVisible(true);
    const hide = () => setIsVisible(false);

    document.addEventListener("pointermove", move);
    document.addEventListener("pointerenter", show);
    document.addEventListener("pointerleave", hide);

    const applyMagnet = (el) => {
      const onEnter = () => {
        gsap.to(ring, { scale: 1.8, duration: 0.3, ease: "expo.out" });
        gsap.to(dot, { scale: 0.7, duration: 0.2 });
      };

      const onLeave = () => {
        gsap.to(ring, { scale: 1, x: "+=0", y: "+=0", duration: 0.4 });
        gsap.to(dot, { scale: 1, duration: 0.3 });
        gsap.to(el, { x: 0, y: 0, duration: 0.35, ease: "expo.out" });
      };

      const onMove = (event) => {
        const rect = el.getBoundingClientRect();
        const x = event.clientX - (rect.left + rect.width / 2);
        const y = event.clientY - (rect.top + rect.height / 2);
        gsap.to(el, { x: x * 0.25, y: y * 0.25, duration: 0.35, ease: "expo.out" });
      };

      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointerleave", onLeave);
      el.addEventListener("pointermove", onMove);

      return () => {
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointerleave", onLeave);
        el.removeEventListener("pointermove", onMove);
      };
    };

    const interactiveEls = Array.from(document.querySelectorAll(SELECTORS));
    const cleanups = interactiveEls.map(applyMagnet);

    return () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerenter", show);
      document.removeEventListener("pointerleave", hide);
      cleanups.forEach((cleanup) => cleanup && cleanup());
    };
  }, [disabled]);

  const visibilityClass =
    isVisible && !disabled ? "opacity-100 scale-100" : "opacity-0 scale-75";

  return (
    <div className="custom-cursor pointer-events-none fixed inset-0 z-[110] mix-blend-difference">
      <div ref={ringRef} className={`cursor-ring ${visibilityClass}`} />
      <div ref={dotRef} className={`cursor-dot ${visibilityClass}`} />
    </div>
  );
};

export default CustomCursor;

