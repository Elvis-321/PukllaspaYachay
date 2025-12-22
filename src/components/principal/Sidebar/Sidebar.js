import React from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link desde react-router-dom
import './Sidebar.css';

function Sidebar({ items, pagName }) {
  return (
    <div className="sidebar">
      {/* Nombre de la página */}
      <div className="sidebar-header">
        <h1>{pagName}</h1>
      </div>

      {/* Iterar sobre los items para generar los enlaces */}
      {items.map((item, index) => (
        <Link 
          key={index} 
          to={item.link} // Usamos Link para que sea una ruta de React
          className="menu-item" // Asignamos clase para el estilo
        >
          <span className="sidebar-icon" role="img" aria-label={item.label}>
            {item.icon}
          </span>
          <span className="sidebar-text">
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default Sidebar;
