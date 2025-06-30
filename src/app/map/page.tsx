'use client';
import React, { useState, useMemo, useCallback, lazy, Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Globe, ChevronDown, ChevronUp } from 'lucide-react';

const ComposableMap = lazy(() => import('react-simple-maps').then(module => ({ default: module.ComposableMap })));
const Geographies = lazy(() => import('react-simple-maps').then(module => ({ default: module.Geographies })));
const Geography = lazy(() => import('react-simple-maps').then(module => ({ default: module.Geography })));

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface VisitedCountry {
  id: string;
  name: string;
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
  { id: "826", name: "United Kingdom" },
  { id: "352", name: "Iceland" },
  { id: "250", name: "France" },
  { id: "756", name: "Switzerland" },
  { id: "392", name: "Japan" },
  { id: "410", name: "South Korea" },
  { id: "156", name: "China" },
  { id: "372", name: "Ireland" },
  { id: "492", name: "Monaco" },
  { id: "056", name: "Belgium" },
  { id: "528", name: "Netherlands" },
  { id: "380", name: "Italy" },
  { id: "336", name: "Vatican City" },
  { id: "300", name: "Greece" },
  { id: "276", name: "Germany" },
  { id: "724", name: "Spain" },
  { id: "620", name: "Portugal" },
  { id: "702", name: "Singapore" },
  { id: "784", name: "United Arab Emirates" },
  { id: "124", name: "Canada" },
  { id: "414", name: "Kuwait" },
  { id: "682", name: "Saudi Arabia" },
  { id: "840", name: "United States" },
];

const MapLoader = () => (
  <div className="w-full h-full flex items-center justify-center bg-gray-800/30">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
      <p className="text-gray-400">Loading world map...</p>
    </div>
  </div>
);

const WorldMap = React.memo(({ 
  visitedCountryCodes, 
  onCountryClick, 
  onCountryHover, 
  onCountryLeave,
  highlightedCountryId 
}: {
  visitedCountryCodes: Set<string>;
  onCountryClick: (geo: GeographyProps) => void;
  onCountryHover: (name: string) => void;
  onCountryLeave: () => void;
  highlightedCountryId: string | null;
}) => (
  <Suspense fallback={<MapLoader />}>
    <ComposableMap
      projectionConfig={{
        rotate: [0, 0, 0],
        scale: 160
      }}
      style={{ width: "100%", height: "100%" }}
      viewBox="0 0 800 400"
    >
      <defs>
        <linearGradient id="visitedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>
        <linearGradient id="visitedGradientHover" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
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
                onMouseEnter={() => onCountryHover(geo.properties.name)}
                onMouseLeave={onCountryLeave}
                style={{
                  default: {
                    fill: isHighlighted ? "#60a5fa" : (isVisited ? "#3b82f6" : "#1e293b"),
                    stroke: isHighlighted ? "#93c5fd" : (isVisited ? "#60a5fa" : "#334155"),
                    strokeWidth: isHighlighted ? 2 : (isVisited ? 1.5 : 0.5),
                    outline: "none",
                    filter: (isVisited || isHighlighted) ? "url(#glow)" : "none",
                    transition: "all 0.3s ease",
                  },
                  hover: {
                    fill: isHighlighted ? "#93c5fd" : (isVisited ? "#60a5fa" : "#374151"),
                    stroke: isHighlighted ? "#bfdbfe" : (isVisited ? "#93c5fd" : "#4b5563"),
                    strokeWidth: isHighlighted ? 2.5 : (isVisited ? 2 : 0.75),
                    outline: "none",
                    cursor: isVisited ? "pointer" : "default",
                    filter: (isVisited || isHighlighted) ? "url(#glow)" : "none",
                  },
                  pressed: {
                    fill: isHighlighted ? "#2563eb" : (isVisited ? "#1d4ed8" : "#374151"),
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

const VirtualizedCountryList = React.memo(({ 
  countries, 
  selectedCountry, 
  onCountrySelect,
  highlightedCountryId 
}: {
  countries: VisitedCountry[];
  selectedCountry: VisitedCountry | null;
  onCountrySelect: (country: VisitedCountry) => void;
  highlightedCountryId: string | null;
}) => {
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 10 });
  
  const visibleCountries = useMemo(() => 
    countries.slice(visibleRange.start, visibleRange.end),
    [countries, visibleRange]
  );

  const loadMore = useCallback(() => {
    setVisibleRange(prev => ({
      start: prev.start,
      end: Math.min(prev.end + 10, countries.length)
    }));
  }, [countries.length]);

  return (
    <div className="space-y-3">
      {visibleCountries.map(country => (
        <div 
          key={country.id} 
          className={`group relative bg-gradient-to-r from-gray-800/50 to-gray-700/30 hover:from-blue-900/50 hover:to-purple-900/30 p-3 sm:p-4 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] ${
            selectedCountry?.id === country.id ? 'ring-2 ring-blue-500/50 bg-gradient-to-r from-blue-900/50 to-purple-900/30' : ''
          } ${
            highlightedCountryId === country.id ? 'bg-gradient-to-r from-blue-600/30 to-blue-700/20 border-blue-400/70 shadow-lg shadow-blue-500/30' : ''
          }`}
          onClick={() => onCountrySelect(country)}
        >
          <div className="flex items-center">
            <MapPin className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0 transition-colors ${
              highlightedCountryId === country.id ? 'text-blue-300' : 'text-blue-400'
            }`}/>
            <span className={`font-semibold text-white group-hover:text-blue-300 transition-colors text-sm sm:text-base ${
              highlightedCountryId === country.id ? 'text-blue-200' : ''
            }`}>
              {country.name}
            </span>
          </div>
        </div>
      ))}
      
      {visibleRange.end < countries.length && (
        <button
          onClick={loadMore}
          className="w-full py-3 text-sm text-gray-400 hover:text-white transition-colors"
        >
          Load more countries...
        </button>
      )}
    </div>
  );
});

VirtualizedCountryList.displayName = 'VirtualizedCountryList';

const InteractiveTravelMap = () => {
  const [selectedCountry, setSelectedCountry] = useState<VisitedCountry | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [highlightedCountryId, setHighlightedCountryId] = useState<string | null>(null);

  const visitedCountryCodes = useMemo(
    () => new Set(visitedCountries.map(c => c.id)), 
    []
  );

  const sortedCountries = useMemo(
    () => visitedCountries.sort((a, b) => a.name.localeCompare(b.name)),
    []
  );

  const continentCount = useMemo(() => {
    return 6;
  }, []);

  const handleCountryClick = useCallback((geo: GeographyProps) => {
    const country = visitedCountries.find(c => c.id === geo.id);
    if (country) {
      setSelectedCountry(country);
      if (highlightedCountryId === country.id) {
        setHighlightedCountryId(null);
      } else {
        setHighlightedCountryId(country.id);
      }
      if (window.innerWidth < 1024) {
        setIsMobileMenuOpen(true);
      }
    }
  }, [highlightedCountryId]);

  const handleCountryHover = useCallback((name: string) => {
    setHoveredCountry(name);
  }, []);

  const handleCountryLeave = useCallback(() => {
    setHoveredCountry("");
  }, []);

  const handleCountrySelect = useCallback((country: VisitedCountry) => {
    setSelectedCountry(country);
    if (highlightedCountryId === country.id) {
      setHighlightedCountryId(null);
    } else {
      setHighlightedCountryId(country.id);
    }
  }, [highlightedCountryId]);

  const isCountryVisited = useCallback((countryName: string) => {
    return visitedCountries.some(country => 
      country.name.toLowerCase() === countryName.toLowerCase()
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <header className="relative z-20 bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="group flex items-center space-x-2 sm:space-x-3 text-gray-300 hover:text-white transition-all duration-300">
              <div className="p-1.5 sm:p-2 rounded-lg bg-gray-800/50 group-hover:bg-blue-500/20 transition-all duration-300">
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="font-medium text-sm sm:text-base">Back</span>
            </Link>
            
            <div className="text-center flex-1 mx-4">
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
                My Travel Footprint
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 hidden sm:block">
                Exploring {visitedCountries.length} countries across the globe
              </p>
            </div>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-gray-800/50 hover:bg-blue-500/20 transition-all duration-300"
            >
              {isMobileMenuOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            
            <div className="hidden lg:block w-20" aria-hidden="true"></div>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96' : 'max-h-0'
        }`}>
          <div className="bg-gray-900/90 backdrop-blur-xl border-b border-gray-700/30 p-4 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold flex items-center">
                <Globe className="w-5 h-5 mr-2 text-blue-400"/>
                Visited Countries ({visitedCountries.length})
              </h3>
              <span className="text-xs text-gray-400">Tap to highlight</span>
            </div>
            <VirtualizedCountryList
              countries={sortedCountries}
              selectedCountry={selectedCountry}
              onCountrySelect={handleCountrySelect}
              highlightedCountryId={highlightedCountryId}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 h-[calc(100vh-100px)]">
          <div className="lg:col-span-3 relative bg-gradient-to-br from-gray-800/30 to-gray-900/50 backdrop-blur-sm">
            <WorldMap
              visitedCountryCodes={visitedCountryCodes}
              onCountryClick={handleCountryClick}
              onCountryHover={handleCountryHover}
              onCountryLeave={handleCountryLeave}
              highlightedCountryId={highlightedCountryId}
            />
            
            {hoveredCountry && (
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-gray-900/90 backdrop-blur-lg text-white text-sm px-3 sm:px-4 py-2 rounded-xl border border-gray-700/50 shadow-2xl">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${isCountryVisited(hoveredCountry) ? 'bg-blue-400' : 'bg-gray-500'}`}></div>
                  <span className="font-medium truncate">{hoveredCountry}</span>
                  {isCountryVisited(hoveredCountry) && <span className="text-blue-300 text-xs">✓ Visited</span>}
                </div>
              </div>
            )}

            <div className="absolute top-4 right-4">
              <div className="bg-gray-900/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-700/30 shadow-2xl">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold text-blue-400">{visitedCountries.length}</div>
                    <div className="text-xs text-gray-400">Countries</div>
                  </div>
                  <div className="w-px h-6 sm:h-8 bg-gray-700"></div>
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold text-purple-400">{continentCount}</div>
                    <div className="text-xs text-gray-400">Continents</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-1 bg-gray-900/60 backdrop-blur-xl border-l border-gray-700/30 overflow-y-auto">
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-2 flex items-center">
                  <Globe className="w-6 h-6 mr-3 text-blue-400"/>
                  Visited Countries
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Each destination has shaped my perspective on technology, culture, and innovation.
                  Click any country name to highlight it on the map.
                </p>
              </div>
              
              <VirtualizedCountryList
                countries={sortedCountries}
                selectedCountry={selectedCountry}
                onCountrySelect={handleCountrySelect}
                highlightedCountryId={highlightedCountryId}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

InteractiveTravelMap.displayName = 'InteractiveTravelMap';

export default InteractiveTravelMap;