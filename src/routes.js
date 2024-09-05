const express = require('express');
const authMiddleware = require('./middlewares/authMiddleware');
const authController = require('./controllers/authController');
const essenceController = require('./controllers/essenceController');

const router = express.Router();

// Rotas de Autenticação
router.post('/authenticate', authController.authenticate);

// Rotas de Essências (Boticário)
router.get('/essences', authMiddleware.verifyTokenAndConvertToBasicAuth, essenceController.getEssences);
router.get('/essences/:id', authMiddleware.verifyTokenAndConvertToBasicAuth, essenceController.getEssenceById);

module.exports = router;
