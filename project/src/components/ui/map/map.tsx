import React, {useRef, useEffect} from 'react';
import {Icon, Marker} from 'leaflet';

import useMap from '../../../hooks/use-map';
import 'leaflet/dist/leaflet.css';
import {City, Points} from '../../../types/types';
import {defaultIcon, activeIcon} from '../../../const';

type MapProps = {
  city: City,
  points: Points,
  selectedPointID: number | null,
  containerClassName: string
};

function Map({containerClassName, city, points, selectedPointID}: MapProps) {
  const mapRef = useRef(null);
  const [map, layerGroup] = useMap(mapRef, city);

  useEffect(() => {
    if (map && layerGroup) {
      layerGroup.clearLayers();
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.lat,
          lng: point.lng
        });
        marker
          .setIcon(
            selectedPointID !== undefined && selectedPointID === point.id
              ? new Icon(activeIcon)
              : new Icon(defaultIcon)
          )
          .addTo(layerGroup);
      });
    }
  }, [map, points, selectedPointID, layerGroup]);

  return <section className={containerClassName} ref={mapRef}></section>;
}

export default Map;
