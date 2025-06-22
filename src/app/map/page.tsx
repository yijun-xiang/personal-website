'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Globe, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface VisitedCountry {
  id: string;
  name: string;
}

const visitedCountries: VisitedCountry[] = [
  { id: "GBR", name: "United Kingdom" },
  { id: "ISL", name: "Iceland" },
  { id: "FRA", name: "France" },
  { id: "CHE", name: "Switzerland" },
  { id: "JPN", name: "Japan" },
  { id: "KOR", name: "South Korea" },
  { id: "CHN", name: "China" },
  { id: "IRL", name: "Ireland" },
  { id: "MCO", name: "Monaco" },
  { id: "BEL", name: "Belgium" },
  { id: "NLD", name: "Netherlands" },
  { id: "ITA", name: "Italy" },
  { id: "VAT", name: "Vatican City" },
  { id: "GRC", name: "Greece" },
  { id: "DEU", name: "Germany" },
  { id: "ESP", name: "Spain" },
  { id: "PRT", name: "Portugal" },
  { id: "SGP", name: "Singapore" },
  { id: "ARE", name: "United Arab Emirates" },
  { id: "CAN", name: "Canada" },
  { id: "KWT", name: "Kuwait" },
  { id: "SAU", name: "Saudi Arabia" },
  { id: "USA", name: "United States" },
];

const visitedCountryCodes = new Set(visitedCountries.map(c => c.id));

const InteractiveTravelMap = () => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [position, setPosition] = useState({ coordinates: [0, 0] as [number, number], zoom: 1 });

  function handleZoomIn() {
    if (position.zoom >= 4) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.5 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.5 }));
  }

  function handleReset() {
    setPosition({ coordinates: [0, 0], zoom: 1 });
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700/50 p-4 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Portfolio</span>
          </Link>
          <h1 className="text-xl font-semibold">My Travel Footprint</h1>
        </div>
      </header>

      <main className="flex-grow grid grid-cols-1 lg:grid-cols-4">
        <div className="lg:col-span-3 relative bg-gray-800">
           <ComposableMap
              projectionConfig={{
                rotate: [-10, 0, 0],
                scale: 147
              }}
              style={{ width: "100%", height: "100%" }}
            >
              <ZoomableGroup
                zoom={position.zoom}
                center={position.coordinates}
                onMoveEnd={(pos) => setPosition(pos)}
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const isVisited = visitedCountryCodes.has(geo.id);
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onMouseEnter={() => setTooltipContent(geo.properties.name)}
                          onMouseLeave={() => setTooltipContent("")}
                          style={{
                            default: {
                              fill: isVisited ? "#3b82f6" : "#272e42",
                              stroke: "#1f2937",
                              strokeWidth: 0.5,
                              outline: "none",
                            },
                            hover: {
                              fill: isVisited ? "#60a5fa" : "#4b5563",
                              outline: "none",
                              cursor: "pointer"
                            },
                            pressed: {
                              fill: "#1d4ed8",
                              outline: "none",
                            },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
            <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
                <button onClick={handleZoomIn} className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"><ZoomIn className="w-5 h-5"/></button>
                <button onClick={handleZoomOut} className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"><ZoomOut className="w-5 h-5"/></button>
                <button onClick={handleReset} className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"><RotateCcw className="w-5 h-5"/></button>
            </div>
            {tooltipContent && (
                <div className="absolute bottom-4 left-4 bg-gray-900/80 text-white text-sm px-3 py-1 rounded-md">
                    {tooltipContent}
                </div>
            )}
        </div>

        <div className="lg:col-span-1 bg-gray-800/50 border-l border-gray-700/50 p-6 overflow-y-auto">
          <div className="sticky top-20">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Globe className="w-6 h-6 mr-2 text-blue-400"/>
              Visited Countries
            </h2>
            <p className="text-gray-400 mb-6">
              I&apos;ve had the privilege of exploring {visitedCountries.length} countries and regions, each offering unique perspectives on technology, culture, and life.
            </p>
            <div className="space-y-2">
              {visitedCountries
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(country => (
                  <div key={country.id} className="flex items-center bg-gray-700/50 p-3 rounded-lg">
                    <MapPin className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0"/>
                    <span className="font-medium">{country.name}</span>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InteractiveTravelMap;