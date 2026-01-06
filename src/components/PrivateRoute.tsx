import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('token');

  // 如果沒有 Token，就導向登入頁面
  return token ? children : <Navigate to='/login' />;
};
export default PrivateRoute;
