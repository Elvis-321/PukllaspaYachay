// src/features/contents/MisCursos.js
import React from 'react';

function MisCursos({ userId }) {
  return (
    <div>
      <h1>Mis Cursos</h1>
      <p>Usuario ID: {userId}</p>
      <p>Esta es la página de cursos del maestro.</p>
    </div>
  );
}

export default MisCursos;