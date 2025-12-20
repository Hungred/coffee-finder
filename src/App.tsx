import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
// import MapView from './pages/MapView.js';
// import City from './pages/City.js';
// import Favorites from './pages/Favorites.js';
import BottomNav from './components/BottomNav.js';

const App: React.FC = () => {
  return (
    <Router>
      <div className='max-w-md mx-auto min-h-screen bg-coffee-bg-light shadow-2xl relative flex flex-col'>
        <main className='flex-1 overflow-y-auto'>
          <Routes>
            <Route path='/' element={<Home />} />
            {/* <Route path='/map' element={<MapView />} />
            <Route path='/city' element={<City />} />
            <Route path='/favorites' element={<Favorites />} /> */}
          </Routes>
        </main>

        {/* 底部導覽列：固定 */}
        <BottomNav />
      </div>
    </Router>
  );
};

export default App;
