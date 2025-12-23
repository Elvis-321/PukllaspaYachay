// src/features/contents/Login.js
import React, { useState, useEffect } from "react";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { confirmarUsuario } from "../../components/usuario/Usuario";
import styles from './Login.module.css'; // Asegúrate de importar el archivo CSS
import { buscarUsuario } from "../../components/usuario/Usuario";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Estado para manejar el error
  const { login, isAuthenticated } = useAuth(); // Asegúrate de obtener isAuthenticated
  const navigate = useNavigate(); // Hook de react-router para la navegación

  const handleLogin = async () => {
    try {
      console.log("=== DEBUG LOGIN INICIADO ===");
      const id_usuario = await confirmarUsuario(username, password);
      if (id_usuario) {
        const usuario = await buscarUsuario(id_usuario);
        console.log("2. usuario completo recibido:", usuario);
        console.log("3. Propiedades del usuario:", Object.keys(usuario));
        const usuario_rol = usuario.rol;
        login(id_usuario, usuario_rol);
        navigate("/aprender");
      } else {
        setError("Credenciales inválidas");
      }
    } catch (err) {
      setError(`Hubo un error al intentar iniciar sesión. Detalles: ${err.message || err}`);
    }
  };

  // Usar useEffect para observar el cambio en isAuthenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/aprender");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={styles['login-container']}>
      <div className={styles['login-box']}>
        <div className={styles['login-icon']}>
          <i className="fa fa-user-circle" aria-hidden="true"></i>
        </div>
        <h2 className={styles['login-title']}>Iniciar sesión</h2>
        <form onSubmit={(e) => e.preventDefault()} className={styles['login-form']}>
          <div className={styles['input-group']}>
            <input
              type="text"
              className={styles['login-input']}
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles['input-group']}>
            <input
              type="password"
              className={styles['login-input']}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles['options-group']}>
            <label>
              <input type="checkbox" />
              Recordarme
            </label>
          </div>
          <button type="button" onClick={handleLogin} className={styles['login-button']}>INGRESAR</button>
        </form>
        {error && <p className={styles['error-message']}>{error}</p>}
      </div>
    </div>
  );
}

export default Login;
