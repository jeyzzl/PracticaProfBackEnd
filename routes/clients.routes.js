const {Router} = require('express');
const {getAllClients, getClient, createClient, deleteClient, updateClient} = require('../controllers/clients.controller');

const router = Router();

router.get('/clients', getAllClients);

router.get('/clients/:id', getClient)

router.post('/clients', createClient)

router.delete('/clients/:id', deleteClient)

router.put('/clients/:id', updateClient)

module.exports = router;