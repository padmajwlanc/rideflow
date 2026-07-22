import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

export default function RouteMachine({
  pickup,
  destination,
  setDistance,
  setDuration,
  setRouteCoordinates,
}) {
  const map = useMap();

  useEffect(() => {
    if (!pickup || !destination) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(pickup.lat, pickup.lng),
        L.latLng(destination.lat, destination.lng),
      ],

      lineOptions: {
        styles: [
          {
            color: "#7c3aed",
            weight: 6,
            opacity: 0.8,
          },
        ],
      },

      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,

      show: false,
      collapsible: true,

      createMarker: () => null,
    }).addTo(map);

    routingControl.on("routesfound", (e) => {
      const route = e.routes[0];

      // Distance
      const distanceKm = Number(
        (route.summary.totalDistance / 1000).toFixed(2)
      );

      // Duration
      const durationMin = Math.round(
        route.summary.totalTime / 60
      );

      setDistance(distanceKm);
      setDuration(durationMin);

      // ⭐ Save every point of the road
      setRouteCoordinates(route.coordinates);
    });

    return () => {
      map.removeControl(routingControl);
    };
  }, [
    map,
    pickup,
    destination,
    setDistance,
    setDuration,
    setRouteCoordinates,
  ]);

  return null;
}