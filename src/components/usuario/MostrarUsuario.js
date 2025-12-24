// src/components/usuario/UsuarioMostrar.js
import React, { useState, useEffect } from 'react';
import { buscarUsuario } from './Usuario'; // Importamos la función buscarUsuario
import API_BASE_URL from '../../config/Config'; // Asegúrate de tener la URL de la API configurada correctamente
import './MostrarUsuario.css'; // Archivo CSS para los estilos

function MostrarUsuario({ userId }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      // Usamos la función buscarUsuario para obtener los datos del usuario
      buscarUsuario(userId)
        .then((data) => {
          console.log("Datos del usuario:", data); // Imprime los datos devueltos por la API
          setUser(data); // Guardamos los datos del usuario en el estado
        })
        .catch((err) => {
          console.error("Error al obtener los datos del usuario:", err); // Imprime el error en consola
          setError('Error al obtener los datos del usuario'); // Manejo de errores
        });
    }
  }, [userId]); // Vuelve a ejecutar si el userId cambia

  // Mostrar error si existe
  if (error) {
    return <div>{error}</div>;
  }

  // Mostrar cargando mientras no haya datos
  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={`${API_BASE_URL}/${user.img_perfil}`}
          alt="Imagen de perfil"
          className="profile-image"
        />
        <h2 className="profile-name">{user.nombre} {user.apellidos}</h2>
      </div>
      <div className="profile-details">
        <p><strong>Edad:</strong> {user.edad}</p>
        <p><strong>Cargo:</strong> {user.rol}</p>
        <p><strong>Nombre de usuario:</strong> {user.nombre_usuario}</p>
        <p><strong>Último acceso:</strong> {new Date(user.ultimo_acceso).toLocaleString()}</p>
        <p><strong>User ID:</strong> {userId}</p>
      </div>
    </div>
  );
}

export default MostrarUsuario;