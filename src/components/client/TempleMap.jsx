import { useEffect } from 'react';

const TempleMap = () => {
  useEffect(() => {
    const initMap = async () => {
      const { Map } = await google.maps.importLibrary('maps');
      const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');

      const map = new Map(document.getElementById('map'), {
        center: { lat: 22.75249230688784, lng: 73.15083361974744 },
        zoom: 13,
        mapId: '4504f8b37365c3d0',
      });

      const marker = new AdvancedMarkerElement({
        position: { lat: 22.75249230688784, lng: 73.15083361974744 },
        map: map,
        title: 'Shri Vishwakarma Mandir, Dakor',
      });

      const infoWindow = new google.maps.InfoWindow({
        content: '<div>Shri Vishwakarma Mandir, Dakor</div>',
      });

      marker.addListener('click', () => {
        window.open('https://www.google.com/maps/place/Shri+Vishwakarma+Mandir,+Dakor/@22.75249230688784,73.15083361974744', '_blank');
      });

      marker.addListener('mouseover', () => {
        infoWindow.open(map, marker);
      });

      marker.addListener('mouseout', () => {
        infoWindow.close();
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
