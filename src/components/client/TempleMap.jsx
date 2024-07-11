import { useEffect } from 'react';
import { logo } from "../../assets";

const TempleMap = () => {
  useEffect(() => {
    const initMap = async () => {
      const { Map } = await google.maps.importLibrary('maps');
      const { Marker } = await google.maps.importLibrary('marker');
      const { Place } = await google.maps.importLibrary('places');

      const map = new Map(document.getElementById('map'), {
        center: { lat: 22.75249230688784, lng: 73.15083361974744 },
        zoom: 13,
        mapId: '4504f8b37365c3d0',
      });

      // Creating a standard marker
      const marker = new Marker({
        position: { lat: 22.75249230688784, lng: 73.15083361974744 },
        map: map,
        title: 'Shri Vishwakarma Mandir Trust, Dakor',
      });
    };

    initMap();
  }, []);

  return (
    <>
      <div id="map" className="h-[474px] rounded-md overflow-hidden shadow-md transition duration-700 ease-in-out hover:shadow-2xl"></div>
    </>
  );
};

export default TempleMap;
