import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Circle, LayersControl, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const DEFAULT_CENTER = [35.19, -80.84]; // Charlotte, NC

function carIcon(heading) {
  const h = typeof heading === 'number' && heading >= 0 ? heading : 0;
  return L.divIcon({
    className: '',
    html: `<div class="tlm-car-marker" style="transform: rotate(${h}deg)"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
}

function flagIcon() {
  return L.divIcon({
    className: '',
    html: '<div style="font-size:22px;line-height:1;filter:drop-shadow(0 1px 2px #000)">🏁</div>',
    iconSize: [24, 24],
    iconAnchor: [4, 22],
  });
}

function Follow({ pos, enabled }) {
  const map = useMap();
  useEffect(() => {
    if (enabled && pos) map.panTo(pos, { animate: true, duration: 0.5 });
  }, [pos, enabled, map]);
  return null;
}

function ClickCapture({ active, onPick }) {
  useMapEvents({
    click(e) {
      if (active) onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function LiveMap({ carPos, trail = [], start, radius = 15, follow = true, settingMarker = false, onSetStart }) {
  const center = carPos ? [carPos.lat, carPos.lon] : (start ? [start.lat, start.lon] : DEFAULT_CENTER);
  const carLatLng = carPos ? [carPos.lat, carPos.lon] : null;
  const startLatLng = start && start.lat != null ? [start.lat, start.lon] : null;
  const trailLine = useMemo(() => trail.filter((p) => Array.isArray(p) && p.length === 2), [trail]);
  const icon = useMemo(() => carIcon(carPos?.heading), [carPos?.heading]);

  return (
    <div className="tlm-map" style={{ position: 'relative', cursor: settingMarker ? 'crosshair' : undefined }}>
      <MapContainer center={center} zoom={16} scrollWheelZoom zoomControl>
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Satellite">
            <TileLayer
              attribution="Tiles &copy; Esri"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              maxZoom={19}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Streets">
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={19}
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {trailLine.length > 1 && (
          <Polyline positions={trailLine} pathOptions={{ color: '#e31b23', weight: 3, opacity: 0.85 }} />
        )}

        {startLatLng && (
          <>
            <Circle center={startLatLng} radius={radius} pathOptions={{ color: '#00e676', fillColor: '#00e676', fillOpacity: 0.12, weight: 2 }} />
            <Marker position={startLatLng} icon={flagIcon()} />
          </>
        )}

        {carLatLng && <Marker position={carLatLng} icon={icon} />}

        <Follow pos={carLatLng} enabled={follow && !settingMarker} />
        <ClickCapture active={settingMarker} onPick={onSetStart} />
      </MapContainer>

      {settingMarker && <div className="tlm-map-hint">Click the map to place the start/finish line</div>}
    </div>
  );
}
