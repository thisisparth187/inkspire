"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ChevronLeftIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRightIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const textData = [
  {
    id: 1,
    heading: "Getting Started with React Hooks",
    description: "Learn the fundamentals of React Hooks and how they can simplify your component logic.",
    author: "Sarah Chen"
  },
  {
    id: 2,
    heading: "The Future of Web Development",
    description: "Explore emerging trends in web development including AI integration, serverless architecture, and PWAs.",
    author: "Marcus Rodriguez"
  },
  {
    id: 3,
    heading: "Mastering CSS Grid Layout",
    description: "Unlock the power of CSS Grid to create complex, responsive layouts with ease.",
    author: "Emily Johnson"
  }
];

export default function TextCarousel() {
  const [activeIndex, setActiveIndex] = useState(Math.floor(textData.length / 2));
  const [isPaused, setIsPaused] = useState(false);
  const autoplayIntervalRef = useRef(null);
  const autoplayDelay = 4000;

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % textData.length);
  };

  useEffect(() => {
    if (!isPaused) {
      autoplayIntervalRef.current = setInterval(goToNext, autoplayDelay);
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [isPaused, activeIndex]);

  const changeSlide = (newIndex) => {
    const newSafeIndex = (newIndex + textData.length) % textData.length;
    setActiveIndex(newSafeIndex);

    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    if (!isPaused) autoplayIntervalRef.current = setInterval(goToNext, autoplayDelay);
  };

  const handleReadMore = (item) => {
    alert(`Read more about: ${item.heading}\n\n${item.description}`);
  };

  return (
    <section className="w-full flex-col items-center justify-center font-sans overflow-hidden my-16">
      <div
        className="w-full max-w-4xl mx-auto p-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative flex w-full flex-col rounded-3xl border border-border bg-background p-6">
          <div className="relative w-full h-[320px] flex items-center justify-center overflow-hidden pt-16">
            <div className="w-full max-w-2xl text-center">
              {textData.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="absolute inset-0 flex flex-col items-center justify-center px-6"
                  initial={false}
                  animate={{
                    opacity: index === activeIndex ? 1 : 0,
                    y: index === activeIndex ? 0 : 20,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      opacity: { duration: 0.3 },
                    },
                  }}
                  style={{
                    pointerEvents: index === activeIndex ? "auto" : "none",
                  }}
                >
                  <motion.h2
                    className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: index === activeIndex ? 1 : 0,
                      y: index === activeIndex ? 0 : 20,
                    }}
                    transition={{ delay: 0.1 }}
                  >
                    {item.heading}
                  </motion.h2>

                  <motion.p
                    className="hidden lg:block text-lg text-muted-foreground leading-relaxed mb-4 max-w-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: index === activeIndex ? 1 : 0,
                      y: index === activeIndex ? 0 : 20,
                    }}
                    transition={{ delay: 0.2 }}
                  >
                    {item.description}
                  </motion.p>

                  <motion.p
                    className="text-sm text-muted-foreground mb-6 font-medium"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: index === activeIndex ? 1 : 0,
                      y: index === activeIndex ? 0 : 20,
                    }}
                    transition={{ delay: 0.25 }}
                  >
                    by {item.author}
                  </motion.p>

                  <motion.button
                    onClick={() => handleReadMore(item)}
                    className="px-6 py-3 bg-primary text-secondary font-semibold rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: index === activeIndex ? 1 : 0,
                      y: index === activeIndex ? 0 : 20,
                    }}
                    transition={{ delay: 0.3 }}
                  >
                    Read More
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <button
              onClick={() => changeSlide(activeIndex - 1)}
              className="p-2 rounded-full bg-muted hover:bg-muted/80 border border-border text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2">
              {textData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => changeSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                    activeIndex === index ? "w-6 bg-primary" : "w-2 bg-secondary"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => changeSlide(activeIndex + 1)}
              className="p-2 rounded-full bg-muted hover:bg-muted/80 border border-border text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
