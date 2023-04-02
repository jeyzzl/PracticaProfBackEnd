const pool = require('../db')

const getAllClients = async (req, res, next) => {
    try {
        const allClients = await pool.query('SELECT * FROM client')
        res.json(allClients.rows)
    } catch (error) {
        next(error)
    }
}

const getClient = async(req, res, next) => {
    try {
        const {id} = req.params

        const result = await pool.query('SELECT * FROM client WHERE id_client = $1', [id])

        if (result.rows.length === 0) return res.status(404).json({
            message: 'Client not found'
        })
        res.json(result.rows[0])

    } catch (error) {
        next(error)
    }
}

const createClient = async(req, res, next) => {
    try {
        const {name, last_name, sex, age, phone, email, password} = req.body;

        const result = await pool.query('INSERT INTO client (name, last_name, sex, age, phone, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [
            name,
            last_name,
            sex,
            age,
            phone,
            email,
            password
        ]);
    
        res.json(result.rows[0])
    } catch (error) {
        next(error)
    }
}

const deleteClient = async (req, res, next)=>{
    try {
        const {id} = req.params;

        const result = await pool.query('DELETE FROM client WHERE id_client = $1 RETURNING * ', [id])
    
        if (result.rowCount === 0){
            return res.status(404).json({
                message: "Client not found"
            })
        }
    
        return res.sendStatus(204);
        
    } catch (error) {
        next(error);
    }
}

const updateClient = async (req, res, next)=>{
    try {
        const {id} = req.params;
        const {name, last_name, sex, age, phone, email, password} = req.body;

        const result = await pool.query(
            'UPDATE client SET name = $1 , last_name = $2 , sex = $3 , age = $4 , phone = $5 , email = $6 , password = $7 WHERE id_client = $8 RETURNING *;', 
            [name, last_name, sex, age, phone, email, password, id]
        );
    
        if (result.rows.length === 0) 
            return res.status(404).json({
                message: "Client not found"
            });
        
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllClients,
    getClient,
    createClient,
    deleteClient,
    updateClient
}