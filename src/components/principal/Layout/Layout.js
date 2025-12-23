import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import MainContent from '../MainContent/MainContent'
import { useAuth } from '../../../context/AuthContext';
import './Layout.css'

// Importar componentes de contenido

function Layout({ userId }) {
  const {userRol} = useAuth();
  const pagName = "PUKLLASPA YACHAY";

   console.log("🔍 DEPURACIÓN LAYOUT:");
   console.log("userRol:", userRol);

  let items = [];

  const items_student = [
    { label: 'Aprender', icon: '📙', link: '/aprender' },
    { label: 'Practicar', icon: '💪', link: '/practicar' },
    { label: 'Desafíos', icon: '🏆', link: '/desafios' },
    { label: 'Minijuegos', icon: '🎮', link: '/minijuegos' },
    { label: 'Perfil', icon: '👤', link: '/perfil' },
    { label: 'Soporte', icon: '', link: '/soporte' },
    { label: 'Más', icon: '⬇️', link: '/mas' }
  ];

  const items_teacher = [
     { label: 'Mis Cursos', icon: '📙', link: '/misCursos' },
     { label: 'Perfil', icon: '👤', link: '/perfil' },
     { label: 'Soporte', icon: '', link: '/soporte' },
     { label: 'Más', icon: '⬇️', link: '/mas' }
  ];

  if(userRol === 'maestro')
    items = items_teacher;
  else if(userRol === 'estudiante')
    items = items_student;

  return (
    <div className='app-container'>
      <Sidebar pagName={pagName} items={items} />
      <MainContent />
    </div>
  );
}

export default Layout;
