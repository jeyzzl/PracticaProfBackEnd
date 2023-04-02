const {Router} = require('express');
const {getAllMemberships, getMembership, createMembership, deleteMembership, updateMembership} = require('../controllers/memberships.controller');

const router = Router();

router.get('/memberships', getAllMemberships);

router.get('/memberships/:id', getMembership)

router.post('/memberships', createMembership)

router.delete('/memberships/:id', deleteMembership)

router.put('/memberships/:id', updateMembership)

module.exports = router;