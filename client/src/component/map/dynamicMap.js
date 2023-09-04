import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import ambulanceMarkerIcon from "./picture/ambulanceIcon.jpeg";

function DynamicMap(props) {
  const locations = [
    {
      lat: 12.9802347063322,
      lng: 77.5907760360903,
      bearing: -20.5784744283754,
    },
    {
      lat: 12.9795865148043,
      lng: 77.5911622741734,
      bearing: 70.6690312217414,
    },
    {
      lat: 12.9797746996155,
      lng: 77.5916987159555,
      bearing: 38.1233134168197,
    },
    {
      lat: 12.9801301594259,
      lng: 77.5919776656823,
      bearing: -45.7414247345699,
    },
    {
      lat: 12.9798374278543,
      lng: 77.5922780730802,
      bearing: 16.0994201411847,
    },
    {
      lat: 12.9791683258247,
      lng: 77.5920849540387,
      bearing: 35.6916527554558,
    },
    {
      lat: 12.9787501361417,
      lng: 77.5917845466407,
      bearing: 58.0502467067782,
    },
    {
      lat: 12.9784155838887,
      lng: 77.5912481048586,
      bearing: 64.0233912454979,
    },
    {
      lat: 12.9784783124705,
      lng: 77.5913768508863,
      bearing: 45.7412428776673,
    },
    {
      lat: 12.9783319457552,
      lng: 77.5912266471873,
      bearing: -69.926654677622,
    },
    {
      lat: 12.978394674358,
      lng: 77.591054985817,
      bearing: 16.3413468751341,
    },
    {
      lat: 12.9779555738058,
      lng: 77.5909262397893,
      bearing: 54.6749460887583,
    },
    {
      lat: 12.9776210204837,
      lng: 77.5904541710211,
      bearing: 64.0233096712307,
    },
    {
      lat: 12.9774746532636,
      lng: 77.5901537636231,
      bearing: 65.5464053454266,
    },
    {
      lat: 12.9761573444059,
      lng: 77.5872569779997,
      bearing: -66.4029340594377,
    },
    {
      lat: 12.9764291706147,
      lng: 77.5866347055324,
      bearing: -48.4630801907934,
    },
    {
      lat: 12.9766382674962,
      lng: 77.5863986711483,
      bearing: -54.992843944921,
    },
    {
      lat: 12.9771191896563,
      lng: 77.5857120256672,
      bearing: -60.0659370316888,
    },
  ];
  return (
    <div>
      {/* Render the Google Map */}
      <Map
        google={props.google}
        zoom={14}
        initialCenter={{ lat: 6.9271, lng: 79.8612 }} // Update with Sri Lanka coordinates
      >
        {/* Map each location to a Marker */}
        {locations.map((location, index) => (
          //   <TraverseLocation location={location} index={index} />
          <Marker
            key={index}
            position={{ lat: location.lat, lng: location.lng }}
            icon={{
              url: ambulanceMarkerIcon, // Path to your ambulance marker icon
              scaledSize: new window.google.maps.Size(40, 40), // Adjust the size as needed
            }}
          />
        ))}
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAl5YvfOlFxEH09-MkWNh9OhYoQdN3uJOs", // Replace with your API key
})(DynamicMap);
