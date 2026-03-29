const userModel = require('../model/userModel');

module.exports = async function (req, res, next) {
    const { email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!email || !password) {
        const users = await userModel.find({});
        return res.render('admin/dashboard', { message: 'Email and password required', users });
    }

    if (!emailRegex.test(email)) {
        const users = await userModel.find({});
        return res.render('admin/dashboard', { message: 'Invalid email format', users });
    }

    if (!passwordRegex.test(password)) {
        const users = await userModel.find({});
        return res.render('admin/dashboard', {
            message: 'Password must be 8+ characters with uppercase, lowercase, number, and special character',
            users
        });
    }

    next();
};
