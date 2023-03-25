// const authController = require('./controllers/authController');
// const customerController = require('./controllers/customerController');
// const digitalFormController = require('./controllers/digitalFormController');
// const digitalFormResponseController = require('./controllers/digitalFormResponseController');
// const lotController = require('./controllers/lotController');
// const vendorController = require('./controllers/vendorController');
// const authMiddleware = require('./middlewares/auth-middleware');
// const hasRole = require('./middlewares/hasRole-middleware');

const router = require('express').Router();

// Auth Sign In Route
// router.get('/api/', authController.welcome);
// router.post('/api/auth/signin', authController.signIn);
// // Auth Sign Up Route
// router.post('/api/auth/signup', authController.signUp);
// // Auth Sign Out Route
// router.post('/api/auth/signout', authController.signOut);
// // Auth Digital Form Login Route
// router.post('/api/digital-form/login', digitalFormController.login);

// // Vendor Routes
// router.get('/api/vendors', authMiddleware, hasRole('ADMIN'), vendorController.getByPage);
// router.get('/api/vendor/:id', authMiddleware, hasRole('ADMIN'), vendorController.getById);
// router.post('/api/vendor/create', authMiddleware, hasRole('ADMIN'), vendorController.create);
// router.put('/api/vendor/:id', authMiddleware, hasRole('ADMIN'), vendorController.update);
// router.delete('/api/vendor/delete-many', authMiddleware, hasRole('ADMIN'), vendorController.deleteMany);
// router.delete('/api/vendor/:id', authMiddleware, hasRole('ADMIN'), vendorController.deleteOne);


// Refresh Token generator Route
// router.post('/api/auth/refresh', authController.refresh);
// router.post('/api/auth/form/refresh', authController.refreshForm);

// Home Route
router.get('/', (req, res) => {
    res.send(`Server : ${process.env.SERVER_NAME}`);
});

// Ping Server status
router.get('/ping', (req, res) => {
    res.send('pong');
});

// Return server status
router.get('/status', (req, res) => {
    res.send('Server is running');
});

module.exports = router;