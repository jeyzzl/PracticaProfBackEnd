const pool = require('../db')

const getAllEmployees = async (req, res, next) => {
    try {
        const allEmployees = await pool.query('SELECT * FROM employee')
        res.json(allEmployees.rows)
    } catch (error) {
        next(error)
    }
}

const getEmployee = async(req, res, next) => {
    try {
        const {id} = req.params

        const result = await pool.query('SELECT * FROM employee WHERE id_employee = $1', [id])

        if (result.rows.length === 0) return res.status(404).json({
            message: 'Employee not found'
        })
        res.json(result.rows[0])

    } catch (error) {
        next(error)
    }
}

const createEmployee = async(req, res, next) => {
    try {
        const {name, last_name, salary, email, password, id_rol} = req.body;

        const result = await pool.query('INSERT INTO employee (name, last_name, salary, email, password, id_rol) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [
            name,
            last_name,
            salary,
            email,
            password,
            id_rol
        ]);
    
        res.json(result.rows[0])
    } catch (error) {
        next(error)
    }
}

const deleteEmployee = async (req, res, next)=>{
    try {
        const {id} = req.params;

        const result = await pool.query('DELETE FROM employee WHERE id_employee = $1 RETURNING * ', [id])
    
        if (result.rowCount === 0){
            return res.status(404).json({
                message: "Employee not found"
            })
        }
    
        return res.sendStatus(204);
        
    } catch (error) {
        next(error);
    }
}

const updateEmployee = async (req, res, next)=>{
    try {
        const {id} = req.params;
        const {name, last_name, salary, email, password, id_rol} = req.body;

        const result = await pool.query(
            'UPDATE employee SET name = $1 , last_name = $2 , salary = $3 , email = $4 , password = $5 , id_rol = $6 WHERE id_employee = $7 RETURNING *;', 
            [name, last_name, salary, email, password, id_rol, id]
        );
    
        if (result.rows.length === 0) 
            return res.status(404).json({
                message: "Employee not found"
            });
        
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllEmployees,
    getEmployee,
    createEmployee,
    deleteEmployee,
    updateEmployee
}