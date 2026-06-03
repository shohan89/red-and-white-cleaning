"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Before cleaning",
  afterAlt = "After cleaning",
  className = "",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleMouseUp]);

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onTouchStart = () => {
    setIsDragging(true);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[350px] sm:h-[450px] rounded-2xl overflow-hidden shadow-lg select-none cursor-ew-resize border border-border bg-muted ${className}`}
    >
      {/* Before Image (Background) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={beforeImage}
          alt={beforeAlt}
          fill
          sizes="(max-w-768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
        {/* Floating before label */}
        <span className="absolute bottom-4 left-4 z-10 rounded bg-brand-dark/70 px-3 py-1 text-xs font-semibold text-brand-white uppercase tracking-wider backdrop-blur-sm pointer-events-none">
          Before
        </span>
      </div>

      {/* After Image (Foreground with dynamic clip width) */}
      <div
        className="absolute inset-0 h-full overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <div className="absolute inset-0 w-[100vw] h-full" style={{ width: containerRef.current?.offsetWidth || "100%" }}>
          <Image
            src={afterImage}
            alt={afterAlt}
            fill
            sizes="(max-w-768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>
        {/* Floating after label */}
        <span className="absolute bottom-4 right-4 z-10 rounded bg-brand-red/90 px-3 py-1 text-xs font-semibold text-brand-white uppercase tracking-wider shadow-sm pointer-events-none whitespace-nowrap">
          After
        </span>
      </div>

      {/* Drag handle line & circle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-brand-white cursor-ew-resize z-20 shadow-lg"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        {/* Handle Central Widget */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-brand-white border-2 border-brand-red flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-200">
          <svg
            className="w-5 h-5 text-brand-red"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M8 9l-3 3 3 3m8-6l3 3-3 3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
