const pool = require('../db')

const getAllPayments = async (req, res, next) => {
    try {
        const allPayments = await pool.query('SELECT * FROM payment')
        res.json(allPayments.rows)
    } catch (error) {
        next(error)
    }
}

const getPayment = async(req, res, next) => {
    try {
        const {id} = req.params

        const result = await pool.query('SELECT * FROM payment WHERE id_payment = $1', [id])

        if (result.rows.length === 0) return res.status(404).json({
            message: 'Payment not found'
        })
        res.json(result.rows[0])

    } catch (error) {
        next(error)
    }
}

const createPayment = async(req, res, next) => {
    try {
        const {id_client, amount, bill_date} = req.body;

        const result = await pool.query('INSERT INTO payment (id_client, amount, bill_date) VALUES ($1, $2, $3) RETURNING *', [
            id_client,
            amount,
            bill_date
        ]);
    
        res.json(result.rows[0])
    } catch (error) {
        next(error) 
    }
}

const deletePayment = async (req, res, next)=>{
    try {
        const {id} = req.params;

        const result = await pool.query('DELETE FROM payment WHERE id_payment = $1 RETURNING * ', [id])
    
        if (result.rowCount === 0){
            return res.status(404).json({
                message: "Payment not found"
            })
        }
    
        return res.sendStatus(204);
        
    } catch (error) {
        next(error);
    }
}

const updatePayment = async (req, res, next)=>{
    try {
        const {id} = req.params;
        const {id_client, amount, bill_date} = req.body;

        const result = await pool.query(
            'UPDATE payment SET id_client = $1 , amount = $2 , bill_date = $3 WHERE id_payment = $4 RETURNING *;', 
            [id_client, amount, bill_date, id]
        );
    
        if (result.rows.length === 0) 
            return res.status(404).json({
                message: "Payment not found"
            });
        
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllPayments,
    getPayment,
    createPayment,
    deletePayment,
    updatePayment
}