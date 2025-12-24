// src/components/ComponenteClaseM.js - VERSIÓN SUPER SIMPLE
import React from 'react';

function ComponenteClaseM({ clase , onEditarClase}) {
  const { nombre_clase, descripcion_clase, img_clase, boton_color, estado_clase } = clase;
  
  // Si clase es undefined o null
  if (!clase) {
    return (
      <div style={{ border: '3px solid red', padding: '20px', margin: '10px' }}>
        <h3>ERROR: clase es undefined/null</h3>
      </div>
    );
  }
  
  return (
    <div>
      <h2>{nombre_clase}</h2>
      <p>{descripcion_clase}</p>
      <p>{ img_clase}</p>
      <p>{boton_color}</p>
      <p>{estado_clase}</p>
      <div 
        onClick={() => onEditarClase(clase)}
        role="button"
        tabIndex={0}
        style={{ cursor: 'pointer' }}
      >
        <p>Editar</p>
      </div>
    </div>
  );
}

export default ComponenteClaseM;