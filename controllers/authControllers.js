const login = async (req, res) => {
    try {
        const { email, aadhaar, password, userType } = req.body;
        
        console.log('Login attempt:', { email, aadhaar, userType });
        
        // Simple demo login - always success for demo
        if (password === 'password123') {
            return res.json({
                success: true,
                message: 'Login successful',
                user: {
                    id: 1,
                    fullname: 'Demo User',
                    aadhaar: aadhaar || '001122334455',
                    email: email || 'demo@test.com',
                    user_type: userType || 'citizen'
                },
                token: 'demo-token-12345'
            });
        } else {
            return res.status(401).json({
                success: false,
                message: 'Invalid password. Use: password123'
            });
        }
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error during login'
        });
    }
};

const register = async (req, res) => {
    try {
        const { fullname, userType, aadhaar, email, password } = req.body;
        
        console.log('Registration attempt:', { fullname, userType, aadhaar, email });
        
        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            userId: 999
        });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error during registration'
        });
    }
};

const logout = (req, res) => {
    res.json({
        success: true,
        message: 'Logout successful'
    });
};

const verifyToken = (req, res) => {
    res.json({
        success: true,
        message: 'Token is valid',
        user: {
            id: 1,
            fullname: 'Demo User',
            user_type: 'citizen'
        }
    });
};

// Export as an object with all functions
module.exports = {
    login,
    register,
    logout,
    verifyToken
};
