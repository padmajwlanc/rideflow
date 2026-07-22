import { MapContainer, TileLayer } from "react-leaflet";

import LocationMarker from "./LocationMarker";
import RouteMachine from "./RouteMachine";
import DriverMarker from "./DriverMarker";

export default function RideMap({
  pickup,
  setPickup,
  destination,
  setDestination,
  setDistance,
  setDuration,
  setRouteCoordinates,
  routeCoordinates,
  driver,
  rideStatus,
  onDriverArrived,
  onRideCompleted,
}) {
  const center = [19.076, 72.8777]; // Mumbai

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-4 text-xl font-semibold text-white">
        Ride Map
      </h2>

      <div className="overflow-hidden rounded-xl">
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom
          className="h-[500px] w-full"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <LocationMarker
            pickup={pickup}
            setPickup={setPickup}
            destination={destination}
            setDestination={setDestination}
          />

          <RouteMachine
            pickup={pickup}
            destination={destination}
            setDistance={setDistance}
            setDuration={setDuration}
            setRouteCoordinates={setRouteCoordinates}
          />

          {driver && pickup && (
            <DriverMarker
              pickup={pickup}
              destination={destination}
              routeCoordinates={routeCoordinates}
              rideStatus={rideStatus}
              onDriverArrived={onDriverArrived}
              onRideCompleted={onRideCompleted}
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
}