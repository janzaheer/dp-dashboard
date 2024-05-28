
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute() {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const user = useSelector(state => state.user.user);

  return isAuthenticated && user?.is_seller ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
