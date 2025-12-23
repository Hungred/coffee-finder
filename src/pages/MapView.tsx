import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CAFE_DATA } from '../data/cafes.js';
import { MapPin, Star } from 'lucide-react';
import coffeeIcon from '../assets/coffee.svg';
import { useLocation, useNavigate } from 'react-router-dom';

const customIcon = new L.Icon({
  iconUrl: coffeeIcon,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const MapEffect: React.FC<{
  cafes: typeof CAFE_DATA;
  firstMarkerRef: React.RefObject<L.Marker | null>;
}> = ({ cafes, firstMarkerRef }) => {
  const map = useMap();

  useEffect(() => {
    if (cafes.length > 0) {
      const firstCafe = cafes[0];
      // 移動地圖
      map.setView(firstCafe && firstCafe.position, 15);

      // 打開第一個 Marker 的 Popup
      const timer = setTimeout(() => {
        if (firstMarkerRef.current) {
          firstMarkerRef.current.openPopup();
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [cafes, map, firstMarkerRef]);

  return null;
};

const MapView: React.FC = () => {
  const center: [number, number] = [25.033, 121.5654];
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCafes, setFilteredCafes] = useState(CAFE_DATA); // 搜尋結果

  const firstMarkerRef = useRef<L.Marker>(null);

  const location = useLocation();
  const navigate = useNavigate();

  // 1. 取得從 CityList 傳過來的 state
  const incomingCenter = location.state?.center as [number, number] | undefined;
  const cityName = (location.state?.cityName as string) || '';

  // 2. 初始中心點
  const initialCenter: [number, number] = incomingCenter || center;

  // 3. 當組件掛載時，如果有點選城市，執行一次過濾
  useEffect(() => {
    if (cityName) {
      handleSearch(cityName);
    } else {
      setFilteredCafes(CAFE_DATA);
    }
  }, [cityName]);

  const handleSearch = (filterString: string) => {
    setSearchQuery(filterString);

    const results = CAFE_DATA.filter(
      (cafe) =>
        cafe.name.toLowerCase().includes(filterString.toLowerCase()) ||
        cafe.city.toLowerCase().includes(filterString.toLowerCase()) ||
        cafe.tags.some((tag) =>
          tag.toLowerCase().includes(filterString.toLowerCase())
        )
    );

    setFilteredCafes(results);
  };

  return (
    <div className='h-screen w-full relative'>
      <MapContainer
        center={center}
        zoom={15}
        className='h-full w-full z-0'
        zoomControl={false}
      >
        <TileLayer
          url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
          attribution='© OpenStreetMap © CARTO'
          minZoom={5}
          maxZoom={20}
          updateWhenZooming={false}
          keepBuffer={2}
        />
        {filteredCafes.map((cafe, idx) => (
          <Marker
            key={cafe.id}
            position={cafe.position}
            icon={customIcon}
            ref={
              idx === 0
                ? (ref) => {
                    (firstMarkerRef as any).current = ref;
                  }
                : null
            }
          >
            <Popup className='custom-popup'>
              <div className='p-2 min-w-[150px]'>
                <img
                  src={cafe.image}
                  className='w-full h-20 object-cover rounded-md mb-2'
                  alt=''
                />
                <h4 className='font-bold text-coffee-dark text-sm'>
                  {cafe.name}
                </h4>
                <div className='flex flex-row flex-wrap gap-x-1 gap-y-1'>
                  {cafe.tags.map((tag) => (
                    <div className='flex items-center gap-1 text-[10px] text-coffee-green mt-1'>
                      <Star size={10} fill='currentColor' />
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        <MapEffect cafes={filteredCafes} firstMarkerRef={firstMarkerRef} />
      </MapContainer>
      <div className='absolute top-6 left-1/2 -translate-x-1/2 z-[1000] w-[90%]'>
        <div className='bg-white/90 backdrop-blur-md h-12 rounded-full shadow-lg flex items-center px-4 border border-white'>
          <MapPin size={18} className='text-coffee-green mr-2' />
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder='搜尋咖啡廳、地區或條件'
            className='flex-1 bg-transparent outline-none text-sm text-coffee-medium'
          />
        </div>
      </div>
      <style>
        {`
          .custom-popup .leaflet-popup-content {
            margin: 8px;
          }
        `}
      </style>
    </div>
  );
};

export default MapView;
