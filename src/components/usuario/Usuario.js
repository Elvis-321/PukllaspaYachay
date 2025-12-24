// src/components/usuario/Usuario.js
import axios from 'axios';
import API_BASE_URL from '../../config/Config';

const buscarUsuario = async (id_usuario) => {
    try {
      // Realizamos una solicitud GET al servidor para obtener información del usuario
      const response = await axios.get(`${API_BASE_URL}/usuario/buscar-usuario/${id_usuario}`);
  
      // Si la búsqueda es exitosa, devolvemos los datos del usuario
      return response.data;
    } catch (err) {
      if (err.response) {
        // Si el servidor devuelve un error, lo lanzamos para manejarlo fuera de la función
        throw new Error(err.response.data.error);
      } else {
        // Si ocurre un error de red u otro tipo de error
        throw new Error('Error de red o servidor no disponible');
      }
    }
  };

const confirmarUsuario = async (nombre_usuario, contraseña) => {
    try {
      // Realizamos una solicitud POST al servidor para validar el nombre de usuario y contraseña
      const response = await axios.post(`${API_BASE_URL}/usuario/api/verificarUsuario`, { nombre_usuario, contraseña });
  
      // Si id_usuario es -1, significa que la autenticación ha fallado
      if (response.data.id_usuario === -1) {
        return false; // Usuario no autenticado
      }
  
      // Si id_usuario es un número válido, autenticación exitosa
      return response.data.id_usuario; // Devuelve el id_usuario
    } catch (err) {
      if (err.response) {
        console.error("Error en la autenticación:", err.response.data);
        throw new Error(err.response.data.message || 'Error al verificar el usuario');
      } else {
        console.error("Error de red o servidor no disponible:", err);
        throw new Error('Error de red o servidor no disponible');
      }
    }
  };
  
const clasesDeUsuario = async(id_usuario) => {
  try{
    const response = await axios.get(`${API_BASE_URL}/usuario/obtener-clases-de-usuario/${id_usuario}`);
    return response.data
  } catch (err) {
    if (err.response) {
      // Si el servidor devuelve un error, lo lanzamos para manejarlo fuera de la función
      throw new Error(err.response.data.error);
    } else {
      // Si ocurre un error de red u otro tipo de error
      throw new Error('Error de red o servidor no disponible');
    }
  }
}

const clasesDeUsuarioMaestro = async(id_usuario) => {
  try{
    const response = await axios.get(`${API_BASE_URL}/usuario/obtener-clases-de-usuario-maestro/${id_usuario}`);
    return response.data
  } catch (err) {
    if (err.response) {
      // Si el servidor devuelve un error, lo lanzamos para manejarlo fuera de la función
      throw new Error(err.response.data.error);
    } else {
      // Si ocurre un error de red u otro tipo de error
      throw new Error('Error de red o servidor no disponible');
    }
  }
}
  export {buscarUsuario, confirmarUsuario,clasesDeUsuario, clasesDeUsuarioMaestro};

