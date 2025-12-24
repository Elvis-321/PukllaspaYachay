//routes/usuario.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

//se estan usando en el frontend
router.get('/buscar-usuario/:id_usuario',usuarioController.getUsuarioById)
router.post('/api/verificarUsuario', usuarioController.confirmarUsuario);
router.get('/obtener-clases-de-usuario/:id_usuario',usuarioController.getClases);
router.get('/obtener-clases-de-usuario-maestro/:id_usuario', usuarioController.getClasesMaestro);


//no se estan usando
router.get('/usuarios', usuarioController.getAllUsuarios);
module.exports = router;

