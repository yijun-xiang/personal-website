'use client';
import React, { useState, useMemo, useCallback, lazy, Suspense, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, X, Plane, MapPin } from 'lucide-react';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);
  return isMobile;
};

const ComposableMap = lazy(() => import('react-simple-maps').then(module => ({ default: module.ComposableMap })));
const Geographies = lazy(() => import('react-simple-maps').then(module => ({ default: module.Geographies })));
const Geography = lazy(() => import('react-simple-maps').then(module => ({ default: module.Geography })));

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface VisitedCountry {
  id: string;
  name: string;
  region: string;
}

interface GeographyProps {
  rsmKey: string;
  id: string;
  properties: {
    name: string;
  };
}

interface GeographiesRenderProps {
  geographies: GeographyProps[];
}

const visitedCountries: VisitedCountry[] = [
  { id: "826", name: "United Kingdom", region: "Europe" },
  { id: "352", name: "Iceland", region: "Europe" },
  { id: "250", name: "France", region: "Europe" },
  { id: "756", name: "Switzerland", region: "Europe" },
  { id: "392", name: "Japan", region: "Asia" },
  { id: "410", name: "South Korea", region: "Asia" },
  { id: "156", name: "China", region: "Asia" },
  { id: "372", name: "Ireland", region: "Europe" },
  { id: "492", name: "Monaco", region: "Europe" },
  { id: "056", name: "Belgium", region: "Europe" },
  { id: "528", name: "Netherlands", region: "Europe" },
  { id: "380", name: "Italy", region: "Europe" },
  { id: "336", name: "Vatican City", region: "Europe" },
  { id: "300", name: "Greece", region: "Europe" },
  { id: "276", name: "Germany", region: "Europe" },
  { id: "724", name: "Spain", region: "Europe" },
  { id: "620", name: "Portugal", region: "Europe" },
  { id: "702", name: "Singapore", region: "Asia" },
  { id: "158", name: "Taiwan", region: "Asia" },
  { id: "608", name: "Philippines", region: "Asia" },
  { id: "784", name: "United Arab Emirates", region: "Middle East" },
  { id: "124", name: "Canada", region: "North America" },
  { id: "414", name: "Kuwait", region: "Middle East" },
  { id: "682", name: "Saudi Arabia", region: "Middle East" },
  { id: "840", name: "United States", region: "North America" },
];

const MapLoader = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="relative">
      <div className="w-20 h-20 border-2 border-cyan-500/20 rounded-full"></div>
      <div className="absolute inset-0 w-20 h-20 border-2 border-transparent border-t-cyan-400 rounded-full animate-spin"></div>
      <Plane className="absolute inset-0 m-auto w-8 h-8 text-cyan-400" />
    </div>
  </div>
);

const WorldMap = React.memo(({
  visitedCountryCodes,
  onCountryClick,
  onCountryHover,
  onCountryLeave,
  highlightedCountryId,
  isMobile
}: {
  visitedCountryCodes: Set<string>;
  onCountryClick: (geo: GeographyProps) => void;
  onCountryHover: (name: string, isVisited: boolean) => void;
  onCountryLeave: () => void;
  highlightedCountryId: string | null;
  isMobile: boolean;
}) => (
  <Suspense fallback={<MapLoader />}>
    <ComposableMap
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147
      }}
      style={{ width: "100%", height: "100%" }}
      viewBox="0 0 800 500"
    >
      <defs>
        <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#030712" />
          <stop offset="100%" stopColor="#030712" />
        </linearGradient>
        <linearGradient id="visitedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="highlightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
        {!isMobile && (
          <>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="strongGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </>
        )}
      </defs>

      <rect x="0" y="0" width="800" height="500" fill="url(#oceanGradient)" />

      <Geographies geography={geoUrl}>
        {({ geographies }: GeographiesRenderProps) =>
          geographies.map((geo) => {
            const isVisited = visitedCountryCodes.has(geo.id);
            const isHighlighted = highlightedCountryId === geo.id;

            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => onCountryClick(geo)}
                onMouseEnter={() => onCountryHover(geo.properties.name, isVisited)}
                onMouseLeave={onCountryLeave}
                style={{
                  default: {
                    fill: isHighlighted
                      ? "url(#highlightGradient)"
                      : isVisited
                        ? "url(#visitedGradient)"
                        : "#1e293b",
                    stroke: isHighlighted
                      ? "#67e8f9"
                      : isVisited
                        ? "#0ea5e9"
                        : "#334155",
                    strokeWidth: isHighlighted ? 2 : isVisited ? 0.8 : 0.3,
                    outline: "none",
                    filter: isMobile ? "none" : isHighlighted ? "url(#strongGlow)" : isVisited ? "url(#glow)" : "none",
                    transition: isMobile ? "none" : "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  },
                  hover: {
                    fill: isHighlighted
                      ? "url(#highlightGradient)"
                      : isVisited
                        ? "url(#highlightGradient)"
                        : "#334155",
                    stroke: isVisited ? "#67e8f9" : "#475569",
                    strokeWidth: isVisited ? 1.5 : 0.5,
                    outline: "none",
                    cursor: isVisited ? "pointer" : "default",
                    filter: isMobile ? "none" : isVisited ? "url(#strongGlow)" : "none",
                  },
                  pressed: {
                    fill: isVisited ? "#22d3ee" : "#334155",
                    outline: "none",
                  },
                }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  </Suspense>
));

WorldMap.displayName = 'WorldMap';

const InteractiveTravelMap = () => {
  const isMobile = useIsMobile();
  const [hoveredCountry, setHoveredCountry] = useState<{ name: string; isVisited: boolean } | null>(null);
  const [highlightedCountryId, setHighlightedCountryId] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<VisitedCountry | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const visitedCountryCodes = useMemo(
    () => new Set(visitedCountries.map(c => c.id)),
    []
  );

  const regionStats = useMemo(() => {
    const stats: Record<string, number> = {};
    visitedCountries.forEach(c => {
      stats[c.region] = (stats[c.region] || 0) + 1;
    });
    return stats;
  }, []);

  const handleCountryClick = useCallback((geo: GeographyProps) => {
    const country = visitedCountries.find(c => c.id === geo.id);
    if (country) {
      setSelectedCountry(country);
      setHighlightedCountryId(country.id);
    }
  }, []);

  const handleCountryHover = useCallback((name: string, isVisited: boolean) => {
    setHoveredCountry({ name, isVisited });
  }, []);

  const handleCountryLeave = useCallback(() => {
    setHoveredCountry(null);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const closeModal = useCallback(() => {
    setSelectedCountry(null);
    setHighlightedCountryId(null);
  }, []);

  return (
    <div
      className={`min-h-screen bg-[#030712] text-white overflow-hidden transition-opacity duration-1000 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      onMouseMove={handleMouseMove}
    >
      {/* Ambient background - hidden on mobile for performance */}
      {!isMobile && (
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/3 rounded-full blur-[150px]"></div>
        </div>
      )}

      {/* Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="group flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300"
            >
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-black/30 backdrop-blur-xl border border-white/10 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10 transition-all duration-300">
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-300" />
                </div>
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-sm font-medium">Back</span>
                <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">Home</span>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              <Plane className="w-5 h-5 text-cyan-400" />
              <span className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Travel Map
              </span>
            </div>

            <div className="w-[88px] sm:w-[100px]"></div>
          </div>
        </div>
      </header>

      {/* Main map container */}
      <main className="relative h-screen w-full flex items-center justify-center" style={{ marginTop: "-40px" }}>
        <div className={`w-full h-full transition-all duration-1000 ${
          isLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}>
          <WorldMap
            visitedCountryCodes={visitedCountryCodes}
            onCountryClick={handleCountryClick}
            onCountryHover={handleCountryHover}
            onCountryLeave={handleCountryLeave}
            highlightedCountryId={highlightedCountryId}
            isMobile={isMobile}
          />
        </div>

        {/* Floating stats panel */}
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{ transitionDelay: '400ms' }}>
          <div className="flex items-center gap-1 p-1.5 bg-black/40 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl shadow-black/50">
            <div className="px-5 py-3 text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {visitedCountries.length}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mt-0.5">Countries</div>
            </div>
            <div className="w-px h-10 bg-white/10"></div>
            <div className="px-5 py-3 text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {Object.keys(regionStats).length}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mt-0.5">Regions</div>
            </div>
            <div className="w-px h-10 bg-white/10"></div>
            <div className="px-5 py-3 text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                {Math.round((visitedCountries.length / 195) * 100)}%
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mt-0.5">World</div>
            </div>
          </div>
        </div>

        {/* Hover tooltip */}
        {hoveredCountry && (
          <div
            className="fixed z-50 pointer-events-none transition-opacity duration-150"
            style={{
              left: mousePos.x + 16,
              top: mousePos.y + 16,
            }}
          >
            <div className={`px-4 py-2.5 rounded-xl backdrop-blur-xl border shadow-xl ${
              hoveredCountry.isVisited
                ? 'bg-cyan-500/20 border-cyan-500/30 shadow-cyan-500/20'
                : 'bg-gray-800/80 border-gray-700/50'
            }`}>
              <div className="flex items-center gap-2">
                {hoveredCountry.isVisited && (
                  <MapPin className="w-4 h-4 text-cyan-400" />
                )}
                <span className={`font-medium ${hoveredCountry.isVisited ? 'text-cyan-100' : 'text-gray-300'}`}>
                  {hoveredCountry.name}
                </span>
                {hoveredCountry.isVisited && (
                  <span className="text-xs text-cyan-400 ml-1">Visited</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Country detail modal */}
        {selectedCountry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={closeModal}
            ></div>
            <div className={`relative max-w-sm w-full transition-all duration-300 ${
              selectedCountry ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}>
              <div className="bg-gray-900/90 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="h-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{selectedCountry.name}</h3>
                      <p className="text-gray-400 text-sm mt-1">{selectedCountry.region}</p>
                    </div>
                    <button
                      onClick={closeModal}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-cyan-400">
                    <MapPin className="w-5 h-5" />
                    <span className="text-sm font-medium">Explored</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Region legend */}
        <div className={`absolute top-24 right-6 transition-all duration-700 hidden lg:block ${
          isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
        }`} style={{ transitionDelay: '600ms' }}>
          <div className="p-4 bg-black/30 backdrop-blur-xl rounded-2xl border border-white/5">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">By Region</div>
            <div className="space-y-2">
              {Object.entries(regionStats).sort((a, b) => b[1] - a[1]).map(([region, count]) => (
                <div key={region} className="flex items-center justify-between gap-4">
                  <span className="text-sm text-gray-400">{region}</span>
                  <span className="text-sm font-medium text-white">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

InteractiveTravelMap.displayName = 'InteractiveTravelMap';

export default InteractiveTravelMap;
