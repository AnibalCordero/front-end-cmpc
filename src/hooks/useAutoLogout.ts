import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from '@/utils/isTokenExpired';

const AUTO_LOGOUT_MINUTES = 15;

export const useAutoLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'click', 'scroll'];
    const timeoutMs = AUTO_LOGOUT_MINUTES * 60 * 1000;

    let timeout: ReturnType<typeof setTimeout>;

    const logout = () => {
      localStorage.removeItem('token');
      navigate('/login');
    };

    const checkTokenAndReset = () => {
      const token = localStorage.getItem('token');
      if (!token || isTokenExpired(token)) {
        logout();
      } else {
        clearTimeout(timeout);
        timeout = setTimeout(logout, timeoutMs);
      }
    };

    events.forEach((event) => window.addEventListener(event, checkTokenAndReset));
    checkTokenAndReset();

    return () => {
      events.forEach((event) => window.removeEventListener(event, checkTokenAndReset));
      clearTimeout(timeout);
    };
  }, [navigate]);
};
