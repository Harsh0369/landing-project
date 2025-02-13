import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className = "",
  containerClassName = "",
  colors = ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"],
  waveWidth = 50,
  backgroundFill = "black",
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}) => {
  const noise = createNoise3D();
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [isSafari, setIsSafari] = useState(false);

  // Detect Safari
  useEffect(() => {
    setIsSafari(
      typeof navigator !== "undefined" &&
        /Safari/.test(navigator.userAgent) &&
        /Apple Computer/.test(navigator.vendor)
    );
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const getSpeed = () => (speed === "slow" ? 0.001 : 0.002);

    let w = (ctx.canvas.width = window.innerWidth);
    let h = (ctx.canvas.height = window.innerHeight);
    let nt = 0;

    const resizeCanvas = () => {
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);

    const drawWave = (n) => {
      nt += getSpeed();
      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth;
        ctx.strokeStyle = colors[i % colors.length];

        for (let x = 0; x < w; x += 5) {
          const y = noise(x / 800, 0.3 * i, nt) * 100;
          ctx.lineTo(x, y + h * 0.5);
        }

        ctx.stroke();
        ctx.closePath();
      }
    };

    const render = () => {
      ctx.fillStyle = backgroundFill;
      ctx.globalAlpha = waveOpacity;
      ctx.fillRect(0, 0, w, h);
      drawWave(5);
      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [speed, colors, waveWidth, backgroundFill, waveOpacity]);

  return (
    <div
      className={`h-screen flex flex-col items-center justify-center ${containerClassName}`}
    >
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        style={isSafari ? { filter: `blur(${blur}px)` } : {}}
      />
      <div className={`relative z-10 ${className}`} {...props}>
        {children}
      </div>
    </div>
  );
};
