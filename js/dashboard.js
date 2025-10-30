// Dashboard functions
/*function showCitizenDashboard() {
    if (!currentUser) {
        showHome();
        return;
    }
    showPage('citizenDashboard');
}

function showDealerDashboard() {
    if (!currentUser) {
        showHome();
        return;
    }
    showPage('dealerDashboard');
    updateDealerStockDisplay();
}

function showAdminDashboard() {
    if (!currentUser) {
        showHome();
        return;
    }
    showPage('adminDashboard');
    renderPendingRequests();
}

// Citizen Functions
function downloadCard() {
    const cardNo = document.getElementById('citizenCardNo').textContent;
    showNotification(`Downloading ration card: ${cardNo}`, 'success');
    // In a real app, this would generate and download a PDF
}

function collectRation() {
    showNotification('Ration collection successful! Your monthly quota has been marked as collected.', 'success');
}

function contactDealer(phone) {
    showNotification(`Calling dealer: ${phone}`, 'info');
    // In a real app, this would open the phone dialer
}

function getDirections(address) {
    showNotification(`Getting directions to: ${address}`, 'info');
    // In a real app, this would open maps navigation
}

// Dealer Functions
function distributeRation() {
    const cardNumber = document.getElementById('cardNumber').value;
    if (!cardNumber) {
        showNotification('Please search for a ration card first.', 'warning');
        return;
    }
    showNotification(`Ration distributed successfully for card: ${cardNumber}`, 'success');
}

// Dealer - Card Lookup Form
document.getElementById('cardLookupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const cardNumber = document.getElementById('cardNumber').value.trim().toUpperCase();
    const cardDetailsDiv = document.getElementById('cardDetails');
    const cardInfoDiv = document.getElementById('cardInfo');

    if (cardNumber) {
        // Mock card data - in real app, this would come from API
        const mockCardData = {
            'RC001APL7890': {
                name: 'Gopal Krishnan',
                aadhaar: '001122334455',
                familyMembers: 4,
                category: 'APL',
                rice: 10,
                wheat: 8,
                sugar: 2,
                oil: 1
            },
            'RC002BPL1234': {
                name: 'Sita Devi',
                aadhaar: '002233445566',
                familyMembers: 6,
                category: 'BPL',
                rice: 25,
                wheat: 15,
                sugar: 3,
                oil: 2
            }
        };

        const cardData = mockCardData[cardNumber];
        if (cardData) {
            document.getElementById('cardHolderName').textContent = `Card Holder: ${cardData.name}`;
            cardInfoDiv.innerHTML = `
                <p>Aadhaar: ${cardData.aadhaar}</p>
                <p>Family Members: ${cardData.familyMembers}</p>
                <p>Category: ${cardData.category}</p>
                <p class="mt-2 text-green-700 font-bold">Monthly Entitlement:</p>
                <p>Rice: ${cardData.rice} kg, Wheat: ${cardData.wheat} kg</p>
                <p>Sugar: ${cardData.sugar} kg, Oil: ${cardData.oil} L</p>
            `;
            cardDetailsDiv.classList.remove('hidden');
        } else {
            cardInfoDiv.innerHTML = `<p class="text-red-700">Card not found. Please check the card number.</p>`;
            cardDetailsDiv.classList.remove('hidden');
        }
    }
});

// Dealer - Stock Request Form
document.getElementById('stockRequestForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const item = document.getElementById('requestItem').value;
    const quantity = document.getElementById('requestQuantity').value;
    const reason = document.getElementById('requestReason').value;

    if (!item || !quantity || !reason) {
        showNotification('Please fill all fields.', 'warning');
        return;
    }

    showNotification(`Stock request submitted to admin!\n\nItem: ${item}\nQuantity: ${quantity}\nReason: ${reason}`, 'success');
    
    // Reset form
    document.getElementById('stockRequestForm').reset();
});

// Admin Functions
function approveRequest(requestId) {
    const request = stockRequests.find(req => req.id === requestId);
    if (request) {
        request.status = 'approved';
        showNotification(`Request #${requestId} approved successfully! Stock has been allocated to the dealer.`, 'success');
        renderPendingRequests();
    }
}

function rejectRequest(requestId) {
    const request = stockRequests.find(req => req.id === requestId);
    if (request) {
        request.status = 'rejected';
        showNotification(`Request #${requestId} rejected! The dealer has been notified.`, 'error');
        renderPendingRequests();
    }
}

function generateReport() {
    showNotification('Monthly report generated successfully! Report downloaded as PDF.', 'success');
    // In real app, this would generate and download a PDF report
}

function viewAllDealers() {
    showNotification('Opening dealer management panel...', 'info');
    // In real app, this would show a modal or navigate to dealer management page
    const dealers = [
        { name: 'Amit Kumar', shop: 'F.P. Shop #321', phone: '9876543210', status: 'Active' },
        { name: 'Priya Sharma', shop: 'F.P. Shop #322', phone: '9876543211', status: 'Active' },
        { name: 'Rajesh Patel', shop: 'F.P. Shop #323', phone: '9876543212', status: 'Inactive' }
    ];
    
    let dealersList = 'Active Dealers:\n\n';
    dealers.filter(d => d.status === 'Active').forEach(dealer => {
        dealersList += `• ${dealer.name} - ${dealer.shop} (${dealer.phone})\n`;
    });
    
    alert(dealersList);
}

function manageStock() {
    showNotification('Opening stock management system...', 'info');
    // In real app, this would show a modal for stock management
    let stockInfo = 'Current System Stock:\n\n';
    stockInfo += `Rice: ${systemStock.rice.toLocaleString()} kg\n`;
    stockInfo += `Wheat: ${systemStock.wheat.toLocaleString()} kg\n`;
    stockInfo += `Sugar: ${systemStock.sugar.toLocaleString()} kg\n`;
    stockInfo += `Oil: ${systemStock.oil.toLocaleString()} L`;
    
    alert(stockInfo);
}

function systemSettings() {
    showNotification('Opening system configuration...', 'info');
    // In real app, this would show system settings
    alert('System Settings:\n\n• User Management\n• Stock Configuration\n• Report Settings\n• System Preferences');
}

// Stock management variables
let stockRequests = [
    {
        id: 1,
        dealerName: 'Amit Kumar',
        dealerEmail: 'dealer@demo.com',
        item: 'rice',
        quantity: 100,
        unit: 'kg',
        reason: 'Low stock',
        status: 'pending',
        date: '2024-10-14'
    },
    {
        id: 2,
        dealerName: 'Priya Sharma',
        dealerEmail: 'dealer2@demo.com',
        item: 'sugar',
        quantity: 50,
        unit: 'kg',
        reason: 'Out of stock',
        status: 'pending',
        date: '2024-10-13'
    }
];

let systemStock = {
    rice: 15000,
    wheat: 22000,
    sugar: 8000,
    oil: 6500
};*/
// Dashboard functions
function showCitizenDashboard() {
    if (!currentUser) {
        showHome();
        return;
    }
    showPage('citizenDashboard');
}

function showDealerDashboard() {
    if (!currentUser) {
        showHome();
        return;
    }
    showPage('dealerDashboard');
    updateDealerStockDisplay();
}

function showAdminDashboard() {
    if (!currentUser) {
        showHome();
        return;
    }
    showPage('adminDashboard');
    renderPendingRequests();
}

// Citizen Functions
function downloadCard() {
    const cardNo = document.getElementById('citizenCardNo').textContent;
    showNotification(`Downloading ration card: ${cardNo}`, 'success');
    // In a real app, this would generate and download a PDF
}

function collectRation() {
    showNotification('Ration collection successful! Your monthly quota has been marked as collected.', 'success');
}

function contactDealer(phone) {
    showNotification(`Calling dealer: ${phone}`, 'info');
    // In a real app, this would open the phone dialer
}

function getDirections(address) {
    showNotification(`Getting directions to: ${address}`, 'info');
    // In a real app, this would open maps navigation
}

// Dealer Functions
function distributeRation() {
    const cardNumber = document.getElementById('cardNumber').value;
    if (!cardNumber) {
        showNotification('Please search for a ration card first.', 'warning');
        return;
    }
    showNotification(`Ration distributed successfully for card: ${cardNumber}`, 'success');
}

// Dealer - Card Lookup Form
document.getElementById('cardLookupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const cardNumber = document.getElementById('cardNumber').value.trim().toUpperCase();
    const cardDetailsDiv = document.getElementById('cardDetails');
    const cardInfoDiv = document.getElementById('cardInfo');

    if (cardNumber) {
        // Mock card data - in real app, this would come from API
        const mockCardData = {
            'RC001APL7890': {
                name: 'Gopal Krishnan',
                aadhaar: '001122334455',
                familyMembers: 4,
                category: 'APL',
                rice: 10,
                wheat: 8,
                sugar: 2,
                oil: 1
            },
            'RC002BPL1234': {
                name: 'Sita Devi',
                aadhaar: '002233445566',
                familyMembers: 6,
                category: 'BPL',
                rice: 25,
                wheat: 15,
                sugar: 3,
                oil: 2
            }
        };

        const cardData = mockCardData[cardNumber];
        if (cardData) {
            document.getElementById('cardHolderName').textContent = `Card Holder: ${cardData.name}`;
            cardInfoDiv.innerHTML = `
                <p>Aadhaar: ${cardData.aadhaar}</p>
                <p>Family Members: ${cardData.familyMembers}</p>
                <p>Category: ${cardData.category}</p>
                <p class="mt-2 text-green-700 font-bold">Monthly Entitlement:</p>
                <p>Rice: ${cardData.rice} kg, Wheat: ${cardData.wheat} kg</p>
                <p>Sugar: ${cardData.sugar} kg, Oil: ${cardData.oil} L</p>
            `;
            cardDetailsDiv.classList.remove('hidden');
        } else {
            cardInfoDiv.innerHTML = `<p class="text-red-700">Card not found. Please check the card number.</p>`;
            cardDetailsDiv.classList.remove('hidden');
        }
    }
});

// Dealer - Stock Request Form
document.getElementById('stockRequestForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const item = document.getElementById('requestItem').value;
    const quantity = document.getElementById('requestQuantity').value;
    const reason = document.getElementById('requestReason').value;

    if (!item || !quantity || !reason) {
        showNotification('Please fill all fields.', 'warning');
        return;
    }

    showNotification(`Stock request submitted to admin!\n\nItem: ${item}\nQuantity: ${quantity}\nReason: ${reason}`, 'success');
    
    // Reset form
    document.getElementById('stockRequestForm').reset();
});

// Admin Functions
function approveRequest(requestId) {
    const request = stockRequests.find(req => req.id === requestId);
    if (request) {
        request.status = 'approved';
        showNotification(`Request #${requestId} approved successfully! Stock has been allocated to the dealer.`, 'success');
        renderPendingRequests();
    }
}

function rejectRequest(requestId) {
    const request = stockRequests.find(req => req.id === requestId);
    if (request) {
        request.status = 'rejected';
        showNotification(`Request #${requestId} rejected! The dealer has been notified.`, 'error');
        renderPendingRequests();
    }
}

function generateReport() {
    showNotification('Monthly report generated successfully! Report downloaded as PDF.', 'success');
    // In real app, this would generate and download a PDF report
}

function viewAllDealers() {
    showNotification('Opening dealer management panel...', 'info');
    // In real app, this would show a modal or navigate to dealer management page
    const dealers = [
        { name: 'Amit Kumar', shop: 'F.P. Shop #321', phone: '9876543210', status: 'Active' },
        { name: 'Priya Sharma', shop: 'F.P. Shop #322', phone: '9876543211', status: 'Active' },
        { name: 'Rajesh Patel', shop: 'F.P. Shop #323', phone: '9876543212', status: 'Inactive' }
    ];
    
    let dealersList = 'Active Dealers:\n\n';
    dealers.filter(d => d.status === 'Active').forEach(dealer => {
        dealersList += `• ${dealer.name} - ${dealer.shop} (${dealer.phone})\n`;
    });
    
    alert(dealersList);
}

function manageStock() {
    showNotification('Opening stock management system...', 'info');
    // In real app, this would show a modal for stock management
    let stockInfo = 'Current System Stock:\n\n';
    stockInfo += `Rice: ${systemStock.rice.toLocaleString()} kg\n`;
    stockInfo += `Wheat: ${systemStock.wheat.toLocaleString()} kg\n`;
    stockInfo += `Sugar: ${systemStock.sugar.toLocaleString()} kg\n`;
    stockInfo += `Oil: ${systemStock.oil.toLocaleString()} L`;
    
    alert(stockInfo);
}

function systemSettings() {
    showNotification('Opening system configuration...', 'info');
    // In real app, this would show system settings
    alert('System Settings:\n\n• User Management\n• Stock Configuration\n• Report Settings\n• System Preferences');
}

// Stock management variables
let stockRequests = [
    {
        id: 1,
        dealerName: 'Amit Kumar',
        dealerEmail: 'dealer@demo.com',
        item: 'rice',
        quantity: 100,
        unit: 'kg',
        reason: 'Low stock',
        status: 'pending',
        date: '2024-10-14'
    },
    {
        id: 2,
        dealerName: 'Priya Sharma',
        dealerEmail: 'dealer2@demo.com',
        item: 'sugar',
        quantity: 50,
        unit: 'kg',
        reason: 'Out of stock',
        status: 'pending',
        date: '2024-10-13'
    }
];

let systemStock = {
    rice: 15000,
    wheat: 22000,
    sugar: 8000,
    oil: 6500
};
