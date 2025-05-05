import { useMemo } from "react";
//import Image from "next/image";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const MapComponent = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API || "",
  });
  //   console.log(process.env.NEXT_PUBLIC_GOOGLE_API)
  if (!isLoaded) return <div>Loading...</div>;

  return <Map latitude={latitude} longitude={longitude} />;
};

const Map = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  const center = { lat: latitude, lng: longitude };

  return (
    <div className="w-full h-full border-[1px] border-black">
      <GoogleMap
        zoom={15}
        center={center}
        mapContainerClassName="map-container"
        options={{
            mapTypeControl: false, 
            clickableIcons: false,
            // disableDefaultUI: false,
            streetViewControl: false,
            fullscreenControl: false
        }}
      >
        <Marker
          position={center}
          icon={{
            url: "/gympages-icons/Google_Maps_pin.svg",
            scaledSize: new google.maps.Size(60, 60),
          }}
        />
      </GoogleMap>
    </div>
  );
};

export default MapComponent;