const express = require('express');
const router = express.Router();

router.get('/profile', (req, res) => {
    res.json({
        success: true,
        user: {
            id: 1,
            fullname: 'Demo Citizen',
            aadhaar: '001122334455',
            email: 'citizen@demo.com'
        }
    });
});

router.get('/ration-card', (req, res) => {
    res.json({
        success: true,
        rationCard: {
            card_no: 'RC001APL7890',
            family_members: 4,
            category: 'APL',
            rice: 10,
            wheat: 8,
            sugar: 2,
            oil: 1
        }
    });
});

router.post('/collect-ration', (req, res) => {
    res.json({
        success: true,
        message: 'Ration collection recorded successfully'
    });
});

module.exports = router;
