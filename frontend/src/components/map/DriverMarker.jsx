import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";

const carIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/744/744465.png",
  iconSize: [38, 38],
  iconAnchor: [19, 19],
});

export default function DriverMarker({
  pickup,
  destination,
  routeCoordinates,
  rideStatus,
  onDriverArrived,
  onRideCompleted,
}) {
  const [position, setPosition] = useState(null);

  // Driver -> Pickup
  useEffect(() => {
    if (rideStatus !== "driverAssigned" || !pickup) return;

    const start = {
      lat: pickup.lat + 0.01,
      lng: pickup.lng - 0.01,
    };

    setPosition(start);

    let currentLat = start.lat;
    let currentLng = start.lng;

    const interval = setInterval(() => {
      currentLat += (pickup.lat - currentLat) * 0.08;
      currentLng += (pickup.lng - currentLng) * 0.08;

      setPosition({
        lat: currentLat,
        lng: currentLng,
      });

      const remaining =
        Math.abs(currentLat - pickup.lat) +
        Math.abs(currentLng - pickup.lng);

      if (remaining < 0.0002) {
        clearInterval(interval);

        setPosition(pickup);

        onDriverArrived?.();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [pickup, rideStatus, onDriverArrived]);

  // Pickup -> Destination (follow road)
  useEffect(() => {
    if (
      rideStatus !== "rideStarted" ||
      !routeCoordinates ||
      routeCoordinates.length === 0
    ) {
      return;
    }

    let index = 0;

    const interval = setInterval(() => {
      if (index >= routeCoordinates.length) {
        clearInterval(interval);
        onRideCompleted?.();
        return;
      }

      setPosition(routeCoordinates[index]);
      index++;
    }, 30);

    return () => clearInterval(interval);
  }, [
    rideStatus,
    routeCoordinates,
    onRideCompleted,
  ]);

  if (!position) return null;

  let popupText = "🚗 Driver";

  if (rideStatus === "driverAssigned")
    popupText = "🚗 Driver is on the way";

  if (rideStatus === "driverArrived")
    popupText = "✅ Driver waiting at pickup";

  if (rideStatus === "rideStarted")
    popupText = "🚖 Ride in Progress";

  if (rideStatus === "rideCompleted")
    popupText = "🏁 Ride Completed";

  return (
    <Marker position={position} icon={carIcon}>
      <Popup>{popupText}</Popup>
    </Marker>
  );
}