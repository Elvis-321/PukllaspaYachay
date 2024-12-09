// src/context/AuthContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';

// Creamos el contexto
const AuthContext = createContext();

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  // Recuperamos el valor de isAuthenticated desde localStorage si existe, sino usamos false
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    return savedAuth === 'true'; // Si es 'true', el usuario está autenticado
  });

  const [userId, setUserId] = useState(() => {
    const savedUserId = localStorage.getItem('userId');
    return savedUserId ? savedUserId : null; // Si no hay userId, inicializamos en null
  });

  // Cuando el estado de isAuthenticated cambie, lo guardamos en localStorage
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }, [isAuthenticated]); // Se ejecuta cada vez que isAuthenticated cambia

  const login = (id_usuario) => {
    setIsAuthenticated(true);
    setUserId(id_usuario);
    localStorage.setItem('isAuthenticated', 'true'); // Guarda el valor en localStorage
    localStorage.setItem('userId', id_usuario); // Guarda el id_usuario en localStorage
  };
  const logout = () => {
    setIsAuthenticated(false);
    setUserId(null);
    localStorage.removeItem('isAuthenticated'); // Elimina el valor de localStorage
    localStorage.removeItem('userId');
  };
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);
