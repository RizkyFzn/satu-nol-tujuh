import React, { useState } from 'react';
import { GoogleMap, MarkerF, PolygonF, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '500px',
  height: '500px',
};

const options = {
  fillColor: 'yellow',
  fillOpacity: 0.3,
  strokeColor: 'blue',
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: true,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 1,
};

const options2 = {
  fillColor: 'lightblue',
  fillOpacity: 0.6,
  strokeColor: 'red',
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: true,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 1,
};

function Location(props) {
  const center = {
    lat: props.lat,
    lng: props.lng,
  };
  const { coor } = props;
  const [buttonColors, setButtonColors] = useState(Array(coor.length).fill(false));

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
  });

  const handleButtonClick = (index) => {
    const newButtonColors = [...buttonColors];
    newButtonColors[index] = buttonColors[index] === false ? true : false;
    setButtonColors(newButtonColors);
  };

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
      {coor.map((coordinates, index) => {
        return <PolygonF key={index} paths={coordinates} options={buttonColors[index] ? options2 : options} onClick={() => handleButtonClick(index)}></PolygonF>;
      })}
      <MarkerF position={center}></MarkerF>
    </GoogleMap>
  ) : (
    <p>Loading...</p>
  );
}

export default React.memo(Location);
