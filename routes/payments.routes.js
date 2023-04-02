const {Router} = require('express');
const {getAllPayments, getPayment, createPayment, deletePayment, updatePayment} = require('../controllers/payments.controller');

const router = Router();

router.get('/payments', getAllPayments);

router.get('/payments/:id', getPayment)

router.post('/payments', createPayment)

router.delete('/payments/:id', deletePayment)

router.put('/payments/:id', updatePayment)

module.exports = router;