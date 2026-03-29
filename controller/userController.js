const session = require('express-session');
const userSchema = require('../model/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExists = await userSchema.findOne({ email });
        if (userExists) return res.render('user/register', { message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new userSchema({ email, password: hashedPassword });
        await newUser.save();
        res.render('user/login', { message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.render('user/register', { message: 'Something went wrong' });
    }
};

const logout = (req, res) => {
    req.session.user = null;
    res.redirect('/user/login');
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log(email, password);
        const user = await userSchema.findOne({ email });
        if (!user) return res.render('user/login', { message: "User doesn't exist found" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.render('user/login', { message: 'Incorrect password' });
        req.session.user = email;
        res.render('user/userHome', { message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.render('user/login', { message: 'Something went wrong' });
    }
}


const loadRegister = (req, res) => {
    res.render('user/register');
};

const loadLogin = (req, res) => {
    res.render('user/login');
};

const loadHome = (req, res) => {
    res.render('user/userHome');
};

const loadMail = (req, res) => {
    const emailId = req.session.user;
    res.render('user/showMail', { emailId });
};

module.exports = {
    registerUser,
    loadRegister,
    loadLogin,
    login,
    loadHome,
    logout,
    loadMail
};