"use client";

import { useEffect, useState } from "react";
import Map from "react-map-gl";

export function HoodMap() {
  const [latitude, setLatitude] = useState(-8.635769422572857);
  const [longitude, setLongitude] = useState(115.13914782040987);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log("Latitude: " + position.coords.latitude);
        console.log("Longitude: " + position.coords.longitude);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);
  return (
    <div className="w-[100vw] h-[100vh]">
      <Map
        reuseMaps={true}
        style={{ width: "100%", height: "100%" }}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        initialViewState={{
          latitude: latitude,
          longitude: longitude,
          zoom: 15,
        }}
        maxZoom={20}
        minZoom={3}
      />
    </div>
  );
}
