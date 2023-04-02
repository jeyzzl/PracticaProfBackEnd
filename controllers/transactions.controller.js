const pool = require('../db')

const getAllTransactions = async (req, res, next) => {
    try {
        const allTrans = await pool.query('SELECT * FROM transaction')
        res.json(allTrans.rows)
    } catch (error) {
        next(error)
    }
}

const getTransaction = async(req, res, next) => {
    try {
        const {id} = req.params

        const result = await pool.query('SELECT * FROM transaction WHERE id_trans = $1', [id])

        if (result.rows.length === 0) return res.status(404).json({
            message: 'Transaction not found'
        })
        res.json(result.rows[0])

    } catch (error) {
        next(error)
    }
}

const createTransaction = async(req, res, next) => {
    try {
        const {id_client, trans_name, amount, bill_date} = req.body;

        const result = await pool.query('INSERT INTO transaction (id_client, trans_name, amount, bill_date) VALUES ($1, $2, $3, $4) RETURNING *', [
            id_client,
            trans_name,
            amount,
            bill_date
        ]);
    
        res.json(result.rows[0])
    } catch (error) {
        next(error) 
    }
}

const deleteTransaction = async (req, res, next)=>{
    try {
        const {id} = req.params;

        const result = await pool.query('DELETE FROM transaction WHERE id_trans = $1 RETURNING * ', [id])
    
        if (result.rowCount === 0){
            return res.status(404).json({
                message: "Transaction not found"
            })
        }
    
        return res.sendStatus(204);
        
    } catch (error) {
        next(error);
    }
}

const updateTransaction = async (req, res, next)=>{
    try {
        const {id} = req.params;
        const {id_client, trans_name, amount, bill_date} = req.body;

        const result = await pool.query(
            'UPDATE transaction SET id_client = $1 , trans_name = $2 , amount = $3, bill_date = $4 WHERE id_trans = $5 RETURNING *;', 
            [id_client, trans_name, amount, bill_date, id]
        );
    
        if (result.rows.length === 0) 
            return res.status(404).json({
                message: "Transaction not found"
            });
        
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllTransactions,
    getTransaction,
    createTransaction,
    deleteTransaction,
    updateTransaction
}