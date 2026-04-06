"use client";

import { useEffect, useRef } from "react";

type LetterGlitchProps = {
  glitchColors?: string[];
  className?: string;
  glitchSpeed?: number;
  centerVignette?: boolean;
  outerVignette?: boolean;
  smooth?: boolean;
  characters?: string;
};

type LetterCell = {
  char: string;
  baseColor: string;
  currentColor: string;
  targetColor: string;
  colorProgress: number;
};

const fontSize = 16;
const charWidth = 10;
const charHeight = 20;

export default function LetterGlitch({
  glitchColors = ['#2b4539', '#61dca3', '#61b3dc'],
  className = "",
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789",
}: LetterGlitchProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const letters = useRef<LetterCell[]>([]);
  const grid = useRef({ columns: 0, rows: 0 });
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const lastGlitchTime = useRef(0);

  const hexToRgb = (hex: string) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const normalizedHex = hex.replace(shorthandRegex, (_, r, g, b) => {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(normalizedHex);

    return result
      ? {
          r: Number.parseInt(result[1], 16),
          g: Number.parseInt(result[2], 16),
          b: Number.parseInt(result[3], 16),
        }
      : null;
  };

  const interpolateColor = (
    start: { r: number; g: number; b: number },
    end: { r: number; g: number; b: number },
    factor: number,
  ) => {
    const result = {
      r: Math.round(start.r + (end.r - start.r) * factor),
      g: Math.round(start.g + (end.g - start.g) * factor),
      b: Math.round(start.b + (end.b - start.b) * factor),
    };

    return `rgb(${result.r}, ${result.g}, ${result.b})`;
  };

  const calculateGrid = (width: number, height: number) => {
    const columns = Math.ceil(width / charWidth);
    const rows = Math.ceil(height / charHeight);
    return { columns, rows };
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const lettersAndSymbols = Array.from(characters);

    const getRandomChar = () =>
      lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)] ?? "A";

    const getRandomColor = () =>
      glitchColors[Math.floor(Math.random() * glitchColors.length)] ?? "#61dca3";

    const initializeLetters = (columns: number, rows: number) => {
      grid.current = { columns, rows };
      const totalLetters = columns * rows;

      letters.current = Array.from({ length: totalLetters }, () => {
        const initialColor = getRandomColor();

        return {
          char: getRandomChar(),
          baseColor: initialColor,
          currentColor: initialColor,
          targetColor: initialColor,
          colorProgress: 1,
        };
      });
    };

    const drawLetters = () => {
      const currentCanvas = canvasRef.current;
      const ctx = context.current;

      if (!currentCanvas || !ctx || letters.current.length === 0) {
        return;
      }

      const { width, height } = currentCanvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      ctx.font = `${fontSize}px monospace`;
      ctx.textBaseline = "top";

      letters.current.forEach((letter, index) => {
        const x = (index % grid.current.columns) * charWidth;
        const y = Math.floor(index / grid.current.columns) * charHeight;
        ctx.fillStyle = letter.currentColor;
        ctx.fillText(letter.char, x, y);
      });
    };

    const resizeCanvas = () => {
      const currentCanvas = canvasRef.current;

      if (!currentCanvas) {
        return;
      }

      const parent = currentCanvas.parentElement;

      if (!parent) {
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();

      currentCanvas.width = rect.width * dpr;
      currentCanvas.height = rect.height * dpr;
      currentCanvas.style.width = `${rect.width}px`;
      currentCanvas.style.height = `${rect.height}px`;

      if (context.current) {
        context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      const { columns, rows } = calculateGrid(rect.width, rect.height);
      initializeLetters(columns, rows);
      drawLetters();
    };

    const updateLetters = () => {
      if (letters.current.length === 0) {
        return;
      }

      const updateCount = Math.max(1, Math.floor(letters.current.length * 0.05));

      for (let index = 0; index < updateCount; index += 1) {
        const randomIndex = Math.floor(Math.random() * letters.current.length);
        const cell = letters.current[randomIndex];

        if (!cell) {
          continue;
        }

        const nextColor = getRandomColor();
        cell.char = getRandomChar();
        cell.baseColor = cell.currentColor;
        cell.targetColor = nextColor;

        if (!smooth) {
          cell.currentColor = nextColor;
          cell.colorProgress = 1;
        } else {
          cell.colorProgress = 0;
        }
      }
    };

    const handleSmoothTransitions = () => {
      let needsRedraw = false;

      letters.current.forEach((letter) => {
        if (letter.colorProgress >= 1) {
          return;
        }

        letter.colorProgress = Math.min(letter.colorProgress + 0.05, 1);

        const startRgb = hexToRgb(letter.baseColor);
        const endRgb = hexToRgb(letter.targetColor);

        if (!startRgb || !endRgb) {
          letter.currentColor = letter.targetColor;
          needsRedraw = true;
          return;
        }

        letter.currentColor = interpolateColor(startRgb, endRgb, letter.colorProgress);
        needsRedraw = true;
      });

      if (needsRedraw) {
        drawLetters();
      }
    };

    const animate = (timestamp: number) => {
      if (timestamp - lastGlitchTime.current >= glitchSpeed) {
        updateLetters();
        drawLetters();
        lastGlitchTime.current = timestamp;
      }

      if (smooth) {
        handleSmoothTransitions();
      }

      animationRef.current = window.requestAnimationFrame(animate);
    };

    context.current = canvas.getContext("2d");
    lastGlitchTime.current = 0;
    resizeCanvas();
    animationRef.current = window.requestAnimationFrame(animate);

    let resizeTimeout: number | undefined;

    const handleResize = () => {
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }

      resizeTimeout = window.setTimeout(() => {
        if (animationRef.current) {
          window.cancelAnimationFrame(animationRef.current);
        }

        lastGlitchTime.current = 0;
        resizeCanvas();
        animationRef.current = window.requestAnimationFrame(animate);
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }

      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
      }

      window.removeEventListener("resize", handleResize);
    };
  }, [characters, glitchColors, glitchSpeed, smooth]);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "#000000",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
      />
      {outerVignette ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: "radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)",
          }}
        />
      ) : null}
      {centerVignette ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: "radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)",
          }}
        />
      ) : null}
    </div>
  );
}
