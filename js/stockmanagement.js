// Stock Management Variables
/*let dealerStock = {
    rice: 150,
    wheat: 200,
    sugar: 0,
    oil: 50
};

let systemStock = {
    rice: 15000,
    wheat: 22000,
    sugar: 8000,
    oil: 6500
};

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

// Stock management functions
function updateDealerStockDisplay() {
    const stockDiv = document.getElementById('dealerStock');
    if (!stockDiv) return;

    stockDiv.innerHTML = '';

    Object.keys(dealerStock).forEach(item => {
        const quantity = dealerStock[item];
        let color = 'text-green-600';
        if (quantity === 0) {
            color = 'text-red-600';
        } else if (quantity < 50) {
            color = 'text-orange-600';
        }

        const itemName = item.charAt(0).toUpperCase() + item.slice(1);
        const unit = item === 'oil' ? 'L' : 'kg';

        const stockHtml = `
            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="font-medium">${itemName}</span>
                <span class="font-bold ${color}">${quantity} ${unit}</span>
            </div>
        `;
        stockDiv.innerHTML += stockHtml;
    });
}

function updateSystemStockDisplay() {
    const stockItems = document.querySelectorAll('#adminDashboard .bg-gray-50');
    Object.keys(systemStock).forEach((item, index) => {
        if (stockItems[index]) {
            const quantity = systemStock[item];
            const unit = item === 'oil' ? 'L' : 'kg';
            const itemName = item.charAt(0).toUpperCase() + item.slice(1);

            stockItems[index].innerHTML = `
                <span class="font-medium">${itemName}</span>
                <span class="text-blue-600 font-bold">${quantity.toLocaleString()} ${unit}</span>
            `;
        }
    });
}

function renderPendingRequests() {
    const pendingDiv = document.getElementById('pendingRequests');
    if (!pendingDiv) return;

    const pending = stockRequests.filter(req => req.status === 'pending');
    
    pendingDiv.innerHTML = '';

    if (pending.length === 0) {
        pendingDiv.innerHTML = `<p class="text-gray-500 text-center py-4">No pending stock requests at this time.</p>`;
        return;
    }

    pending.forEach(req => {
        const requestHtml = `
            <div id="request-${req.id}" class="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <p class="font-medium">${req.item.charAt(0).toUpperCase() + req.item.slice(1)} - ${req.quantity} ${req.unit}</p>
                        <p class="text-sm text-gray-600">Dealer: ${req.dealerName}</p>
                        <p class="text-sm text-gray-600">Date: ${req.date}</p>
                        <p class="text-sm text-gray-600 italic">Reason: ${req.reason}</p>
                    </div>
                </div>
                <div class="flex space-x-2 mt-3">
                    <button onclick="approveRequest(${req.id})" class="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors">
                        ✓ Approve
                    </button>
                    <button onclick="rejectRequest(${req.id})" class="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors">
                        ✗ Reject
                    </button>
                </div>
            </div>
        `;
        pendingDiv.innerHTML += requestHtml;
    });
}

function renderDealerRequests() {
    const historyDiv = document.getElementById('requestHistory');
    if (!historyDiv) return;

    const dealerHistory = stockRequests.filter(req => req.dealerEmail === currentUser?.email).reverse();
    historyDiv.innerHTML = '';

    if (dealerHistory.length === 0) {
        historyDiv.innerHTML = `<p class="text-gray-500">No requests submitted yet.</p>`;
        return;
    }

    dealerHistory.forEach(req => {
        let color, statusText;
        if (req.status === 'pending') {
            color = 'text-yellow-600';
            statusText = 'PENDING';
        } else if (req.status === 'approved') {
            color = 'text-green-600';
            statusText = 'APPROVED';
        } else {
            color = 'text-red-600';
            statusText = 'REJECTED';
        }

        const historyHtml = `
            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                    <p class="font-medium">${req.item.charAt(0).toUpperCase() + req.item.slice(1)} - ${req.quantity} ${req.unit}</p>
                    <p class="text-sm text-gray-600">${req.date}</p>
                </div>
                <span class="font-bold ${color}">${statusText}</span>
            </div>
        `;
        historyDiv.innerHTML += historyHtml;
    });
}

// Event listeners for stock management
document.addEventListener('DOMContentLoaded', function() {
    const stockRequestForm = document.getElementById('stockRequestForm');
    if (stockRequestForm) {
        stockRequestForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (!currentUser || currentLoginType !== 'dealer') {
                showNotification('Error: Must be logged in as a dealer to submit a request.', 'error');
                return;
            }

            const item = document.getElementById('requestItem').value;
            const quantity = document.getElementById('requestQuantity').value;
            const reason = document.getElementById('requestReason').value;

            if (!item || !quantity || !reason) {
                showNotification('Please fill all fields', 'warning');
                return;
            }

            const newRequestId = stockRequests.length > 0 ? Math.max(...stockRequests.map(r => r.id)) + 1 : 1;
            const newRequest = {
                id: newRequestId,
                dealerName: currentUser.fullname,
                dealerEmail: currentUser.email,
                item: item,
                quantity: parseInt(quantity),
                unit: item === 'oil' ? 'L' : 'kg',
                reason: reason,
                status: 'pending',
                date: new Date().toLocaleDateString()
            };

            stockRequests.push(newRequest);
            document.getElementById('stockRequestForm').reset();
            showNotification('Stock request submitted successfully!', 'success');
            
            // If admin is viewing, update their view
            if (document.getElementById('adminDashboard') && !document.getElementById('adminDashboard').classList.contains('hidden')) {
                renderPendingRequests();
            }
        });
    }

    const cardLookupForm = document.getElementById('cardLookupForm');
    if (cardLookupForm) {
        cardLookupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const cardNo = document.getElementById('cardNumber').value.trim().toUpperCase();
            const cardDetailsDiv = document.getElementById('cardDetails');
            const cardInfoDiv = document.getElementById('cardInfo');

            if (cardDetailsDiv && cardInfoDiv) {
                if (cardNo) {
                    cardInfoDiv.innerHTML = `
                        <p>Aadhaar: 001122334455</p>
                        <p>Family Members: 4</p>
                        <p>Category: APL</p>
                        <p class="mt-2 text-green-700 font-bold">Ration Due: Rice (10kg), Wheat (8kg), Sugar (2kg), Oil (1L)</p>
                    `;
                    cardDetailsDiv.classList.remove('hidden');
                } else {
                    cardInfoDiv.innerHTML = `<p class="text-red-700">Please enter a card number</p>`;
                    cardDetailsDiv.classList.remove('hidden');
                }
            }
        });
    }
    
    // Initialize displays
    updateDealerStockDisplay();
    renderPendingRequests();
});*/
// Stock Management Variables
let dealerStock = {
    rice: 150,
    wheat: 200,
    sugar: 0,
    oil: 50
};

let systemStock = {
    rice: 15000,
    wheat: 22000,
    sugar: 8000,
    oil: 6500
};

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

// Stock management functions
function updateDealerStockDisplay() {
    const stockDiv = document.getElementById('dealerStock');
    if (!stockDiv) return;

    stockDiv.innerHTML = '';

    Object.keys(dealerStock).forEach(item => {
        const quantity = dealerStock[item];
        let color = 'text-green-600';
        if (quantity === 0) {
            color = 'text-red-600';
        } else if (quantity < 50) {
            color = 'text-orange-600';
        }

        const itemName = item.charAt(0).toUpperCase() + item.slice(1);
        const unit = item === 'oil' ? 'L' : 'kg';

        const stockHtml = `
            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="font-medium">${itemName}</span>
                <span class="font-bold ${color}">${quantity} ${unit}</span>
            </div>
        `;
        stockDiv.innerHTML += stockHtml;
    });
}

function updateSystemStockDisplay() {
    const stockItems = document.querySelectorAll('#adminDashboard .bg-gray-50');
    Object.keys(systemStock).forEach((item, index) => {
        if (stockItems[index]) {
            const quantity = systemStock[item];
            const unit = item === 'oil' ? 'L' : 'kg';
            const itemName = item.charAt(0).toUpperCase() + item.slice(1);

            stockItems[index].innerHTML = `
                <span class="font-medium">${itemName}</span>
                <span class="text-blue-600 font-bold">${quantity.toLocaleString()} ${unit}</span>
            `;
        }
    });
}

function renderPendingRequests() {
    const pendingDiv = document.getElementById('pendingRequests');
    if (!pendingDiv) return;

    const pending = stockRequests.filter(req => req.status === 'pending');
    
    pendingDiv.innerHTML = '';

    if (pending.length === 0) {
        pendingDiv.innerHTML = `<p class="text-gray-500 text-center py-4">No pending stock requests at this time.</p>`;
        return;
    }

    pending.forEach(req => {
        const requestHtml = `
            <div id="request-${req.id}" class="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <p class="font-medium">${req.item.charAt(0).toUpperCase() + req.item.slice(1)} - ${req.quantity} ${req.unit}</p>
                        <p class="text-sm text-gray-600">Dealer: ${req.dealerName}</p>
                        <p class="text-sm text-gray-600">Date: ${req.date}</p>
                        <p class="text-sm text-gray-600 italic">Reason: ${req.reason}</p>
                    </div>
                </div>
                <div class="flex space-x-2 mt-3">
                    <button onclick="approveRequest(${req.id})" class="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors">
                        ✓ Approve
                    </button>
                    <button onclick="rejectRequest(${req.id})" class="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors">
                        ✗ Reject
                    </button>
                </div>
            </div>
        `;
        pendingDiv.innerHTML += requestHtml;
    });
}

function renderDealerRequests() {
    const historyDiv = document.getElementById('requestHistory');
    if (!historyDiv) return;

    const dealerHistory = stockRequests.filter(req => req.dealerEmail === currentUser?.email).reverse();
    historyDiv.innerHTML = '';

    if (dealerHistory.length === 0) {
        historyDiv.innerHTML = `<p class="text-gray-500">No requests submitted yet.</p>`;
        return;
    }

    dealerHistory.forEach(req => {
        let color, statusText;
        if (req.status === 'pending') {
            color = 'text-yellow-600';
            statusText = 'PENDING';
        } else if (req.status === 'approved') {
            color = 'text-green-600';
            statusText = 'APPROVED';
        } else {
            color = 'text-red-600';
            statusText = 'REJECTED';
        }

        const historyHtml = `
            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                    <p class="font-medium">${req.item.charAt(0).toUpperCase() + req.item.slice(1)} - ${req.quantity} ${req.unit}</p>
                    <p class="text-sm text-gray-600">${req.date}</p>
                </div>
                <span class="font-bold ${color}">${statusText}</span>
            </div>
        `;
        historyDiv.innerHTML += historyHtml;
    });
}

// Event listeners for stock management
document.addEventListener('DOMContentLoaded', function() {
    const stockRequestForm = document.getElementById('stockRequestForm');
    if (stockRequestForm) {
        stockRequestForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (!currentUser || currentLoginType !== 'dealer') {
                showNotification('Error: Must be logged in as a dealer to submit a request.', 'error');
                return;
            }

            const item = document.getElementById('requestItem').value;
            const quantity = document.getElementById('requestQuantity').value;
            const reason = document.getElementById('requestReason').value;

            if (!item || !quantity || !reason) {
                showNotification('Please fill all fields', 'warning');
                return;
            }

            const newRequestId = stockRequests.length > 0 ? Math.max(...stockRequests.map(r => r.id)) + 1 : 1;
            const newRequest = {
                id: newRequestId,
                dealerName: currentUser.fullname,
                dealerEmail: currentUser.email,
                item: item,
                quantity: parseInt(quantity),
                unit: item === 'oil' ? 'L' : 'kg',
                reason: reason,
                status: 'pending',
                date: new Date().toLocaleDateString()
            };

            stockRequests.push(newRequest);
            document.getElementById('stockRequestForm').reset();
            showNotification('Stock request submitted successfully!', 'success');
            
            // If admin is viewing, update their view
            if (document.getElementById('adminDashboard') && !document.getElementById('adminDashboard').classList.contains('hidden')) {
                renderPendingRequests();
            }
        });
    }

    const cardLookupForm = document.getElementById('cardLookupForm');
    if (cardLookupForm) {
        cardLookupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const cardNo = document.getElementById('cardNumber').value.trim().toUpperCase();
            const cardDetailsDiv = document.getElementById('cardDetails');
            const cardInfoDiv = document.getElementById('cardInfo');

            if (cardDetailsDiv && cardInfoDiv) {
                if (cardNo) {
                    cardInfoDiv.innerHTML = `
                        <p>Aadhaar: 001122334455</p>
                        <p>Family Members: 4</p>
                        <p>Category: APL</p>
                        <p class="mt-2 text-green-700 font-bold">Ration Due: Rice (10kg), Wheat (8kg), Sugar (2kg), Oil (1L)</p>
                    `;
                    cardDetailsDiv.classList.remove('hidden');
                } else {
                    cardInfoDiv.innerHTML = `<p class="text-red-700">Please enter a card number</p>`;
                    cardDetailsDiv.classList.remove('hidden');
                }
            }
        });
    }
    
    // Initialize displays
    updateDealerStockDisplay();
    renderPendingRequests();
});
