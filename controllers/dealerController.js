const { pool } = require('../config/database');

const getDealerStock = async (req, res) => {
    try {
        const dealerId = req.user.userId;

        const [stock] = await pool.execute(
            `SELECT item_type, quantity, unit 
             FROM stock 
             WHERE dealer_id = ? AND location = 'dealer'`,
            [dealerId]
        );

        res.json({
            success: true,
            stock: stock
        });

    } catch (error) {
        console.error('Get dealer stock error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching dealer stock'
        });
    }
};

const lookupRationCard = async (req, res) => {
    try {
        const { cardNumber } = req.params;

        const [cards] = await pool.execute(
            `SELECT rc.*, u.fullname, u.aadhaar 
             FROM ration_cards rc 
             JOIN users u ON rc.user_id = u.id 
             WHERE rc.card_no = ?`,
            [cardNumber]
        );

        if (cards.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Ration card not found'
            });
        }

        res.json({
            success: true,
            rationCard: cards[0]
        });

    } catch (error) {
        console.error('Ration card lookup error:', error);
        res.status(500).json({
            success: false,
            message: 'Error looking up ration card'
        });
    }
};

const distributeRation = async (req, res) => {
    try {
        const dealerId = req.user.userId;
        const { cardNumber } = req.body;

        const [cards] = await pool.execute(
            'SELECT * FROM ration_cards WHERE card_no = ?',
            [cardNumber]
        );

        if (cards.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Ration card not found'
            });
        }

        const card = cards[0];

        res.json({
            success: true,
            message: 'Ration distribution simulated successfully',
            distributed: {
                rice: card.rice,
                wheat: card.wheat,
                sugar: card.sugar,
                oil: card.oil
            }
        });

    } catch (error) {
        console.error('Distribute ration error:', error);
        res.status(500).json({
            success: false,
            message: 'Error distributing ration'
        });
    }
};

const requestStock = async (req, res) => {
    try {
        const dealerId = req.user.userId;
        const { itemType, quantity, reason } = req.body;

        const [result] = await pool.execute(
            `INSERT INTO requests (dealer_id, item_type, quantity, reason) 
             VALUES (?, ?, ?, ?)`,
            [dealerId, itemType, quantity, reason]
        );

        res.status(201).json({
            success: true,
            message: 'Stock request submitted successfully',
            requestId: result.insertId
        });

    } catch (error) {
        console.error('Stock request error:', error);
        res.status(500).json({
            success: false,
            message: 'Error submitting stock request'
        });
    }
};

const getDealerRequests = async (req, res) => {
    try {
        const dealerId = req.user.userId;

        const [requests] = await pool.execute(
            `SELECT id, item_type, quantity, reason, status, created_at 
             FROM requests 
             WHERE dealer_id = ? 
             ORDER BY created_at DESC`,
            [dealerId]
        );

        res.json({
            success: true,
            requests: requests
        });

    } catch (error) {
        console.error('Get dealer requests error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching requests'
        });
    }
};

module.exports = {
    getDealerStock,
    lookupRationCard,
    distributeRation,
    requestStock,
    getDealerRequests
};
