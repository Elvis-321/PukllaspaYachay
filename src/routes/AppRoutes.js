// src/routes/AppRoutes.js
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../features/contents/Login";
import NotFound from "../features/contents/NotFound";
import Layout from "../components/principal/Layout/Layout";
import PublicLayout from "../components/principal/PublicLayout";
import MainContent from "../components/principal/MainContent/MainContent";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from '../context/AuthContext';  // Usamos el hook useAuth

function AppRoutes() {
  const { isAuthenticated } = useAuth(); // Obtenemos el estado de autenticación desde el contexto

  return (
    <Routes>
      {/* Ruta pública (login) */}
      <Route path="/" element={<PublicLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="" element={isAuthenticated ? <Navigate to="aprender" /> : <Navigate to="login" />} />
      </Route>

      {/* Rutas protegidas */}
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="*" element={<MainContent />} />  {/* Pasa todo a MainContent */}
      </Route>

      {/* Ruta no encontrada */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;

