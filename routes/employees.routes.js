const {Router} = require('express');
const {getAllEmployees, getEmployee, createEmployee, deleteEmployee, updateEmployee} = require('../controllers/employees.controller');

const router = Router();

router.get('/employees', getAllEmployees);

router.get('/employees/:id', getEmployee)

router.post('/employees', createEmployee)

router.delete('/employees/:id', deleteEmployee)

router.put('/employees/:id', updateEmployee)

module.exports = router;