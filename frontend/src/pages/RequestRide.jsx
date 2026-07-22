import { useState } from "react";

import LocationInput from "../components/ui/LocationInput";
import RideMap from "../components/map/RideMap";
import VehicleSelector from "../components/ui/VehicleSelector";
import RideSummary from "../components/ui/RideSummary";

const drivers = [
  {
    name: "Rahul Sharma",
    rating: 4.9,
    car: "Hyundai i20",
    plate: "MH12 AB 4321",
    eta: "4 mins",
  },
  {
    name: "Priya Singh",
    rating: 4.8,
    car: "Maruti Baleno",
    plate: "DL8C XY 9281",
    eta: "3 mins",
  },
  {
    name: "Amit Verma",
    rating: 5.0,
    car: "Honda City",
    plate: "KA03 MN 5124",
    eta: "5 mins",
  },
  {
    name: "Sneha Patel",
    rating: 4.7,
    car: "Hyundai Verna",
    plate: "GJ01 KL 7712",
    eta: "2 mins",
  },
];

export default function RequestRide() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const [pickup, setPickup] = useState(null);
  const [destination, setDestination] = useState(null);

  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);

  const [routeCoordinates, setRouteCoordinates] = useState([]);

  // Driver information
  const [driver, setDriver] = useState(null);

  // Ride lifecycle
  const [rideStatus, setRideStatus] = useState("idle");
  // idle
  // searching
  // driverAssigned
  // driverArrived
  // rideStarted
  // rideCompleted

  const handleBookRide = () => {
    if (rideStatus !== "idle") return;

    setRideStatus("searching");

    setTimeout(() => {
      const randomDriver =
        drivers[Math.floor(Math.random() * drivers.length)];

      setDriver(randomDriver);
      setRideStatus("driverAssigned");
    }, 3000);
  };

  const handleDriverArrived = () => {
    setRideStatus("driverArrived");
  };

  const handleStartRide = () => {
    setRideStatus("rideStarted");
  };

  const handleRideCompleted = () => {
    setRideStatus("rideCompleted");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Request Ride
        </h1>

        <p className="mt-2 text-zinc-400">
          Book a ride anywhere in the city.
        </p>
      </div>

      <LocationInput />

      <RideMap
        pickup={pickup}
        setPickup={setPickup}
        destination={destination}
        setDestination={setDestination}
        setDistance={setDistance}
        setDuration={setDuration}
        setRouteCoordinates={setRouteCoordinates}
        routeCoordinates={routeCoordinates}
        driver={driver}
        rideStatus={rideStatus}
        onDriverArrived={handleDriverArrived}
        onRideCompleted={handleRideCompleted}
      />

      <VehicleSelector
        selectedVehicle={selectedVehicle}
        setSelectedVehicle={setSelectedVehicle}
        distance={distance}
      />

      <RideSummary
        selectedVehicle={selectedVehicle}
        distance={distance}
        duration={duration}
        driver={driver}
        rideStatus={rideStatus}
        handleBookRide={handleBookRide}
        handleStartRide={handleStartRide}
      />
    </div>
  );
}