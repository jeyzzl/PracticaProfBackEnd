const pool = require('../db')

const getAllMemberships = async (req, res, next) => {
    try {
        const allMemberships = await pool.query('SELECT * FROM membership')
        res.json(allMemberships.rows)
    } catch (error) {
        next(error)
    }
}

const getMembership = async(req, res, next) => {
    try {
        const {id} = req.params

        const result = await pool.query('SELECT * FROM membership WHERE id_membership = $1', [id])

        if (result.rows.length === 0) return res.status(404).json({
            message: 'Membership not found'
        })
        res.json(result.rows[0])

    } catch (error) {
        next(error)
    }
}

const createMembership = async(req, res, next) => {
    try {
        const {id_client, dateStart, state} = req.body;

        const result = await pool.query('INSERT INTO membership (id_client, state, date_start) VALUES ($1, $2, $3) RETURNING *', [
            id_client,
            state,
            dateStart
        ]);
    
        res.json(result.rows[0])
    } catch (error) {
        next(error)
    }
}

const deleteMembership = async (req, res, next)=>{
    try {
        const {id} = req.params;

        const result = await pool.query('DELETE FROM membership WHERE id_membership = $1 RETURNING * ', [id])
    
        if (result.rowCount === 0){
            return res.status(404).json({
                message: "Membership not found"
            })
        }
    
        return res.sendStatus(204);
        
    } catch (error) {
        next(error);
    }
}

const updateMembership = async (req, res, next)=>{
    try {
        const {id} = req.params;
        const {id_client, state, dateStart} = req.body;

        const result = await pool.query(
            'UPDATE membership SET id_client = $1 , state = $2 , date_start = $3 WHERE id_membership = $4 RETURNING *;', 
            [id_client, state, dateStart, id]
        );
    
        if (result.rows.length === 0) 
            return res.status(404).json({
                message: "Membership not found"
            });
        
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllMemberships,
    getMembership,
    createMembership,
    deleteMembership,
    updateMembership
}