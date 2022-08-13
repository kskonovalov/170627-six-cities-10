import {useEffect, useState, MutableRefObject, useRef} from 'react';
import {Map, TileLayer, LayerGroup} from 'leaflet';

import {City} from '../types/types';
import {defaultZoom} from '../const';

type useMapType = [
  map: Map | null,
  layerGroup: LayerGroup | null
];

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: City
): useMapType {
  const [map, setMap] = useState<Map | null>(null);
  const [layerGroup, setLayerGroup] = useState<LayerGroup | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.lat,
          lng: city.lng
        },
        zoom: defaultZoom
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      );

      instance.addLayer(layer);

      const layerGroupObject = new LayerGroup();
      setLayerGroup(layerGroupObject);
      instance.addLayer(layerGroupObject);

      setMap(instance);
      isRenderedRef.current = true;
    } else {
      map?.setView({
        lat: city.lat,
        lng: city.lng
      });
    }
  }, [mapRef, city, map]);

  return [map, layerGroup];
}

export default useMap;
