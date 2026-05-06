"use client";

import React, { memo, useEffect, useRef } from "react";

const AmbientCanvas = memo(function AmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let frame: number;


    let width = 0;
    let height = 0;

    const blobs = Array.from({ length: 9 }, (_, index) => ({
      x: Math.random(),
      y: Math.random(),
      radius: 0.18 + Math.random() * 0.22,
      vx: (Math.random() - 0.5) * 0.00045,
      vy: (Math.random() - 0.5) * 0.00035,
      color: index % 3 === 0 ? "234,88,12" : index % 3 === 1 ? "225,29,72" : "253,186,116"
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      blobs.forEach((blob) => {
        blob.x += blob.vx;
        blob.y += blob.vy;

        if (blob.x < -0.1 || blob.x > 1.1) blob.vx *= -1;
        if (blob.y < -0.1 || blob.y > 1.1) blob.vy *= -1;

        const x = blob.x * width;
        const y = blob.y * height;
        const r = blob.radius * Math.max(width, height);
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);

        gradient.addColorStop(0, `rgba(${blob.color},0.5)`);
        gradient.addColorStop(0.45, `rgba(${blob.color},0.2)`);
        gradient.addColorStop(1, `rgba(${blob.color},0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalCompositeOperation = "source-over";
      frame = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
});

export default AmbientCanvas;