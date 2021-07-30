const { Router } = require('express');

const ControllerTransaction=require('../controllers/ControllerTransaction');

const router = Router();

router.get('/pruebaTransaction',ControllerTransaction.pruebaTransaction);

router.post('/crearTransaction',ControllerTransaction.saveTransaction);
router.get('/buscarTransaction/:id',ControllerTransaction.buscarData);
router.get('/buscarTransactionAll/:idb?',ControllerTransaction.listarAllData);
router.put('/actualizarTransaction/:id',ControllerTransaction.updateTransaction);
router.delete('/borrarTransaction/:id',ControllerTransaction.deleteTransaction);

module.exports = router;