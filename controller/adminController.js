const adminModel = require('../model/adminModel');
const bcrypt = require('bcrypt');
const userModel = require('../model/userModel');

const loadLogin = async (req, res) => {
    res.render('admin/login');
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //console.log(email, password);
        const admin = await adminModel.findOne({ email });
        if (!admin) return res.render('admin/login', { message: 'Invalid Credentials' });
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.render('admin/login', { message: 'Invalid Credentials' });
        req.session.admin = true;
        res.redirect('/admin/dashboard');
    } catch (error) {
        console.error(error);
        res.render('admin/login', { message: 'An error occurred. Please try again later.' });
    }
}

const loadDashboard = async (req, res) => {
    try {
        const admin = req.session.admin;
        if (!admin) return res.redirect('/admin/login');

        const users = await userModel.find({});
        //console.log(users);
        res.render('admin/dashboard', { users });

    } catch (error) {
        console.error(error);
        res.render('admin/dashboard', { message: 'Failed to load dashboard' });
    }
}

const editUser = async (req, res) => {
    try {
        const { email, password, id } = req.body;
        if (!id || !email || !password) {
            const users = await userModel.find({});
            return res.render('admin/dashboard', { message: 'Missing data for update', users });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedUser = await userModel.findOneAndUpdate({ _id: id },
            { $set: { email, password: hashedPassword } },
            { new: true }
        );

        //console.log(updatedUser );
        //res.json(updatedUser );

        const alluser = await userModel.find({});

        if (!updatedUser) {
            return res.render('admin/dashboard', { message: 'User not found', users });
        }

        res.render('admin/dashboard', { message: 'User updated successfully', users: alluser });

    } catch (error) {
        console.error(error);
        //res.status(500).send('An error occurred while updating the user');
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await userModel.findOneAndDelete({ _id: id });
        const users = await userModel.find({});
        res.render('admin/dashboard', { message: 'User deleted successfully', users });
    } catch (error) {
        console.error(error);
        //res.status(500).send('An error occurred while deleting the user');
    }
}

const addUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExists = await userModel.findOne({ email });
        //if (userExists) return res.json({ success: false, message: 'User already exists' });
        //return ("User already exists");
        if (userExists) return res.render('admin/dashboard', { message: 'User already exists', users: allUsers });
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ email, password: hashedPassword });
        await newUser.save();
        const allUsers = await userModel.find({});
        res.render('admin/dashboard', { message: 'User created successfully', users: allUsers });
    } catch (error) {
        console.error(error);
        //res.render('admin/dashboard', { message: 'Something went wrong' });
    }
}

const logout = async (req, res) => {
    req.session.admin = null;
    res.redirect('/admin/login');
};

module.exports = {
    loadLogin,
    login,
    loadDashboard,
    editUser,
    deleteUser,
    addUser,
    logout
};