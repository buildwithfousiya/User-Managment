const checkSession = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/user/login');
    }
}

const isLogin = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/user/home');
    } else {
        next();
    }
}

const validateRegister = (req, res, next) => {

    let { email, password, confirmPassword } = req.body;
    email = email.trim().toLowerCase();
    password = password.trim();
    confirmPassword = confirmPassword.trim();


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!email || !password || !confirmPassword) {
        return res.render("user/register", { message: "Please fill in all fields." });
    }

    if (!emailRegex.test(email)) {
        return res.render("user/register", { message: "Invalid email format!" });
    }

    if (!passwordRegex.test(password)) {
        return res.render("user/register", {
            message: "Password must be 8+ characters long with uppercase, lowercase, number, and special character.",
        });
    }

    if (password !== confirmPassword) {
        return res.render("user/register", { message: "Passwords must match." });
    }

    return next();
};

const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
        return res.render("user/login", { message: "All fields are required!" });
    }

    if (!emailRegex.test(email)) {
        return res.render("user/login", { message: "Invalid email format!" });
    }

    return next();
};

module.exports = { checkSession, isLogin, validateRegister, validateLogin };