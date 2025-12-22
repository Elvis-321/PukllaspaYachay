import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import MainContent from '../MainContent/MainContent'
import './Layout.css'

// Importar componentes de contenido

function Layout({ userId }) {
  const pagName = "PUKLLASPA YACHAY";

  const items = [
    { label: 'Aprender', icon: '📙', link: '/aprender' },
    { label: 'Practicar', icon: '💪', link: '/practicar' },
    { label: 'Desafíos', icon: '🏆', link: '/desafios' },
    { label: 'Minijuegos', icon: '🎮', link: '/minijuegos' },
    { label: 'Perfil', icon: '👤', link: '/perfil' },
    { label: 'Soporte', icon: '', link: '/soporte' },
    { label: 'Más', icon: '⬇️', link: '/mas' }
  ];

  return (
    <div className='app-container'>
      <Sidebar pagName={pagName} items={items} />
      <MainContent />
    </div>
  );
}

export default Layout;
