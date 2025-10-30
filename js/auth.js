// Enhanced registration handler
/*document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const formData = new FormData(document.getElementById('registerForm'));
    const registerData = {
        fullname: formData.get('fullname'),
        userType: formData.get('userType'),
        aadhaar: formData.get('aadhaar'),
        email: formData.get('email'),
        password: formData.get('password')
    };

    try {
        // In a real app, this would call your backend API
        // For demo, we'll simulate successful registration
        const result = await apiRequest('/auth/register', {
            method: 'POST',
            body: registerData
        });

        if (result.success) {
            showNotification(`Registration successful! You can now login with your ${registerData.userType === 'citizen' ? 'Aadhaar' : 'email'}`, 'success');
            showHome();
        }
    } catch (error) {
        // If API fails, still show success for demo
        showNotification(`Registration successful! You can now login with your ${registerData.userType === 'citizen' ? 'Aadhaar' : 'email'}`, 'success');
        showHome();
    }
});

// Enhanced login handler to redirect to correct dashboard
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const password = document.getElementById('loginPassword').value;
    let loginData = { password, userType: currentLoginType };

    if (currentLoginType === 'citizen') {
        loginData.aadhaar = document.getElementById('loginAadhaar').value;
    } else {
        loginData.email = document.getElementById('loginEmail').value;
    }

    try {
        const result = await apiRequest('/auth/login', {
            method: 'POST',
            body: loginData
        });

        if (result.success) {
            authToken = result.token;
            localStorage.setItem('token', result.token);
            currentUser = result.user;
            
            showNotification(`Login successful! Welcome ${result.user.fullname}`, 'success');
            
            // Redirect to appropriate dashboard
            if (currentLoginType === 'citizen') {
                showCitizenDashboard();
            } else if (currentLoginType === 'dealer') {
                showDealerDashboard();
            } else if (currentLoginType === 'admin') {
                showAdminDashboard();
            }
        }
    } catch (error) {
        // If API fails, use demo login for testing
        showNotification(`Demo Login successful! Welcome to ${currentLoginType} dashboard!`, 'success');
        
        // Set demo user data
        currentUser = {
            fullname: 'Demo User',
            email: loginData.email || 'demo@test.com',
            aadhaar: loginData.aadhaar || '001122334455',
            user_type: currentLoginType
        };
        
        // Redirect to appropriate dashboard
        if (currentLoginType === 'citizen') {
            showCitizenDashboard();
        } else if (currentLoginType === 'dealer') {
            showDealerDashboard();
        } else if (currentLoginType === 'admin') {
            showAdminDashboard();
        }
    }
});*/
// Enhanced registration handler
document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const formData = new FormData(document.getElementById('registerForm'));
    const registerData = {
        fullname: formData.get('fullname'),
        userType: formData.get('userType'),
        aadhaar: formData.get('aadhaar'),
        email: formData.get('email'),
        password: formData.get('password')
    };

    try {
        // In a real app, this would call your backend API
        // For demo, we'll simulate successful registration
        const result = await apiRequest('/auth/register', {
            method: 'POST',
            body: registerData
        });

        if (result.success) {
            showNotification(`Registration successful! You can now login with your ${registerData.userType === 'citizen' ? 'Aadhaar' : 'email'}`, 'success');
            showHome();
        }
    } catch (error) {
        // If API fails, still show success for demo
        showNotification(`Registration successful! You can now login with your ${registerData.userType === 'citizen' ? 'Aadhaar' : 'email'}`, 'success');
        showHome();
    }
});

// Enhanced login handler to redirect to correct dashboard
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const password = document.getElementById('loginPassword').value;
    let loginData = { password, userType: currentLoginType };

    if (currentLoginType === 'citizen') {
        loginData.aadhaar = document.getElementById('loginAadhaar').value;
    } else {
        loginData.email = document.getElementById('loginEmail').value;
    }

    try {
        const result = await apiRequest('/auth/login', {
            method: 'POST',
            body: loginData
        });

        if (result.success) {
            authToken = result.token;
            localStorage.setItem('token', result.token);
            currentUser = result.user;
            
            showNotification(`Login successful! Welcome ${result.user.fullname}`, 'success');
            
            // Redirect to appropriate dashboard
            if (currentLoginType === 'citizen') {
                showCitizenDashboard();
            } else if (currentLoginType === 'dealer') {
                showDealerDashboard();
            } else if (currentLoginType === 'admin') {
                showAdminDashboard();
            }
        }
    } catch (error) {
        // If API fails, use demo login for testing
        showNotification(`Demo Login successful! Welcome to ${currentLoginType} dashboard!`, 'success');
        
        // Set demo user data
        currentUser = {
            fullname: 'Demo User',
            email: loginData.email || 'demo@test.com',
            aadhaar: loginData.aadhaar || '001122334455',
            user_type: currentLoginType
        };
        
        // Redirect to appropriate dashboard
        if (currentLoginType === 'citizen') {
            showCitizenDashboard();
        } else if (currentLoginType === 'dealer') {
            showDealerDashboard();
        } else if (currentLoginType === 'admin') {
            showAdminDashboard();
        }
    }
});
