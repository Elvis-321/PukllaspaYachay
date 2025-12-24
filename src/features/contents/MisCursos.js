// src/features/contents/MisCursos.js
import React, { useState, useEffect } from 'react';
import { clasesDeUsuarioMaestro } from '../../components/usuario/Usuario';
import { useNavigate } from 'react-router-dom';
import ComponenteClaseM from '../../components/ComponenteClaseM'; // Asegúrate de importar este componente

function MisCursos({ userId }) {

  console.log('🚀 MisCursos montado con userId:', userId);
  const [clases, setClases] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Estado para manejar carga

  useEffect(() => {
    const fetchClasesMaestro = async () => {
      if (!userId) {
        setError('ID de usuario no proporcionado');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        
        // Usamos la función clasesDeUsuarioMaestro para obtener las clases del maestro
        const data = await clasesDeUsuarioMaestro(userId);
        //recuerda que esta data es un objeto y dentro de este esta el array
        setClases(data.clases);
      } catch (err) {
        console.error('Error al obtener clases del maestro:', err);
        setError('Error al obtener las clases del usuario maestro');
        setClases([]); // Asegurar que sea array vacío en caso de error
      } finally {
        setLoading(false);
      }
    };

    fetchClasesMaestro();
  }, [userId]);

  if (loading) {
    return (
      <div>
        <h1>Mis Cursos</h1>
        <p>Cargando clases...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Mis Cursos</h1>
        <p style={{ color: 'red' }}>{error}</p>
        <p>Usuario ID: {userId}</p>
      </div>
    );
  }

  const handleEditarClase = (clase) => {
    console.log('que se esta mandando', Object.keys(clase))
    navigate(`/editar/${clase.id_clase}`, {state: { clase }});
  };

  console.log('valor:', clases.length)
  console.log('valor:', clases)
  return (
    <div>
      <h1>Mis Cursos</h1>
      {clases.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem' }}>
          {clases.map((clase) => (
            <ComponenteClaseM    
              key = {clase.id_clase_maestro}    
              clase={clase}
              onEditarClase={handleEditarClase}
            />
          
          ))}
        </div>
      ) : (
        <p>No tienes clases asignadas como maestro.</p>
      )}
    </div>
  );
}

export default MisCursos;