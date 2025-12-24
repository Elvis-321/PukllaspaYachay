//usuarioController.js
const db = require('../config/db');

// Obtener usuario por id_usuario
exports.getUsuarioById = (req, res) => {
    const { id_usuario } = req.params; // Captura el parámetro de la URL (por ejemplo, /usuario/:id_usuario)
  
    const sql = 'SELECT * FROM usuario WHERE id_usuario = ?';
    
    db.query(sql, [id_usuario], (err, result) => {
      if (err) {
        console.error('Error al obtener el usuario:', err);
        res.status(500).json({ error: 'Error al obtener el usuario' });
      } else {
        if (result.length === 0) {
          res.status(404).json({ error: 'Usuario no encontrado' }); // Si no se encuentra el usuario
        } else {
          res.json(result[0]); // Envía el primer (y único) resultado del usuario
        }
      }
    });
  };

// Obtener todos los usuarios
exports.getAllUsuarios = (req, res) => {
    const sql = 'SELECT * FROM usuario'; // Consulta SQL para obtener todos los datos
  
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al obtener los usuarios:', err);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
      } else {
        res.json(result); // Devuelve los resultados de la consulta como respuesta
      }
    });
  };

// Obtener id_usuario dado el nombre de usuario y la contraseña
exports.confirmarUsuario = (req, res) => {
  const { nombre_usuario, contraseña } = req.body; // Obtenemos los datos enviados por el cliente (POST)

  // Consultar el usuario en la base de datos
  const sql = 'SELECT id_usuario, contraseña FROM usuario WHERE nombre_usuario = ?';
  
  db.query(sql, [nombre_usuario], (err, result) => {
    if (err) {
      console.error('Error al obtener el usuario:', err);
      return res.status(500).json({ error: 'Error al obtener el usuario' });
    }

    if (result.length === 0) {
      // Si no se encuentra el usuario, devolver -1
      return res.json({ id_usuario: -1 }); // Usuario no encontrado
    }

    // El resultado contiene el usuario encontrado, ahora comparamos las contraseñas
    const usuario = result[0];

    // Comparar las contraseñas directamente (sin encriptación)
    if (contraseña !== usuario.contraseña) {
      // Si la contraseña no coincide, devolver -1
      return res.json({id_usuario: -1});
    }

    // Si la contraseña es correcta, devolver el id_usuario
    return res.json({ id_usuario: usuario.id_usuario });
  });
};

// Obtener clases y progreso de un usuario por id_usuario
exports.getClases = (req, res) => {
  const { id_usuario } = req.params;  // Capturamos el id_usuario de los parámetros de la URL

  // Consulta SQL para obtener las clases y el progreso del usuario
  const sql = `
    SELECT c.id_clase, c.img_clase, c.boton_color, c.nombre_clase, ce.progreso
    FROM Clase_estudiante ce
    JOIN Clase c ON ce.id_clase = c.id_clase
    WHERE ce.id_usuario = ?;
  `;

  // Ejecutamos la consulta en la base de datos
  db.query(sql, [id_usuario], (err, result) => {
    if (err) {
      console.error('Error al obtener las clases del usuario estudiante:', err);
      return res.status(500).json({ error: 'Error al obtener las clases del usuario estudiante' });
    }

    // Si no se encuentran clases para el usuario, devolvemos un array vacío
    if (result.length === 0) {
      return res.json([]);  // Devolvemos una lista vacía, indicando que no tiene clases asignadas
    }
    // Si se encuentran clases, las devolvemos en la respuesta
    res.json(result);
  });
};


exports.getClasesMaestro = (req, res) => {
  const { id_usuario } = req.params;

  // Consulta con JOIN para obtener información completa
  const sql = `
    SELECT cm.id_clase_maestro, cm.estado_clase, c.id_clase, c.nombre_clase, c.descripcion_clase, c.img_clase, c.boton_color, cm.estado_clase FROM clase_maestro cm INNER JOIN clase c ON cm.id_clase = c.id_clase WHERE cm.id_usuario = ?;
  `;

  db.query(sql, [id_usuario], (err, results) => {
    if (err) {
      console.error('Error al obtener clases del maestro:', err);
      return res.status(500).json({ 
        success: false,
        message: 'Error del servidor',
        error: err.message 
      });
    }

    // Formatear respuesta
    res.json({
      success: true,
      count: results.length,
      clases: results
    });
  });
};
  
  