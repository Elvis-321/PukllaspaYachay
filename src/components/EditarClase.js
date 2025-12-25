import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { actualizarClase, actualizarClaseDeUsuarioMaestro } from './usuario/Usuario';

function EditarClase() {
  const {id_clase } = useParams();          // 📍 ID desde URL
  const location = useLocation();           // 📦 Datos desde state
  const navigate = useNavigate();           // 🔄 Para volver
  
  // Obtiene datos del state (si vienen del padre)
  const claseDelState = location.state?.clase;
  
  // Estado local para el formulario
  const [descripcion, setDescripcion] = useState(claseDelState?.descripcion_clase || '');
  const [nombre, setNombre] = useState(claseDelState?.nombre_clase || '');
  const [color, setColor] = useState(claseDelState?.boton_color || '#3498db');
  const [estado, setEstado] = useState(claseDelState?.estado_clase || 'activa');
  const [imagen, setImagen] = useState(claseDelState?.img_clase || '');

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!nombre.trim()) {
    alert('El nombre de la clase es requerido');
    return;
  }

  const datosClase = {
    nombre_clase: nombre,
    descripcion_clase: descripcion,
    img_clase: imagen,
    boton_color: color
  };

  // Actualizar clase principal
  const resultadoClase = await actualizarClase(id_clase, datosClase);
  
  if (!resultadoClase.success) {
    alert(`Error: ${resultadoClase.error}`);
    return;
  }

  // Actualizar estado si existe
  if (claseDelState?.id_clase_maestro && estado) {
    await actualizarClaseDeUsuarioMaestro(claseDelState.id_clase_maestro, estado);
  }

  alert('Clase actualizada');
  navigate('/misCursos');
};

  const handleCancelar = () => {
    navigate('/misCursos');
  };

  return (
    <div>
      <h2>Editando Clase: {claseDelState?.nombre_clase || 'Nueva Clase'}</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Nombre */}
        <div>
          <label>Nombre de la clase:</label>
          <input 
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        
        {/* Descripción */}
        <div>
          <label>Descripción:</label>
          <textarea 
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        
        {/* Color */}
        <div>
          <label>Color:</label>
          <input 
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <span>{color}</span>
        </div>
        
        {/* Estado */}
        <div>
          <label>Estado:</label>
          <select 
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
            <option value="borrador">Borrador</option>
          </select>
        </div>
        
        {/* Imagen */}
        <div>
          <label>Imagen (URL):</label>
          <input 
            type="text"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
          />
        </div>
        
        {/* Botones */}
        <div>
          <button type="submit">Guardar Cambios</button>
          <button type="button" onClick={handleCancelar}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default EditarClase;