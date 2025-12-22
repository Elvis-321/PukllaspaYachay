// components/Content.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Aprender from '../../../features/contents/Aprender';
import Practicar from '../../../features/contents/Practicar';
import Desafios from '../../../features/contents/Desafios';
import Minijuegos from '../../../features/contents/Minijuegos';
import Perfil from '../../../features/contents/Perfil';
import Soporte from '../../../features/contents/Soporte';
import Mas from "../../../features/contents/Mas";
import { useAuth } from '../../../context/AuthContext'; // Importa useAuth
import './MainContent.css'

function Content() {
  const { userId } = useAuth(); // Accede al userId desde el contexto
  return (
    <div className='main-content'>
      <Routes>
        <Route path="/aprender" element={<Aprender userId={userId} />} />
        <Route path="/practicar" element={<Practicar userId={userId}/>} />
        <Route path="desafios" element={<Desafios userId={userId}/>} />
        <Route path="minijuegos" element={<Minijuegos />} />
        <Route path="/perfil" element={<Perfil userId={userId} />} />
        <Route path="soporte" element={<Soporte />} />
        <Route path="mas" element={<Mas />}/>
        
      </Routes>
    </div>
  );
}
export default Content;
