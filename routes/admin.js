const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController'); // Correct// Fix this import

router.get('/system-stock', adminController.getSystemStock);
router.get('/pending-requests', adminController.getPendingRequests);
router.post('/approve-request/:requestId', adminController.approveRequest);
router.post('/reject-request/:requestId', adminController.rejectRequest);
router.get('/statistics', adminController.getSystemStatistics);
router.get('/dealer-performance', adminController.getDealerPerformance);

module.exports = router;
