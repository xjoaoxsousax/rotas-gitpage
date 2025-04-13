import React, { useState, useEffect } from 'react';
import { Search, Bus, Info, ArrowRight, Map as MapIcon } from 'lucide-react';
import { MapContainer, TileLayer, GeoJSON, useMap, LayersControl, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { toGPX } from '@tmcw/togpx';
import L from 'leaflet';

// Ícones personalizados para os marcadores
const startIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Ícone para o ponto inicial
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const endIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149060.png', // Ícone para o ponto final
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface RouteDetails {
  short_name: string;
  long_name: string;
  municipalities: string[];
  localities: string[];
  patterns: string[];
  routes: string[];
}

interface Pattern {
  id: string;
  headsign: string;
  long_name: string;
  shape_id: string;
  route_id: string;
}

interface Shape {
  geojson: any;
}

// Component to handle map bounds updates
function MapUpdater({ geojson }: { geojson: any }) {
  const map = useMap();

  useEffect(() => {
    if (geojson) {
      const layer = L.geoJSON(geojson);
      const bounds = layer.getBounds();
      map.fitBounds(bounds);
    }
  }, [geojson, map]);

  return null;
}

function geojsonToGpx(geojson: any): string {
  if (!geojson || geojson.type !== "FeatureCollection") {
    throw new Error("GeoJSON inválido. Certifique-se de que é um FeatureCollection.");
  }

  const gpxHeader = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="CustomConverter" xmlns="http://www.topografix.com/GPX/1/1">
`;
  const gpxFooter = `</gpx>`;

  const gpxBody = geojson.features
    .map((feature: any) => {
      if (feature.geometry.type === "LineString") {
        const coordinates = feature.geometry.coordinates
          .map((coord: number[]) => `<trkpt lon="${coord[0]}" lat="${coord[1]}"></trkpt>`)
          .join("\n");
        return `<trk><name>${feature.properties?.name || "Rota"}</name><trkseg>${coordinates}</trkseg></trk>`;
      }
      return "";
    })
    .join("\n");

  return gpxHeader + gpxBody + gpxFooter;
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Seu código do componente App */}
      </div>
    </div>
  );
}

export default App;