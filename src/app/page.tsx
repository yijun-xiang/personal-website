"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";

const Scene = dynamic(() => import("@/components/canvas/Scene"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 -z-10 bg-gradient-to-b from-gray-950 via-gray-900 to-black" />
  ),
});

export default function Home() {
  return (
    <main>
      <Scene />
      <div className="min-h-screen flex flex-col items-center justify-center font-sans p-4 overflow-hidden">
        <Hero />
      </div>
    </main>
  );
}
