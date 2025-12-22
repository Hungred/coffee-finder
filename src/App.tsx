import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import MapView from './pages/MapView.js';
import City from './pages/City.js';
import CityList from './pages/CityList.js';
import Favorites from './pages/Favorites.js';
import BottomNav from './components/BottomNav.js';
import { FavoriteProvider } from './context/FavoriteContext.js';

const App: React.FC = () => {
  return (
    <FavoriteProvider>
      <Router>
        <div className='max-w-md mx-auto h-[100dvh] flex flex-col bg-coffee-bg-light shadow-2xl relative overflow-hidden'>
          <main className='flex-1 relative min-h-0'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/map' element={<MapView />} />
              <Route path='/city' element={<City />} />
              <Route path='/city/:cityId' element={<CityList />} />
              <Route path='/favorites' element={<Favorites />} />
            </Routes>
          </main>

          {/* 底部導覽列：固定 */}
          <footer className='flex-none border-t border-gray-100 bg-white'>
            <BottomNav />
          </footer>
        </div>
      </Router>
    </FavoriteProvider>
  );
};

export default App;
