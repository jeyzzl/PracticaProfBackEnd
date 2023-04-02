const {Router} = require('express');
const {getAllTransactions, getTransaction, createTransaction, deleteTransaction, updateTransaction} = require('../controllers/transactions.controller');

const router = Router();

router.get('/transactions', getAllTransactions);

router.get('/transactions/:id', getTransaction)

router.post('/transactions', createTransaction)

router.delete('/transactions/:id', deleteTransaction)

router.put('/transactions/:id', updateTransaction)

module.exports = router;