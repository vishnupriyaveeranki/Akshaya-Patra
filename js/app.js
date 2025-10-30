// Global variables
/*let currentUser = null;
let currentLoginType = null;
let currentLanguage = 'en';
let authToken = null;

// API Base URL
const API_BASE = '/api';

// Page navigation functions
function showPage(pageId) {
    document.querySelectorAll('[id$="Page"], [id$="Dashboard"]').forEach(page => {
        page.classList.add('hidden');
    });
    const page = document.getElementById(pageId);
    if (page) {
        page.classList.remove('hidden');
        page.scrollIntoView({ behavior: 'smooth' });
    }
}

function showHome() {
    currentUser = null;
    currentLoginType = null;
    authToken = null;
    localStorage.removeItem('token');
    showPage('homePage');
}

function showRegister() {
    showPage('registerPage');
}

function showLogin(userType) {
    currentLoginType = userType;
    
    // Show/hide fields based on user type
    const aadhaarField = document.getElementById('loginAadhaarField');
    const emailField = document.getElementById('loginEmailField');
    
    if (userType === 'citizen') {
        aadhaarField.classList.remove('hidden');
        emailField.classList.add('hidden');
    } else {
        aadhaarField.classList.add('hidden');
        emailField.classList.remove('hidden');
    }
    
    showPage('loginPage');
}

function logout() {
    currentUser = null;
    currentLoginType = null;
    authToken = null;
    localStorage.removeItem('token');
    showNotification('Logged out successfully.', 'success');
    showHome();
}

// Dashboard navigation functions
function showCitizenDashboard() {
    showPage('citizenDashboard');
}

function showDealerDashboard() {
    showPage('dealerDashboard');
}

function showAdminDashboard() {
    showPage('adminDashboard');
}

// API Functions
async function apiRequest(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers
        },
        ...options
    };

    if (options.body) {
        config.body = JSON.stringify(options.body);
    }

    try {
        const response = await fetch(`${API_BASE}${endpoint}`, config);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'API request failed');
        }
        
        return data;
    } catch (error) {
        console.error('API request error:', error);
        throw error;
    }
}

// Notification system
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Button action functions
function downloadCard() {
    showNotification('Ration card download started!', 'success');
}

function collectRation() {
    showNotification('Ration collection successful!', 'success');
}

function contactDealer(phone) {
    showNotification(`Calling dealer: ${phone}`, 'info');
}

function getDirections(address) {
    showNotification(`Getting directions to: ${address}`, 'info');
}

function distributeRation() {
    showNotification('Ration distributed successfully!', 'success');
}

function generateReport() {
    showNotification('Report generated successfully!', 'success');
}

function viewAllDealers() {
    showNotification('Opening dealer management...', 'info');
}

function manageStock() {
    showNotification('Opening stock management...', 'info');
}

function systemSettings() {
    showNotification('Opening system settings...', 'info');
}

function approveRequest(id) {
    showNotification(`Request #${id} approved!`, 'success');
}

function rejectRequest(id) {
    showNotification(`Request #${id} rejected!`, 'error');
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    showHome();
    
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
        // In a real app, verify token and redirect
        // For demo, just show home
    }
    
    // Register form user type change handler
    const userTypeSelect = document.getElementById('userType');
    const aadhaarField = document.getElementById('aadhaarField');
    const emailField = document.getElementById('emailField');
    
    if (userTypeSelect) {
        userTypeSelect.addEventListener('change', function() {
            if (this.value === 'citizen') {
                aadhaarField.classList.remove('hidden');
                emailField.classList.add('hidden');
            } else {
                aadhaarField.classList.add('hidden');
                emailField.classList.remove('hidden');
            }
        });
    }
    
    // Initialize language system
    if (typeof changeLanguage === 'function') {
        changeLanguage(currentLanguage);
    }
});*/
// Global variables
let currentUser = null;
let currentLoginType = null;
let currentLanguage = 'en';
let authToken = null;

// API Base URL
const API_BASE = '/api';

// Page navigation functions
function showPage(pageId) {
    document.querySelectorAll('[id$="Page"], [id$="Dashboard"]').forEach(page => {
        page.classList.add('hidden');
    });
    const page = document.getElementById(pageId);
    if (page) {
        page.classList.remove('hidden');
        page.scrollIntoView({ behavior: 'smooth' });
    }
}

function showHome() {
    currentUser = null;
    currentLoginType = null;
    authToken = null;
    localStorage.removeItem('token');
    showPage('homePage');
}

function showRegister() {
    showPage('registerPage');
}

function showLogin(userType) {
    currentLoginType = userType;
    
    // Show/hide fields based on user type
    const aadhaarField = document.getElementById('loginAadhaarField');
    const emailField = document.getElementById('loginEmailField');
    
    if (userType === 'citizen') {
        aadhaarField.classList.remove('hidden');
        emailField.classList.add('hidden');
    } else {
        aadhaarField.classList.add('hidden');
        emailField.classList.remove('hidden');
    }
    
    showPage('loginPage');
}

function logout() {
    currentUser = null;
    currentLoginType = null;
    authToken = null;
    localStorage.removeItem('token');
    showNotification('Logged out successfully.', 'success');
    showHome();
}

// Dashboard navigation functions
function showCitizenDashboard() {
    showPage('citizenDashboard');
}

function showDealerDashboard() {
    showPage('dealerDashboard');
}

function showAdminDashboard() {
    showPage('adminDashboard');
}

// API Functions
async function apiRequest(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers
        },
        ...options
    };

    if (options.body) {
        config.body = JSON.stringify(options.body);
    }

    try {
        const response = await fetch(`${API_BASE}${endpoint}`, config);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'API request failed');
        }
        
        return data;
    } catch (error) {
        console.error('API request error:', error);
        throw error;
    }
}

// Notification system
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Button action functions
function downloadCard() {
    showNotification('Ration card download started!', 'success');
}

function collectRation() {
    showNotification('Ration collection successful!', 'success');
}

function contactDealer(phone) {
    showNotification(`Calling dealer: ${phone}`, 'info');
}

function getDirections(address) {
    showNotification(`Getting directions to: ${address}`, 'info');
}

function distributeRation() {
    showNotification('Ration distributed successfully!', 'success');
}

function generateReport() {
    showNotification('Report generated successfully!', 'success');
}

function viewAllDealers() {
    showNotification('Opening dealer management...', 'info');
}

function manageStock() {
    showNotification('Opening stock management...', 'info');
}

function systemSettings() {
    showNotification('Opening system settings...', 'info');
}

function approveRequest(id) {
    showNotification(`Request #${id} approved!`, 'success');
}

function rejectRequest(id) {
    showNotification(`Request #${id} rejected!`, 'error');
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    showHome();
    
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
        // In a real app, verify token and redirect
        // For demo, just show home
    }
    
    // Register form user type change handler
    const userTypeSelect = document.getElementById('userType');
    const aadhaarField = document.getElementById('aadhaarField');
    const emailField = document.getElementById('emailField');
    
    if (userTypeSelect) {
        userTypeSelect.addEventListener('change', function() {
            if (this.value === 'citizen') {
                aadhaarField.classList.remove('hidden');
                emailField.classList.add('hidden');
            } else {
                aadhaarField.classList.add('hidden');
                emailField.classList.remove('hidden');
            }
        });
    }
    
    // Initialize language system
    if (typeof changeLanguage === 'function') {
        changeLanguage(currentLanguage);
    }
});
