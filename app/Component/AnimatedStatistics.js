"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export default function AnimatedStatistics({ value, label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  // Framer Motion spring for smooth animation
  const spring = useSpring(0, { stiffness: 50, damping: 30 });

  useEffect(() => {
    const element = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          // Animate the spring value to the target 'value'
          spring.set(value);
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (element) {
      observer.observe(element);
    }

    // Cleanup: Subscribe to the spring's changes to update the text count
    const unsubscribe = spring.on("change", (latestValue) => {
      setCount(Math.round(latestValue));
    });

    return () => {
      if (element) {
        observer.unobserve(element);
      }
      unsubscribe();
    };
  }, [value, spring]);

  const circumference = 2 * Math.PI * 45; // Circle radius is 45
  const strokeDashoffset = useTransform(
    spring,
    [0, 100],
    [circumference, 0]
  );

  return (
    <div className="text-center flex flex-col items-center" ref={ref}>
      <div className="relative w-32 h-32">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background Circle (the uncolored border) */}
          <circle
            cx="50"
            cy="50"
            r="45"
            strokeWidth="10"
            className="stroke-gray-700"
            fill="none"
          />
          {/* Progress Circle (the red internal color) */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            strokeWidth="10"
            className="stroke-red-500"
            fill="none"
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            strokeDasharray={circumference}
            style={{ strokeDashoffset }}
          />
        </svg>
        {/* The animated number in the center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-3xl font-bold text-white">{count}%</p>
        </div>
      </div>
      <p className="text-sm md:text-base text-white/70 mt-4">{label}</p>
    </div>
  );
}
