const { pool } = require('../config/database');

const getSystemStock = async (req, res) => {
    try {
        const [stock] = await pool.execute(
            `SELECT item_type, quantity, unit 
             FROM stock 
             WHERE location = 'system'`
        );

        res.json({
            success: true,
            stock: stock
        });

    } catch (error) {
        console.error('Get system stock error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching system stock'
        });
    }
};

const getPendingRequests = async (req, res) => {
    try {
        const [requests] = await pool.execute(
            `SELECT r.*, u.fullname as dealer_name 
             FROM requests r 
             JOIN users u ON r.dealer_id = u.id 
             WHERE r.status = 'pending' 
             ORDER BY r.created_at DESC`
        );

        res.json({
            success: true,
            requests: requests
        });

    } catch (error) {
        console.error('Get pending requests error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching pending requests'
        });
    }
};

const approveRequest = async (req, res) => {
    try {
        const { requestId } = req.params;

        // Update request status to approved
        const [result] = await pool.execute(
            'UPDATE requests SET status = "approved", processed_at = NOW() WHERE id = ?',
            [requestId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Request not found'
            });
        }

        res.json({
            success: true,
            message: 'Request approved successfully'
        });

    } catch (error) {
        console.error('Approve request error:', error);
        res.status(500).json({
            success: false,
            message: 'Error approving request'
        });
    }
};

const rejectRequest = async (req, res) => {
    try {
        const { requestId } = req.params;

        const [result] = await pool.execute(
            'UPDATE requests SET status = "rejected", processed_at = NOW() WHERE id = ?',
            [requestId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Request not found'
            });
        }

        res.json({
            success: true,
            message: 'Request rejected successfully'
        });

    } catch (error) {
        console.error('Reject request error:', error);
        res.status(500).json({
            success: false,
            message: 'Error rejecting request'
        });
    }
};

const getSystemStatistics = async (req, res) => {
    try {
        // Get total citizens
        const [citizens] = await pool.execute(
            'SELECT COUNT(*) as total FROM users WHERE user_type = "citizen"'
        );

        // Get active dealers
        const [dealers] = await pool.execute(
            'SELECT COUNT(*) as total FROM users WHERE user_type = "dealer"'
        );

        // Get monthly distribution (example calculation)
        const [distributions] = await pool.execute(
            'SELECT SUM(rice + wheat + sugar) as total_kg FROM distributions WHERE MONTH(distributed_at) = MONTH(CURRENT_DATE())'
        );

        // Get pending requests count
        const [pending] = await pool.execute(
            'SELECT COUNT(*) as total FROM requests WHERE status = "pending"'
        );

        res.json({
            success: true,
            statistics: {
                totalCitizens: citizens[0].total,
                activeDealers: dealers[0].total,
                monthlyDistribution: distributions[0].total_kg || 0,
                pendingRequests: pending[0].total
            }
        });

    } catch (error) {
        console.error('Get statistics error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching statistics'
        });
    }
};

const getDealerPerformance = async (req, res) => {
    try {
        const [dealers] = await pool.execute(
            `SELECT u.id, u.fullname, 
                    COUNT(d.id) as distributions_count,
                    MAX(d.distributed_at) as last_activity
             FROM users u
             LEFT JOIN distributions d ON u.id = d.dealer_id
             WHERE u.user_type = 'dealer'
             GROUP BY u.id, u.fullname
             ORDER BY distributions_count DESC`
        );

        res.json({
            success: true,
            dealers: dealers
        });

    } catch (error) {
        console.error('Get dealer performance error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching dealer performance'
        });
    }
};

module.exports = {
    getSystemStock,
    getPendingRequests,
    approveRequest,
    rejectRequest,
    getSystemStatistics,
    getDealerPerformance
};
