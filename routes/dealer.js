const express = require('express');
const router = express.Router();

router.get('/stock', (req, res) => {
    res.json({
        success: true,
        stock: [
            { item_type: 'rice', quantity: 150, unit: 'kg' },
            { item_type: 'wheat', quantity: 200, unit: 'kg' },
            { item_type: 'sugar', quantity: 0, unit: 'kg' },
            { item_type: 'oil', quantity: 50, unit: 'L' }
        ]
    });
});

router.get('/ration-card/:cardNumber', (req, res) => {
    res.json({
        success: true,
        rationCard: {
            card_no: req.params.cardNumber,
            fullname: 'Demo Citizen',
            family_members: 4,
            rice: 10,
            wheat: 8,
            sugar: 2,
            oil: 1
        }
    });
});

router.post('/distribute', (req, res) => {
    res.json({
        success: true,
        message: 'Ration distributed successfully'
    });
});

router.post('/request-stock', (req, res) => {
    res.json({
        success: true,
        message: 'Stock request submitted successfully'
    });
});

router.get('/requests', (req, res) => {
    res.json({
        success: true,
        requests: []
    });
});

module.exports = router;
