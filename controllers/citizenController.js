const { pool } = require('../config/database');

const getCitizenProfile = async (req, res) => {
    try {
        const userId = req.user.userId;

        const [users] = await pool.execute(
            'SELECT id, fullname, aadhaar, email, user_type FROM users WHERE id = ?',
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            user: users[0]
        });

    } catch (error) {
        console.error('Get citizen profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching citizen profile'
        });
    }
};

const getCitizenRationCard = async (req, res) => {
    try {
        const userId = req.user.userId;

        const [cards] = await pool.execute(
            'SELECT * FROM ration_cards WHERE user_id = ?',
            [userId]
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
        console.error('Get ration card error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching ration card'
        });
    }
};

const collectRation = async (req, res) => {
    try {
        const userId = req.user.userId;

        // In a real system, this would record the ration collection
        // For demo, we'll just return success

        res.json({
            success: true,
            message: 'Ration collection recorded successfully'
        });

    } catch (error) {
        console.error('Collect ration error:', error);
        res.status(500).json({
            success: false,
            message: 'Error recording ration collection'
        });
    }
};

module.exports = {
    getCitizenProfile,
    getCitizenRationCard,
    collectRation
};
