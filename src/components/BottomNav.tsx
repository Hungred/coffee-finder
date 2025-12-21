import { NavLink } from 'react-router-dom';
import { Home, Map, Building2, Heart } from 'lucide-react';

const BottomNav: React.FC = () => {
  const links = [
    { to: '/', icon: Home, label: '首頁' },
    { to: '/map', icon: Map, label: '地圖' },
    { to: '/city', icon: Building2, label: '城市' },
    { to: '/favorites', icon: Heart, label: '收藏' },
  ];

  return (
    <nav className='w-full bg-white/70 backdrop-blur-xl border-t border-gray-100 flex justify-around items-center py-4 px-2 pb-2 z-50'>
      {links.map(({ to, icon: Icon, label }) => (
        <NavLink key={to} to={to}>
          {({ isActive }) => (
            <div
              className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                isActive
                  ? 'text-coffee-green scale-110 font-bold'
                  : 'text-gray-400 hover:text-coffee-dark'
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className='text-[10px]'>{label}</span>
            </div>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
