import { Marker, Popup, useMapEvents } from "react-leaflet";

export default function LocationMarker({
  pickup,
  setPickup,
  destination,
  setDestination,
}) {
  useMapEvents({
    click(e) {
      if (!pickup) {
        setPickup(e.latlng);
      } else if (!destination) {
        setDestination(e.latlng);
      }
    },
  });

  return (
    <>
      {pickup && (
        <Marker position={pickup}>
          <Popup>Pickup Location</Popup>
        </Marker>
      )}

      {destination && (
        <Marker position={destination}>
          <Popup>Destination</Popup>
        </Marker>
      )}
    </>
  );
}