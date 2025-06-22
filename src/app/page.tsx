import Hero from "@/components/sections/Hero";
import Scene from "@/components/canvas/Scene";

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