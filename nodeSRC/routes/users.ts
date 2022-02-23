import express from 'express';
import controller from '../controllers/users';
const router = express.Router();

router.post('/users/signup',controller.signUp);
router.get('/users/login', controller.login);

export = router;