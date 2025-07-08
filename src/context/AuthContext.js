import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
    const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('isLoggedIn');
    if (stored === 'true') setIsLoggedIn(true);
  }, []);

  const login = (username, password) => {
    if (username === 'admin' && password === 'admin@123') {
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
     router.replace('/');
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);