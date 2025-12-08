import { useEffect, useMemo, useState } from "react";
import { useProgress } from "@react-three/drei";

const STATIC_ASSETS = [
  "/images/bg.png",
  "/images/me/img1.jpg",
  "/images/project1.png",
  "/images/project2.png",
  "/images/project3.png",
  "/images/exp1.png",
  "/images/exp2.png",
  "/images/exp3.png",
  "/images/client1.png",
  "/images/client2.png",
  "/images/client3.png",
  "/images/client4.png",
  "/images/client5.png",
  "/images/client6.png",
  "/images/logos/react.png",
  "/images/logos/next.png",
  "/images/logos/node.png",
  "/images/logos/three.png",
  "/images/logos/gsap.png",
  "/images/logos/tailwind.png",
  "/images/readme.png",
  "/images/seo.png",
  "/images/chat.png",
  "/images/time.png",
  "/models/optimized-room.glb",
  "/models/react_logo-transformed.glb",
  "/models/node-transformed.glb",
  "/models/python-transformed.glb",
  "/models/three.js-transformed.glb",
  "/models/git-svg-transformed.glb",
];

const loadAsset = (url) =>
  new Promise((resolve) => {
    if (url.endsWith(".glb")) {
      fetch(url)
        .then(() => resolve(true))
        .catch(() => resolve(false));
      return;
    }

    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });

const useStaticAssetProgress = () => {
  const [loaded, setLoaded] = useState(0);
  const total = STATIC_ASSETS.length;

  useEffect(() => {
    let cancelled = false;
    STATIC_ASSETS.forEach((asset) => {
      loadAsset(asset).finally(() => {
        if (!cancelled) setLoaded((prev) => prev + 1);
      });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return { loaded, total };
};

const Preloader = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const { loaded, total, active } = useProgress();
  const { loaded: staticLoaded, total: staticTotal } = useStaticAssetProgress();

  const combined = useMemo(() => {
    const combinedTotal = Math.max(staticTotal + total, 1);
    const combinedLoaded = staticLoaded + loaded;
    const percent = Math.min(
      100,
      Math.round((combinedLoaded / combinedTotal) * 100)
    );

    return { percent, combinedTotal, combinedLoaded };
  }, [loaded, staticLoaded, staticTotal, total]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.pointerEvents = "none";

    return () => {
      document.body.style.overflow = "";
      document.body.style.pointerEvents = "";
    };
  }, []);

  useEffect(() => {
    if (combined.percent >= 100 && !active) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
        document.body.style.overflow = "";
        document.body.style.pointerEvents = "";
      }, 600);

      return () => clearTimeout(timeout);
    }
  }, [active, combined.percent, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="preloader fixed inset-0 z-[120] flex items-center justify-center">
      <div className="preloader__backdrop" />

      <div className="preloader__content">
        <p className="preloader__tag">Preparing experience</p>
        <h1 className="preloader__value">
          {combined.percent.toString().padStart(3, "0")}
          <span className="preloader__unit">%</span>
        </h1>
        <p className="preloader__footnote">
          Loading {combined.combinedLoaded ?? 0}/{combined.combinedTotal ?? 0}{" "}
          assets
        </p>
        <div className="preloader__bar">
          <span style={{ width: `${combined.percent}%` }} />
        </div>
      </div>
    </div>
  );
};

export default Preloader;

