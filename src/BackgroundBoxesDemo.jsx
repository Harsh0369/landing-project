import React from "react";
import { Boxes } from "./components/ui/background-boxes";
import clsx from "clsx"; // Alternative to cn for better Vite support

export function BackgroundBoxesDemo() {
  return (
    <div className="h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      {/* Radial Gradient Mask */}
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      {/* Animated Background */}
      <Boxes />

      {/* Content */}
      <h1 className={clsx("md:text-4xl text-xl text-white relative z-20")}>
        Tailwind is Awesome
      </h1>
      <p className="text-center mt-2 text-neutral-300 relative z-20">
        Framer Motion is the best animation library ngl
      </p>
    </div>
  );
}
